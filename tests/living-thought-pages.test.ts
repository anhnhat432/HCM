import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CaseJourneyShell } from "@/components/cases/case-journey-shell";
import { CaseEvidenceStage } from "@/components/cases/case-evidence-stage";
import { CasePresentStage } from "@/components/cases/case-present-stage";
import { CaseReturnStage } from "@/components/cases/case-return-stage";
import { getCasePreviews } from "@/lib/thought-case-registry";
import { getThoughtCaseBySlug } from "@/lib/thought-case-registry";

function readSource(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("case library keeps all 30 links in its initial render data", () => {
  const previews = getCasePreviews();
  assert.equal(previews.length, 30);
  assert.equal(new Set(previews.map((item) => item.slug)).size, 30);
});

test("case library exposes labelled optional filters without gating links", () => {
  const route = readSource("app/ho-so/page.tsx");
  const filters = readSource("components/cases/case-library-filters.tsx");

  assert.match(route, /CaseLibraryFilters/);
  assert.match(route, /id="main-content"/);
  assert.match(filters, /aria-label="Lọc hồ sơ theo chủ đề"/);
  assert.match(filters, /Tìm tình huống/);
  assert.match(filters, /useState<ActiveCategory>\("all"\)/);
  assert.match(filters, /filteredPreviews\.map/);
  assert.doesNotMatch(filters, /fetch\(/);
});

test("Homepage makes living cases primary while retaining QR and Trace foundations", () => {
  const homepage = readSource("app/page.tsx");

  assert.match(homepage, /href="#tinh-huong-goi-y"/);
  assert.match(homepage, /id="tinh-huong-goi-y"/);
  assert.match(homepage, /Bắt đầu với một tình huống/);
  assert.match(homepage, /Khoảng 2 phút/);
  assert.match(homepage, /Không có đáp án đúng hoặc sai/);
  assert.doesNotMatch(homepage, /Mở một hồ sơ/);
  assert.match(homepage, /ScenarioPicker/);
  assert.match(homepage, /Kho tư liệu nền/);
  assert.match(homepage, /QrShareDialog/);
  assert.match(homepage, /TopicList/);
});

test("Homepage LCP image is not delayed by a decorative reveal wrapper", () => {
  const homepage = readSource("app/page.tsx");
  const hero = homepage.match(
    /<section className="home-hero"[\s\S]*?<\/section>/,
  )?.[0];

  assert.ok(hero);
  assert.doesNotMatch(hero, /<Reveal/);
  assert.doesNotMatch(homepage, /<Reveal className="home-hero__visual"/);
  assert.match(homepage, /<div className="home-hero__visual">/);
});

test("scenario picker shows exactly three suggestions per rotation", () => {
  const picker = readSource("components/cases/scenario-picker.tsx");

  assert.match(picker, /VISIBLE_CASE_COUNT = 3/);
  assert.match(picker, /Đổi tình huống/);
  assert.match(picker, /aria-live="polite"/);
});

test("case journey shell renders three route-backed stages without scroll tracking", () => {
  const item = getThoughtCaseBySlug("nhom-gioi-nhung-khong-hop-tac");
  assert.ok(item);

  const html = renderToStaticMarkup(
    createElement(
      CaseJourneyShell,
      { item, stage: "dau-vet" } as Parameters<typeof CaseJourneyShell>[0],
      createElement("h1", null, "Dấu vết"),
    ),
  );

  assert.equal((html.match(/case-stage-progress__link/g) ?? []).length, 3);
  assert.match(html, /aria-current="step"/);
  assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
  assert.match(html, /Đọc lại vấn đề/);
  assert.match(html, /Nhận gợi ý áp dụng/);
  assert.match(html, /id="main-content"/);
  assert.doesNotMatch(html, /requestAnimationFrame|addEventListener/);
});

test("present stage keeps the perspective optional and points to historical evidence", () => {
  const item = getThoughtCaseBySlug("nhom-gioi-nhung-khong-hop-tac");
  assert.ok(item);

  const html = renderToStaticMarkup(createElement(CasePresentStage, { item }));

  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /BƯỚC 1 \/ ĐỌC VẤN ĐỀ/);
  assert.match(html, /GÓC NHÌN BAN ĐẦU \(TÙY CHỌN\)/);
  assert.match(html, /Khoảng 2 phút/);
  assert.match(html, /Không có đáp án đúng hoặc sai/);
  assert.match(html, /Xem 3 mốc lịch sử/);
  assert.ok(
    html.indexOf("experience-guide") < html.indexOf("case-scroll-cue"),
    "The three-step guide must appear before the next action",
  );
  assert.doesNotMatch(html, /Mở ba dấu vết/);
  assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
  assert.doesNotMatch(html, /case-evidence__reveal/);
  assert.doesNotMatch(html, /HỒI 5 \/ KẾT NỐI TƯ TƯỞNG/);
});

test("evidence stage renders all three source-backed reveals in server markup", () => {
  const item = getThoughtCaseBySlug("nhom-gioi-nhung-khong-hop-tac");
  assert.ok(item);

  const html = renderToStaticMarkup(createElement(CaseEvidenceStage, { item }));
  const route = readSource("app/ho-so/[slug]/dau-vet/page.tsx");

  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.equal((html.match(/case-evidence__reveal/g) ?? []).length, 3);
  assert.equal((html.match(/Nguồn &amp; kiểm chứng/g) ?? []).length, 3);
  assert.equal((html.match(/case-evidence__no-script-sources/g) ?? []).length, 3);
  assert.match(html, /BƯỚC 2 \/ XEM 3 MỐC LỊCH SỬ/);
  assert.match(html, /Xem ba mốc lịch sử để nhìn lại vấn đề/);
  assert.match(html, /chỉ để đọc sâu, không bắt buộc/);
  assert.doesNotMatch(html, /Mở dấu vết đầu tiên/);
  assert.doesNotMatch(html, /case-evidence__heading/);
  assert.doesNotMatch(html, /perspective-prompt/);
  assert.doesNotMatch(html, /case-return__next/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /getThoughtCaseMetadata/);
  assert.match(route, /notFound\(\)/);
  assert.match(route, /stage="dau-vet"/);
});

test("return stage connects the thought formation to practical next steps", () => {
  const item = getThoughtCaseBySlug("nhom-gioi-nhung-khong-hop-tac");
  assert.ok(item);

  const html = renderToStaticMarkup(createElement(CaseReturnStage, { item }));
  const route = readSource("app/ho-so/[slug]/tro-lai/page.tsx");

  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.match(html, /BƯỚC 3 \/ NHẬN GỢI Ý ÁP DỤNG/);
  assert.equal((html.match(/case-connection__timestamp/g) ?? []).length, 3);
  assert.doesNotMatch(html, /00:0[1-3]/);
  assert.match(html, /GÓC NHÌN KẾT NỐI/);
  assert.match(html, /Xem ba gợi ý áp dụng/);
  assert.match(html, /BA GỢI Ý CHO TÌNH HUỐNG NÀY/);
  assert.match(html, /Đọc sâu \(tùy chọn\)/);
  assert.doesNotMatch(html, /KẾT LUẬN KHÔNG PHẢI TRÍCH DẪN/);
  assert.equal((html.match(/case-return__lenses/g) ?? []).length, 1);
  assert.equal((html.match(/case-return__next/g) ?? []).length, 1);
  assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
  assert.doesNotMatch(html, /href="#case-evidence"/);
  assert.match(route, /generateStaticParams/);
  assert.match(route, /getThoughtCaseMetadata/);
  assert.match(route, /notFound\(\)/);
  assert.match(route, /stage="tro-lai"/);
});

test("case enhancements remain optional and expose accessible guidance", () => {
  const page = readSource("components/cases/case-present-stage.tsx");
  const guide = readSource("components/cases/experience-guide.tsx");
  const prompt = readSource("components/cases/perspective-prompt.tsx");
  const progress = readSource("components/cases/case-stage-progress.tsx");
  const corpus = `${page}\n${guide}\n${prompt}\n${progress}`;

  assert.match(page, /PerspectivePrompt/);
  assert.match(guide, /aria-label="Cách trải nghiệm"/);
  assert.match(guide, /Ba bước/);
  assert.match(guide, /Không có đáp án đúng hoặc sai/);
  assert.match(prompt, /aria-pressed/);
  assert.match(prompt, /aria-live="polite"/);
  assert.match(progress, /aria-current/);
  assert.match(progress, /Tiến trình hồ sơ/);
  assert.doesNotMatch(corpus, /localStorage/);
  assert.doesNotMatch(corpus, /completionGate/);
  assert.doesNotMatch(corpus, /preventDefault\(\)/);
});

test("legacy six-act scroll composition is removed after all stage routes exist", () => {
  const legacyPage = new URL(
    "../components/cases/case-file-page.tsx",
    import.meta.url,
  );
  const legacyProgress = new URL(
    "../components/cases/case-progress.tsx",
    import.meta.url,
  );
  const routes = [
    readSource("app/ho-so/[slug]/page.tsx"),
    readSource("app/ho-so/[slug]/dau-vet/page.tsx"),
    readSource("app/ho-so/[slug]/tro-lai/page.tsx"),
  ].join("\n");

  assert.equal(existsSync(legacyPage), false);
  assert.equal(existsSync(legacyProgress), false);
  assert.doesNotMatch(routes, /CaseFilePage|CaseProgress/);
});

test("historical verification copy uses a fully Vietnamese interpretation label", () => {
  const traces = readSource("content/traces/dai-doan-ket.json");

  assert.doesNotMatch(traces, /summary là diễn giải/);
  assert.match(traces, /phần tóm lược là diễn giải/);
});

test("case routes are statically generated with canonical social metadata", () => {
  const route = readSource("app/ho-so/[slug]/page.tsx");
  const metadata = readSource("lib/thought-case-metadata.ts");

  assert.match(route, /generateStaticParams/);
  assert.match(route, /getThoughtCaseMetadata/);
  assert.match(route, /stage="hien-tai"/);
  assert.match(route, /notFound\(\)/);
  assert.match(metadata, /getCaseStageHref/);
  assert.match(metadata, /alternates/);
  assert.match(metadata, /openGraph/);
  assert.match(metadata, /primaryTrace/);
});
