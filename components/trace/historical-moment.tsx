import Image from "next/image";
import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import { SourceDrawer } from "@/components/trace/source-drawer";
import { getTraceImageFrameClassName } from "@/lib/trace-image-presentation";
import { getSourceDrawerDetails } from "@/lib/trace-sources";
import type { HistoricalMoment as HistoricalMomentData } from "@/types/trace";

interface HistoricalMomentProps {
  readonly moment: HistoricalMomentData;
  readonly imageRight: boolean;
  readonly nextHref: string;
  readonly nextLabel: string;
}

export function HistoricalMoment({
  moment,
  imageRight,
  nextHref,
  nextLabel,
}: HistoricalMomentProps) {
  const image = moment.image;

  return (
    <section
      className={`historical-moment${imageRight ? " historical-moment--image-right" : ""}`}
      data-trace-stage={moment.year}
      id={`moment-${moment.year}`}
      aria-labelledby={`moment-${moment.year}-title`}
    >
      <div className="site-container historical-moment__grid">
        <TraceReveal className="historical-moment__copy">
          <time className="historical-moment__year" dateTime={moment.year}>
            {moment.year}
          </time>
          <h2 className="historical-moment__title" id={`moment-${moment.year}-title`}>
            {moment.title}
          </h2>
          <p className="historical-moment__summary">{moment.summary}</p>
          {moment.metadata ? (
            <p className="historical-moment__metadata">{moment.metadata}</p>
          ) : null}
          <SourceDrawer details={getSourceDrawerDetails(moment)} />
          <Link className="trace-sequence-link" href={nextHref}>
            <span aria-hidden="true" />
            {nextLabel}
            <b aria-hidden="true">→</b>
          </Link>
        </TraceReveal>

        {image ? (
          <TraceReveal className="historical-moment__visual" delay={0.08} image>
            <figure className="trace-figure">
              <div
                className={getTraceImageFrameClassName(
                  image,
                  "trace-figure__frame",
                )}
              >
                {image.src ? (
                  <Image
                    alt={image.alt}
                    className="trace-figure__image"
                    fill
                    sizes="(max-width: 48rem) calc(100vw - 4rem), 520px"
                    src={image.src}
                    style={{
                      objectPosition: image.presentation?.objectPosition,
                    }}
                  />
                ) : (
                  <div
                    aria-label={image.alt}
                    className="trace-figure__placeholder"
                    role="img"
                  >
                    <span>{moment.year}</span>
                    <i aria-hidden="true" />
                    <p>Tư liệu đang được bổ sung</p>
                  </div>
                )}
              </div>
              {image.caption || image.credit ? (
                <figcaption className="trace-figure__caption">
                  {image.caption ? <span>{image.caption}</span> : null}
                  <span className="trace-figure__credit">
                    Nguồn ảnh: {image.sourceUrl ? (
                      <a
                        href={image.sourceUrl}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {image.credit}
                      </a>
                    ) : (
                      image.credit
                    )}
                  </span>
                </figcaption>
              ) : null}
            </figure>
          </TraceReveal>
        ) : null}
      </div>
    </section>
  );
}
