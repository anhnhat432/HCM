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
        "clamp(2.35rem, 3.4vw, 3.4rem)",
        "clamp(2.1rem, 8.8vw, 2.65rem)",
      ],
    ],
    [
      ".case-assumption h2",
      ["clamp(2rem, 3vw, 3rem)", "clamp(1.9rem, 7.8vw, 2.45rem)"],
    ],
    [
      ".case-evidence__heading h2",
      ["clamp(2rem, 3vw, 3rem)", "clamp(1.9rem, 7.8vw, 2.45rem)"],
    ],
    [
      ".case-evidence__record h3",
      ["clamp(1.55rem, 2.2vw, 2.3rem)", "clamp(1.55rem, 6.8vw, 2.1rem)"],
    ],
    [
      ".case-return__intro h2",
      [
        "clamp(2rem, 3vw, 3rem)",
        "clamp(1.9rem, 7.8vw, 2.45rem)",
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
    ["clamp(2.2rem, 3.2vw, 3.2rem)", "clamp(2rem, 8.2vw, 2.55rem)"],
  );
  assert.deepEqual(
    connectionHeadingBlocks.map((block) => getDeclaration(block, "font-size")),
    ["clamp(2.2rem, 3.2vw, 3.2rem)", "clamp(2rem, 8.2vw, 2.55rem)"],
  );
  assert.equal(
    getDeclaration(fileHeadingBlocks[0], "margin-top"),
    "clamp(2rem, 2.5vw, 2.5rem)",
  );
});

test("paged case stages share one editorial grid and remove redundant framing", () => {
  const editorialGrid = "minmax(9rem, 0.32fr) minmax(0, 1fr)";

  for (const selector of [
    ".case-present__grid",
    ".case-file__grid",
    ".case-evidence__heading",
    ".case-connection__grid",
    ".case-return__grid",
  ]) {
    const block = getRuleBlocks(selector)[0];

    assert.ok(block, `${selector} must have a base rule`);
    assert.equal(
      getDeclaration(block, "grid-template-columns"),
      editorialGrid,
      `${selector} must use the shared editorial grid`,
    );
  }

  assert.equal(
    getDeclaration(getRuleBlocks(".case-stage-progress__inner")[0], "grid-template-columns"),
    "1fr",
  );
  assert.equal(
    getDeclaration(getRuleBlocks(".case-stage-position")[0], "display"),
    "none",
  );
  assert.equal(
    getDeclaration(getRuleBlocks(".experience-guide")[0], "grid-column"),
    "2",
  );
  assert.equal(
    getDeclaration(getRuleBlocks(".case-present__file-mark span")[0], "display"),
    "none",
  );
  assert.equal(
    getDeclaration(
      getRuleBlocks(".case-file__sheet > p:first-child span")[0],
      "display",
    ),
    "none",
  );

  const sheet = getRuleBlocks(".case-file__sheet")[0];

  assert.equal(getDeclaration(sheet, "padding"), "0");
  assert.equal(getDeclaration(sheet, "border"), "0");
  assert.equal(getDeclaration(sheet, "background"), "transparent");
  assert.equal(
    getDeclaration(getRuleBlocks(".case-file__sheet::before")[0], "display"),
    "none",
  );
});

