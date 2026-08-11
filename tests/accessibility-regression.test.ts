import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readSource(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("mapped multiline headings include real whitespace between visual lines", () => {
  const expectedSeparatedLines = new Map([
    ["components/trace/trace-opening.tsx", 1],
    ["components/trace/thought-formation.tsx", 2],
    ["components/trace/present-application.tsx", 1],
    ["components/trace/journey-closing.tsx", 1],
  ]);
  const separatedLinePattern =
    /<span key=\{line\}>\s*\{line\}\s*\{" "\}\s*<\/span>/g;

  for (const [path, expectedCount] of expectedSeparatedLines) {
    const source = readSource(path);
    const matches = source.match(separatedLinePattern) ?? [];

    assert.equal(
      matches.length,
      expectedCount,
      `${path} must separate every authored heading line in DOM text`,
    );
  }
});

test("Homepage multiline heading includes real whitespace between visual lines", () => {
  const source = readSource("app/page.tsx");
  const heading = source.match(
    /<h1 className="home-hero__title"[\s\S]*?<\/h1>/,
  )?.[0];

  assert.ok(heading, "Homepage hero heading must exist");

  const visualLines = Array.from(
    heading.matchAll(
      /<span className="home-hero__title-line">([\s\S]*?)<\/span>/g,
    ),
    (match) => match[1],
  );

  assert.equal(visualLines.length, 4);
  assert.ok(
    visualLines.every((line) => /\{" "\}\s*$/.test(line)),
    "Every Homepage heading line must end with real DOM whitespace",
  );
});
