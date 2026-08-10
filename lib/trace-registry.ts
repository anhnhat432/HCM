import { traces } from "@/data/traces";
import { TRACE_SLUGS, type TraceData, type TraceSlug } from "@/types/trace";

export function getTraceBySlug(slug: string): TraceData | undefined {
  return traces.find((trace) => trace.slug === slug);
}

export function getNextTraceSlug(slug: TraceSlug): TraceSlug | null {
  const currentIndex = TRACE_SLUGS.indexOf(slug);
  return TRACE_SLUGS[currentIndex + 1] ?? null;
}
