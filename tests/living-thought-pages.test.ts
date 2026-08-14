import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import { getCasePreviews } from "@/lib/thought-case-registry";

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
