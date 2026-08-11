import Image from "next/image";
import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import { getTraceImageFrameClassName } from "@/lib/trace-image-presentation";
import type { TracePresentDay } from "@/types/trace";

interface TraceOpeningProps {
  readonly presentDay: TracePresentDay;
  readonly centralQuestion: string;
}

export function TraceOpening({
  presentDay,
  centralQuestion,
}: TraceOpeningProps) {
  return (
    <section
      className="trace-opening"
      data-trace-stage="present-day"
      id="trace-opening"
      aria-labelledby="trace-opening-title"
    >
      <div className="site-container trace-opening__grid">
        <div className="trace-opening__copy">
          <TraceReveal>
            <p className="trace-eyebrow">{presentDay.label}</p>
          </TraceReveal>

          <TraceReveal delay={0.06}>
            <h1 className="trace-opening__title" id="trace-opening-title">
              {presentDay.headline.map((line) => (
                <span key={line}>{line}{" "}</span>
              ))}
            </h1>
          </TraceReveal>

          <TraceReveal delay={0.12}>
            <p className="trace-opening__summary">{presentDay.summary}</p>
          </TraceReveal>

          <TraceReveal delay={0.16}>
            <blockquote className="trace-opening__question">
              “{centralQuestion}”
            </blockquote>
          </TraceReveal>

          <TraceReveal delay={0.2}>
            <Link className="trace-text-link trace-text-link--down" href="#trace-back">
              Nhìn lại quá khứ <span aria-hidden="true">↓</span>
            </Link>
          </TraceReveal>
        </div>

        <TraceReveal className="trace-opening__visual" delay={0.1} image>
          <figure className="trace-figure">
            <div
              className={getTraceImageFrameClassName(
                presentDay.image,
                "trace-figure__frame",
              )}
            >
              <Image
                alt={presentDay.image.alt}
                className="trace-figure__image"
                fill
                priority
                sizes="(max-width: 48rem) calc(100vw - 4rem), 520px"
                src={presentDay.image.src}
                style={{
                  objectPosition: presentDay.image.presentation?.objectPosition,
                }}
              />
            </div>
            {presentDay.image.caption || presentDay.image.credit ? (
              <figcaption className="trace-figure__caption">
                {presentDay.image.caption ? (
                  <span>{presentDay.image.caption}</span>
                ) : null}
                <span className="trace-figure__credit">
                  Nguồn ảnh: {presentDay.image.sourceUrl ? (
                    <a
                      href={presentDay.image.sourceUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {presentDay.image.credit}
                    </a>
                  ) : (
                    presentDay.image.credit
                  )}
                </span>
              </figcaption>
            ) : null}
          </figure>
        </TraceReveal>
      </div>
    </section>
  );
}
