import Image from "next/image";
import Link from "next/link";

import { SourceDrawer } from "@/components/trace/source-drawer";
import { getTraceImageFrameClassName } from "@/lib/trace-image-presentation";
import { getSourceDrawerDetails } from "@/lib/trace-sources";
import type { CompleteTraceData, HistoricalMoment } from "@/types/trace";
import type { CaseReveal } from "@/types/thought-case";

interface CaseEvidenceProps {
  readonly index: 0 | 1 | 2;
  readonly moment: HistoricalMoment;
  readonly reveal: CaseReveal;
  readonly trace: CompleteTraceData;
}

export function CaseEvidence({
  index,
  moment,
  reveal,
  trace,
}: CaseEvidenceProps) {
  const image = moment.image;
  const revealNumber = index + 1;

  return (
    <article
      aria-labelledby={`case-reveal-${revealNumber}-title`}
      className="case-evidence__reveal"
      id={`case-reveal-${revealNumber}`}
    >
      <div className="site-container case-evidence__grid">
        <div className="case-evidence__margin" aria-hidden="true">
          <span>DẤU VẾT {String(revealNumber).padStart(2, "0")}</span>
          <i />
        </div>

        <div className="case-evidence__copy">
          <p className="case-evidence__assumption">
            <span>Ta thường nghĩ</span>
            {reveal.assumption}
          </p>

          <div className="case-evidence__record">
            <p>
              <span>{trace.shortTitle}</span>
              <time dateTime={moment.year}>{moment.year}</time>
            </p>
            <h3 id={`case-reveal-${revealNumber}-title`}>{moment.title}</h3>
            <p>{moment.summary}</p>
            {moment.metadata ? <small>{moment.metadata}</small> : null}
          </div>

          <div className="case-evidence__interpretation">
            <p>
              <span>Dữ kiện cho thấy</span>
              {reveal.finding}
            </p>
            <p>
              <span>Vì vậy cần nhìn lại</span>
              {reveal.reframe}
            </p>
          </div>

          <div className="case-evidence__actions">
            <SourceDrawer details={getSourceDrawerDetails(moment)} />
            <Link href={`/trace/${trace.slug}#moment-${moment.year}`}>
              Đến mốc lịch sử <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {image ? (
          <figure className="case-evidence__figure">
            <div
              className={getTraceImageFrameClassName(
                image,
                "trace-figure__frame case-evidence__image-frame",
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
              <figcaption>
                {image.caption ? <span>{image.caption}</span> : null}
                <span>
                  Nguồn ảnh: {image.sourceUrl ? (
                    <a href={image.sourceUrl} rel="noreferrer" target="_blank">
                      {image.credit}
                    </a>
                  ) : (
                    image.credit
                  )}
                </span>
              </figcaption>
            ) : null}
          </figure>
        ) : null}
      </div>
    </article>
  );
}
