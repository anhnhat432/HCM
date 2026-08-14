import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { CaseFilePage } from "@/components/cases/case-file-page";
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

test("case page server markup contains the complete six-act narrative", () => {
  const item = getThoughtCaseBySlug("nhom-gioi-nhung-khong-hop-tac");
  assert.ok(item);

  const html = renderToStaticMarkup(createElement(CaseFilePage, { item }));

  for (const id of [
    "case-present",
    "case-assumption",
    "case-file",
    "case-evidence",
    "case-connection",
    "case-return",
  ]) {
    assert.match(html, new RegExp(`id="${id}"`));
  }

  assert.equal((html.match(/<h1/g) ?? []).length, 1);
  assert.equal((html.match(/case-evidence__reveal/g) ?? []).length, 3);
  assert.equal((html.match(/Nguồn &amp; kiểm chứng/g) ?? []).length, 3);
  assert.equal((html.match(/case-evidence__no-script-sources/g) ?? []).length, 3);
  assert.match(html, /Mở hồ sơ khác/);
  assert.match(html, /Đọc Trace đầy đủ/);
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
