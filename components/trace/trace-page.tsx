import { HistoricalSequence } from "@/components/trace/historical-sequence";
import { PresentApplication } from "@/components/trace/present-application";
import { ThoughtFormation } from "@/components/trace/thought-formation";
import { TimeBridge } from "@/components/trace/time-bridge";
import { TraceHeader } from "@/components/trace/trace-header";
import { TraceNavigation } from "@/components/trace/trace-navigation";
import { TraceOpening } from "@/components/trace/trace-opening";
import { traceThemes } from "@/lib/trace-themes";
import type { CompleteTraceData, TraceData } from "@/types/trace";

interface TracePageProps {
  readonly trace: CompleteTraceData;
  readonly nextTrace: TraceData;
}

export function TracePage({ trace, nextTrace }: TracePageProps) {
  return (
    <div className={`trace-experience ${traceThemes[trace.theme]}`}>
      <TraceHeader order={trace.order} title={trace.title} />
      <main id="main-content">
        <TraceOpening
          centralQuestion={trace.centralQuestion}
          presentDay={trace.presentDay}
        />
        <TimeBridge variant="back" />
        <HistoricalSequence moments={trace.historicalMoments} />
        <ThoughtFormation formation={trace.thoughtFormation} />
        <TimeBridge variant="return" />
        <PresentApplication application={trace.application} />
        <TraceNavigation nextTrace={nextTrace} />
      </main>
    </div>
  );
}
