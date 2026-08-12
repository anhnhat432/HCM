import Link from "next/link";

import { TraceBackStory } from "@/components/trace/trace-back-story";
import { TraceReveal } from "@/components/trace/reveal";
import { TraceLine } from "@/components/trace/trace-line";
import type { TraceImage, TracePresentDay } from "@/types/trace";

type TimeBridgeProps =
  | {
      readonly variant: "back";
      readonly fromYear: string;
      readonly toYear: string;
      readonly presentImage: TracePresentDay["image"];
      readonly historicalImage?: TraceImage;
    }
  | {
      readonly variant: "return";
      readonly fromYear: string;
      readonly toYear: string;
    };

export function TimeBridge(props: TimeBridgeProps) {
  const { variant, fromYear, toYear } = props;

  if (variant === "back") {
    return (
      <section
        className="time-bridge time-bridge--story"
        data-trace-stage="trace-back"
        id="trace-back"
        aria-labelledby="trace-back-title"
      >
        <TraceBackStory
          fromYear={fromYear}
          headingId="trace-back-title"
          historicalImage={props.historicalImage}
          presentImage={props.presentImage}
          toYear={toYear}
        />
        <div className="site-container time-bridge__story-cue">
          <Link className="time-bridge__cue" href={`#moment-${toYear}`}>
            Bắt đầu ↓
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      className="time-bridge time-bridge--return"
      data-trace-stage="return-2026"
      id="return-2026"
      aria-labelledby="return-title"
    >
      <div className="site-container time-bridge__inner">
        <TraceLine direction="return" fromYear={fromYear} toYear={toYear} />

        <TraceReveal>
          <h2 className="time-bridge__title" id="return-title">
            Trở lại
            <br />
            năm 2026.
          </h2>
          <p className="time-bridge__body">
            Vấn đề ban đầu vẫn ở đó.
            <br />
            Nhưng giờ đây, ta có thể nhìn nó theo một cách khác.
          </p>
        </TraceReveal>

        <Link className="time-bridge__action" href="#application">
          Xem cách áp dụng <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
