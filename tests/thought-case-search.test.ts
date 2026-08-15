import assert from "node:assert/strict";
import test from "node:test";

import { normalizeCaseSearchValue } from "@/lib/thought-case-search";

test("Vietnamese case search normalizes uppercase and lowercase D with stroke", () => {
  assert.equal(normalizeCaseSearchValue("Điểm số"), "diem so");
  assert.equal(normalizeCaseSearchValue("điểm số"), "diem so");
});

test("Vietnamese case search removes combining accents consistently", () => {
  assert.equal(
    normalizeCaseSearchValue("Lãnh đạo & trách nhiệm"),
    "lanh dao & trach nhiem",
  );
});
