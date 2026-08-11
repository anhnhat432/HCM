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

test("conclusion climax separates adjacent authored lines", () => {
  const blocks = getRuleBlocks(
    ".thought-formation__conclusion h3 span + span",
  );

  assert.equal(blocks.length, 1);
  assert.equal(getDeclaration(blocks[0], "margin-top"), "0.18em");
});

test("Next Trace titles use a mobile-only line-height guardrail", () => {
  const blocks = getRuleBlocks(".trace-navigation__title");

  assert.equal(blocks.length, 2);
  assert.equal(getDeclaration(blocks[0], "line-height"), "1.02");
  assert.equal(getDeclaration(blocks[1], "line-height"), "1.07");
});

test("mobile source links provide a full-height touch target", () => {
  const blocks = getRuleBlocks(".trace-source-link");

  assert.equal(blocks.length, 1);
  assert.equal(getDeclaration(blocks[0], "display"), "flex");
  assert.equal(getDeclaration(blocks[0], "align-items"), "center");
  assert.equal(getDeclaration(blocks[0], "min-height"), "2.75rem");
});

test("mobile narrative copy preserves approved line-length guardrails", () => {
  const historicalBlocks = getRuleBlocks(".historical-moment__summary");
  const applicationBlocks = getRuleBlocks(".application-item p");

  assert.equal(historicalBlocks.length, 2);
  assert.equal(applicationBlocks.length, 2);
  assert.equal(getDeclaration(historicalBlocks[1], "max-width"), "40ch");
  assert.equal(getDeclaration(applicationBlocks[1], "max-width"), "40ch");

  for (const block of [historicalBlocks[1], applicationBlocks[1]]) {
    assert.equal(getDeclaration(block, "line-clamp"), undefined);
    assert.equal(getDeclaration(block, "-webkit-line-clamp"), undefined);
    assert.equal(getDeclaration(block, "overflow"), undefined);
  }
});

test("Trace progress keeps inactive years readable and raises mobile type size", () => {
  const blocks = getRuleBlocks(".trace-progress__link");
  const baseBlock = blocks.find(
    (block) => getDeclaration(block, "opacity") !== undefined,
  );
  const mobileBlock = blocks.find(
    (block) => getDeclaration(block, "letter-spacing") === "0.08em",
  );

  assert.ok(baseBlock);
  assert.ok(mobileBlock);
  assert.equal(getDeclaration(baseBlock, "color"), "var(--color-muted)");
  assert.equal(getDeclaration(baseBlock, "opacity"), "1");
  assert.equal(getDeclaration(mobileBlock, "font-size"), "0.625rem");
});

test("Trace progress focus receives the same text emphasis as hover and active", () => {
  assert.match(
    stylesheet,
    /\.trace-progress__link:hover,\s*\.trace-progress__link:focus-visible,\s*\.trace-progress__link\[aria-current="step"\]/,
  );
});
