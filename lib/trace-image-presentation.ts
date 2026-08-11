import type { TraceImage } from "@/types/trace";

const LEGACY_FRAME_CLASSES = new Set([
  "trace-figure__frame--historical",
  "trace-figure__frame--opening",
  "trace-figure__frame--placeholder",
]);

export function getTraceImageFrameClassName(
  image: TraceImage,
  baseClassName: string,
): string {
  const classes = baseClassName
    .split(/\s+/)
    .filter((className) => className && !LEGACY_FRAME_CLASSES.has(className));
  const presentation = image.presentation;

  classes.push(`trace-figure__frame--kind-${image.kind}`);

  if (presentation?.fit) {
    classes.push(`trace-figure__frame--fit-${presentation.fit}`);
  }

  if (presentation?.aspectRatio) {
    classes.push(
      `trace-figure__frame--aspect-${presentation.aspectRatio}`,
    );
  }

  if (presentation?.tone) {
    classes.push(`trace-figure__frame--tone-${presentation.tone}`);
  }

  if (presentation?.background) {
    classes.push(
      `trace-figure__frame--background-${presentation.background}`,
    );
  }

  return classes.join(" ");
}
