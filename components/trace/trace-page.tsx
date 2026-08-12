import { HistoricalSequence } from "@/components/trace/historical-sequence";
import { JourneyClosing } from "@/components/trace/journey-closing";
import { PresentApplication } from "@/components/trace/present-application";
import { ThoughtFormation } from "@/components/trace/thought-formation";
import { TimeBridge } from "@/components/trace/time-bridge";
import { TraceHeader } from "@/components/trace/trace-header";
import { TraceNavigation } from "@/components/trace/trace-navigation";
import { TraceOpening } from "@/components/trace/trace-opening";
import { TraceProgress } from "@/components/trace/trace-progress";
import { TraceRecap } from "@/components/trace/trace-recap";
import { traceThemes } from "@/lib/trace-themes";
import type {
  CompleteTraceData,
  JourneyClosingData,
  TraceData,
} from "@/types/trace";

type TracePageProps = {
  readonly trace: CompleteTraceData;
  readonly nextTrace: TraceData;
  readonly closing?: never;
} | {
  readonly trace: CompleteTraceData;
  readonly nextTrace?: never;
  readonly closing: JourneyClosingData;
};

export function TracePage({ trace, nextTrace, closing }: TracePageProps) {
  const firstHistoricalYear = trace.historicalMoments[0].year;
  const finalHistoricalYear = trace.historicalMoments[2].year;

  return (
    <div className={`trace-experience ${traceThemes[trace.theme]}`}>
      <TraceHeader slug={trace.slug} title={trace.title} />
      <TraceProgress moments={trace.historicalMoments} />
      <main id="main-content">
        <TraceOpening
          centralQuestion={trace.centralQuestion}
          presentDay={trace.presentDay}
        />
        <TimeBridge
          fromYear="2026"
          historicalImage={trace.historicalMoments[0].image}
          presentImage={trace.presentDay.image}
          toYear={firstHistoricalYear}
          variant="back"
        />
        <HistoricalSequence moments={trace.historicalMoments} />
        <ThoughtFormation formation={trace.thoughtFormation} />
        <TimeBridge
          fromYear={finalHistoricalYear}
          toYear="2026"
          variant="return"
        />
        <PresentApplication
          application={trace.application}
          continuationHref="#trace-recap"
          continuationLabel="Nhìn lại hành trình"
        />
        <TraceRecap trace={trace} />
        {nextTrace ? <TraceNavigation nextTrace={nextTrace} /> : null}
        {closing ? <JourneyClosing closing={closing} /> : null}
      </main>
    </div>
  );
}
