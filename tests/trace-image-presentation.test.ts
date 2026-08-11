import assert from "node:assert/strict";
import test from "node:test";

import { getTraceImageFrameClassName } from "@/lib/trace-image-presentation";
import type { TraceImage } from "@/types/trace";

function createImage(overrides: Partial<TraceImage>): TraceImage {
  return {
    alt: "Tư liệu kiểm thử presentation",
    credit: "ĐUỐC HỒNG",
    verificationStatus: "verified",
    usageStatus: "approved",
    kind: "historical-photo",
    ...overrides,
  };
}

test("document presentation produces data-driven frame modifiers", () => {
  const image = createImage({
    kind: "document",
    presentation: {
      fit: "contain",
      aspectRatio: "document",
      tone: "natural",
      background: "paper",
    },
  });

  assert.equal(
    getTraceImageFrameClassName(image, "trace-figure__frame"),
    "trace-figure__frame trace-figure__frame--kind-document trace-figure__frame--fit-contain trace-figure__frame--aspect-document trace-figure__frame--tone-natural trace-figure__frame--background-paper",
  );
});

test("historical photo presentation does not encode a year or legacy class", () => {
  const image = createImage({
    presentation: {
      fit: "cover",
      aspectRatio: "landscape",
      tone: "archival",
      objectPosition: "14% center",
      background: "neutral",
    },
  });
  const className = getTraceImageFrameClassName(
    image,
    "trace-figure__frame trace-figure__frame--historical",
  );

  assert.match(className, /trace-figure__frame--kind-historical-photo/);
  assert.match(className, /trace-figure__frame--fit-cover/);
  assert.match(className, /trace-figure__frame--aspect-landscape/);
  assert.doesNotMatch(className, /1945/);
  assert.doesNotMatch(className, /trace-figure__frame--historical(?:\s|$)/);
});
