import Link from "next/link";
import { notFound } from "next/navigation";

import { TracePage } from "@/components/trace/trace-page";
import { traces } from "@/data/traces";
import { getNextTraceSlug, getTraceBySlug } from "@/lib/trace-registry";
import { traceThemes } from "@/lib/trace-themes";
import type { CompleteTraceData } from "@/types/trace";

interface TracePlaceholderPageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return traces.map((trace) => ({ slug: trace.slug }));
}

export default async function TracePlaceholderPage({
  params,
}: TracePlaceholderPageProps) {
  const { slug } = await params;
  const trace = getTraceBySlug(slug);

  if (!trace) {
    notFound();
  }

  const nextSlug = getNextTraceSlug(trace.slug);
  const nextTrace = nextSlug ? getTraceBySlug(nextSlug) : undefined;
  const hasCompleteExperience =
    trace.presentDay &&
    trace.centralQuestion &&
    trace.thoughtFormation &&
    trace.application;

  if (hasCompleteExperience && nextTrace) {
    return (
      <TracePage trace={trace as CompleteTraceData} nextTrace={nextTrace} />
    );
  }

  const chapter = String(trace.order).padStart(2, "0");

  return (
    <main
      className={`trace-placeholder ${traceThemes[trace.theme]}`}
      id="main-content"
    >
      <div className="site-container trace-placeholder__inner">
        <header className="trace-placeholder__header">
          <Link className="trace-placeholder__brand" href="/">
            ĐUỐC HỒNG
          </Link>
          <span>{chapter} / 03</span>
        </header>

        <div className="trace-placeholder__content">
          <p className="trace-placeholder__eyebrow">Trace foundation</p>
          <h1>{trace.title}</h1>
          <p className="trace-placeholder__message">
            Nội dung Trace chưa được triển khai trong phase này. Homepage và nền
            tảng điều hướng đã sẵn sàng để được review trước.
          </p>
          <Link className="text-link" href="/">
            Về trang chủ <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
