import type { TraceThemeKey } from "@/types/trace";

export const traceThemes = {
  unity: "trace-theme--unity",
  responsibility: "trace-theme--responsibility",
  humanity: "trace-theme--humanity",
} as const satisfies Record<TraceThemeKey, string>;
