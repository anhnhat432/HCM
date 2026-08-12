import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function readSource(path: string): string {
  return readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
}

test("the restored experience keeps QR sharing without storytelling layers", () => {
  const homepage = readSource("app/page.tsx");
  const traceHeader = readSource("components/trace/trace-header.tsx");
  const sourceCorpus = [
    readSource("app/globals.css"),
    readSource("components/trace/historical-moment.tsx"),
    readSource("components/trace/journey-closing.tsx"),
    readSource("components/trace/thought-formation.tsx"),
    readSource("components/trace/time-bridge.tsx"),
    readSource("components/trace/trace-page.tsx"),
  ].join("\n");

  assert.ok(homepage.includes("QrShareDialog"));
  assert.ok(traceHeader.includes("QrShareDialog"));

  for (const removedArtifact of [
    "trace-back-story",
    "formation-convergence",
    "historical-moment__continuity",
    "journey-trace-mark",
  ]) {
    assert.equal(
      sourceCorpus.includes(removedArtifact),
      false,
      `${removedArtifact} should not remain in the QR-only experience`,
    );
  }
});
