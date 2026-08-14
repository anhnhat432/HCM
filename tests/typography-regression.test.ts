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

test("case and library display headings use the approved restrained scale", () => {
  const expectedBlocks = new Map<string, readonly string[]>([
    [
      ".scenario-picker-section__heading h2",
      [
        "clamp(2.6rem, 4.6vw, 4.25rem)",
        "clamp(2.4rem, 10.5vw, 3.4rem)",
      ],
    ],
    [
      ".case-present__copy h1",
      [
        "clamp(3.75rem, 6.4vw, 6.75rem)",
        "clamp(3.25rem, 14vw, 4.4rem)",
      ],
    ],
    [
      ".case-assumption h2",
      ["clamp(2.8rem, 4.8vw, 5rem)", "clamp(2.75rem, 11vw, 3.6rem)"],
    ],
    [
      ".case-evidence__heading h2",
      ["clamp(3rem, 5vw, 5.5rem)", "clamp(2.65rem, 11vw, 3.4rem)"],
    ],
    [
      ".case-evidence__record h3",
      ["clamp(2.3rem, 3.6vw, 4rem)", "clamp(2.35rem, 10.5vw, 3.25rem)"],
    ],
    [
      ".case-return__intro h2",
      [
        "clamp(3.1rem, 5.2vw, 5.75rem)",
        "clamp(2.75rem, 11.5vw, 3.5rem)",
      ],
    ],
    [
      ".case-library-page__intro h1",
      ["clamp(3.4rem, 5.5vw, 5rem)", "clamp(2.75rem, 12.5vw, 3.25rem)"],
    ],
  ]);

  for (const [selector, expectedSizes] of expectedBlocks) {
    const blocks = getRuleBlocks(selector);

    assert.equal(blocks.length, 2, `${selector} must have desktop and mobile rules`);
    assert.deepEqual(
      blocks.map((block) => getDeclaration(block, "font-size")),
      expectedSizes,
      `${selector} must preserve the approved type scale`,
    );
  }
});

test("paged case headings override desktop and mobile sizes at equal specificity", () => {
  const fileHeadingBlocks = getRuleBlocks(
    ".case-experience--paged .case-file__sheet h1",
  );
  const connectionHeadingBlocks = getRuleBlocks(
    ".case-experience--paged .case-connection h1",
  );

  assert.equal(fileHeadingBlocks.length, 2);
  assert.equal(connectionHeadingBlocks.length, 2);
  assert.deepEqual(
    fileHeadingBlocks.map((block) => getDeclaration(block, "font-size")),
    ["clamp(2.9rem, 4.8vw, 5rem)", "clamp(2.65rem, 11vw, 3.25rem)"],
  );
  assert.deepEqual(
    connectionHeadingBlocks.map((block) => getDeclaration(block, "font-size")),
    ["clamp(2.9rem, 4.8vw, 5rem)", "clamp(2.75rem, 11.5vw, 3.5rem)"],
  );
  assert.equal(
    getDeclaration(fileHeadingBlocks[0], "margin-top"),
    "clamp(2rem, 2.5vw, 2.5rem)",
  );
});

test("case intros use the approved compact vertical rhythm", () => {
  const libraryIntroBlocks = getRuleBlocks(".case-library-page__intro");
  const pagedPresentBlocks = getRuleBlocks(
    ".case-experience--paged .case-present",
  );
  const pagedFileBlocks = getRuleBlocks(".case-experience--paged .case-file");
  const pagedConnectionBlocks = getRuleBlocks(
    ".case-experience--paged .case-connection",
  );

  assert.deepEqual(
    libraryIntroBlocks.map((block) => getDeclaration(block, "padding-block")),
    [
      "clamp(3.5rem, 6vw, 5.25rem) clamp(2.5rem, 4.5vw, 4rem)",
      "2.75rem 2.5rem",
    ],
  );
  assert.deepEqual(
    pagedPresentBlocks.map((block) => getDeclaration(block, "padding-block")),
    ["clamp(3rem, 5vw, 4.75rem)", "3.25rem 4rem"],
  );
  assert.deepEqual(
    pagedFileBlocks.map((block) => getDeclaration(block, "padding-block")),
    ["clamp(3.5rem, 6vw, 5.5rem)", "4rem"],
  );
  assert.deepEqual(
    pagedConnectionBlocks.map((block) => getDeclaration(block, "padding-block")),
    ["clamp(4.25rem, 7vw, 6.5rem)", "4.75rem"],
  );
});
