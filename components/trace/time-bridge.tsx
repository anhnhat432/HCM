import Link from "next/link";

import { TraceReveal } from "@/components/trace/reveal";
import { TraceLine } from "@/components/trace/trace-line";

interface TimeBridgeProps {
  readonly variant: "back" | "return";
}

export function TimeBridge({ variant }: TimeBridgeProps) {
  if (variant === "back") {
    return (
      <section
        className="time-bridge"
        data-trace-stage="trace-back"
        id="trace-back"
        aria-labelledby="trace-back-title"
      >
        <div className="site-container time-bridge__inner">
          <TraceReveal>
            <p className="time-bridge__kicker">Để hiểu câu trả lời,</p>
            <h2 className="time-bridge__intro" id="trace-back-title">
              hãy lần theo dấu vết
              <br />
              của tư tưởng.
            </h2>
          </TraceReveal>

          <TraceLine direction="back" fromYear="2026" toYear="1930" />

          <Link className="time-bridge__cue" href="#moment-1930">
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
        <TraceLine direction="return" fromYear="1945" toYear="2026" />

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