test("paged case stages use one archival transcript language", () => {
  for (const selector of [
    ".case-assumption h2",
    ".case-evidence__heading h2",
    ".case-evidence__record h3",
    ".case-connection li h2",
    ".case-return__intro h2",
    ".case-return__lenses h3",
    ".case-return__next > div > h3",
  ]) {
    assert.equal(
      getDeclaration(getRuleBlocks(selector)[0], "font-family"),
      "var(--font-body), sans-serif",
      `${selector} must use the structural body face`,
    );
  }

  const connection = getRuleBlocks(".case-connection")[0];
  const pagedExperience = getRuleBlocks(".case-experience--paged")[0];

  assert.ok(pagedExperience, "paged cases must define a scoped archival palette");
  assert.equal(getDeclaration(pagedExperience, "--case-archive"), "#315044");
  assert.equal(getDeclaration(connection, "color"), "var(--color-ink)");
  assert.equal(getDeclaration(connection, "background"), "var(--color-canvas)");
  assert.equal(
    getDeclaration(getRuleBlocks(".case-assumption")[0], "background"),
    "var(--color-canvas)",
  );
  assert.equal(
    getDeclaration(getRuleBlocks(".case-assumption")[0], "color"),
    "var(--color-ink)",
  );
  assert.equal(
    getDeclaration(getRuleBlocks(".case-connection ol")[0], "grid-template-columns"),
    "1fr",
  );
  assert.equal(
    getDeclaration(getRuleBlocks(".case-connection li")[0], "grid-template-columns"),
    "minmax(4.5rem, 0.16fr) minmax(0, 1fr)",
  );

  const timestamp = getRuleBlocks(".case-connection__timestamp")[0];

  assert.ok(timestamp, "formation factors must expose transcript timestamps");
  assert.equal(getDeclaration(timestamp, "color"), "var(--case-archive)");
  assert.equal(getDeclaration(timestamp, "font-family"), "var(--font-body), sans-serif");
  assert.equal(getDeclaration(timestamp, "font-variant-numeric"), "tabular-nums");

  const conclusionBlocks = getRuleBlocks(".case-connection__conclusion");
  const conclusion = conclusionBlocks[0];
  const mobileConclusion = conclusionBlocks.find(
    (block, index) => index > 0 && getDeclaration(block, "font-size"),
  );

  assert.equal(
    getDeclaration(conclusion, "font-family"),
    "var(--font-display), serif",
  );
  assert.equal(
    getDeclaration(conclusion, "font-size"),
    "clamp(1.65rem, 2.5vw, 2.3rem)",
  );
  assert.equal(
    getDeclaration(mobileConclusion ?? "", "font-size"),
    "clamp(1.5rem, 6.4vw, 1.95rem)",
  );
  assert.equal(getDeclaration(conclusion, "font-weight"), "400");
  assert.equal(
    getDeclaration(conclusion, "color"),
    "var(--color-ink)",
  );
  assert.equal(
    getDeclaration(conclusion, "border-top"),
    "4px solid var(--case-archive)",
  );
  assert.equal(
    getDeclaration(conclusion, "border-left"),
    "0",
  );
  assert.equal(
    getDeclaration(conclusion, "text-transform"),
    "none",
  );
  const conclusionLabel = getRuleBlocks(
    ".case-connection__conclusion-label",
  )[0];

  assert.ok(conclusionLabel, "the conclusion must be explicitly framed");
  assert.equal(getDeclaration(conclusionLabel, "color"), "var(--case-archive)");
});

test("paged case chrome replaces the red trace motif with archival timestamps", () => {
  const progressNumber = getRuleBlocks(
    ".case-stage-progress__link > span:first-child",
  )[0];
  const evidenceYear = getRuleBlocks(".case-evidence__record time")[0];

  for (const block of [progressNumber, evidenceYear]) {
    assert.equal(getDeclaration(block, "color"), "var(--case-archive)");
    assert.equal(getDeclaration(block, "font-family"), "var(--font-body), sans-serif");
    assert.equal(getDeclaration(block, "font-variant-numeric"), "tabular-nums");
  }

  assert.match(
    stylesheet,
    /\.case-experience--paged \.case-present__file-mark i,[\s\S]*?\.case-experience--paged \.case-return::before\s*\{[\s\S]*?display:\s*none;/,
  );
});

test("case stage entry links share one restrained primary treatment", () => {
  for (const selector of [".case-scroll-cue", ".case-file__sheet > a"]) {
    const block = getRuleBlocks(selector)[0];

    assert.ok(block, `${selector} must have a base rule`);
    assert.equal(getDeclaration(block, "border-bottom"), "1px solid currentColor");
    assert.equal(getDeclaration(block, "font-size"), "0.95rem");
    assert.equal(getDeclaration(block, "font-weight"), "500");
    assert.equal(getDeclaration(block, "letter-spacing"), "normal");
    assert.equal(getDeclaration(block, "text-decoration"), "none");
    assert.equal(getDeclaration(block, "text-transform"), "none");
  }
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
    ["clamp(3.5rem, 5.5vw, 5rem)", "3.5rem"],
  );
});
