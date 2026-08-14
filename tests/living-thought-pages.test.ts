import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CaseJourneyShell } from "@/components/cases/case-journey-shell";
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

  assert.match(homepage, /href="\/ho-so"/);
  assert.match(homepage, /Mở một hồ sơ/);
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
    createElement(CaseJourneyShell, {
      item,
      stage: "dau-vet",
      children: createElement("h1", null, "Dấu vết"),
    }),
  );

  assert.equal((html.match(/case-stage-progress__link/g) ?? []).length, 3);
  assert.match(html, /aria-current="step"/);
  assert.match(html, new RegExp(`/ho-so/${item.slug}/dau-vet`));
  assert.match(html, /Quay lại vấn đề/);
  assert.match(html, /Kết nối và trở lại/);
  assert.match(html, /id="main-content"/);
  assert.doesNotMatch(html, /requestAnimationFrame|addEventListener/);
});

test("case enhancements remain optional and expose accessible guidance", () => {
  const page = readSource("components/cases/case-file-page.tsx");
  const prompt = readSource("components/cases/perspective-prompt.tsx");
  const progress = readSource("components/cases/case-progress.tsx");
  const corpus = `${page}\n${prompt}\n${progress}`;

  assert.match(page, /CaseProgress/);
  assert.match(page, /PerspectivePrompt/);
  assert.match(prompt, /aria-pressed/);
  assert.match(prompt, /aria-live="polite"/);
  assert.match(progress, /aria-current/);
  assert.match(progress, /Tiến trình hồ sơ/);
  assert.doesNotMatch(corpus, /localStorage/);
  assert.doesNotMatch(corpus, /completionGate/);
  assert.doesNotMatch(corpus, /preventDefault\(\)/);
});

test("case routes are statically generated with canonical social metadata", () => {
  const route = readSource("app/ho-so/[slug]/page.tsx");

  assert.match(route, /generateStaticParams/);
  assert.match(route, /canonical: `\/ho-so\/\$\{item\.slug\}`/);
  assert.match(route, /openGraph/);
  assert.match(route, /primaryTrace/);
  assert.match(route, /notFound\(\)/);
});
