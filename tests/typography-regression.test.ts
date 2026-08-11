import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const stylesheet = readFileSync(
  new URL("../app/globals.css", import.meta.url),
  "utf8",
);

function getRuleBlocks(selector: string): string[] {
  const escapedSelector = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const rulePattern = new RegExp(
    `^\\s*${escapedSelector}\\s*\\{([^}]*)\\}`,
    "gm",
  );

  return Array.from(stylesheet.matchAll(rulePattern), (match) => match[1]);
}

function getDeclaration(block: string, property: string): string | undefined {
  const escapedProperty = property.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const declarationPattern = new RegExp(
    `(?:^|\\n)\\s*${escapedProperty}\\s*:\\s*([^;]+);`,
  );

  return block.match(declarationPattern)?.[1].trim();
}

test("Thought Formation headings preserve Vietnamese line spacing", () => {
  const blocks = getRuleBlocks(".thought-formation__heading");

  assert.equal(blocks.length, 2);
  assert.equal(getDeclaration(blocks[0], "line-height"), "1.1");
  assert.equal(getDeclaration(blocks[1], "line-height"), "1.1");
});

test("conclusion climax preserves its approved compact line spacing", () => {
  const blocks = getRuleBlocks(".thought-formation__conclusion h3");

  assert.equal(blocks.length, 2);
  assert.equal(getDeclaration(blocks[0], "line-height"), "1.04");
  assert.equal(getDeclaration(blocks[1], "line-height"), undefined);
});

test("Next Trace titles use a mobile-only line-height guardrail", () => {
  const blocks = getRuleBlocks(".trace-navigation__title");

  assert.equal(blocks.length, 2);
  assert.equal(getDeclaration(blocks[0], "line-height"), "1.02");
  assert.equal(getDeclaration(blocks[1], "line-height"), "1.07");
});
