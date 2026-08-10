import { HistoricalMoment } from "@/components/trace/historical-moment";
import type { HistoricalMoments } from "@/types/trace";

interface HistoricalSequenceProps {
  readonly moments: HistoricalMoments;
}

export function HistoricalSequence({ moments }: HistoricalSequenceProps) {
  return (
    <>
      {moments.map((moment, index) => {
        const nextMoment = moments[index + 1];

        return (
          <HistoricalMoment
            imageRight={index % 2 === 1}
            key={moment.id}
            moment={moment}
            nextHref={
              nextMoment ? `#moment-${nextMoment.year}` : "#thought-formation"
            }
            nextLabel={nextMoment ? "Tiếp theo" : "Tư tưởng hình thành"}
          />
        );
      })}
    </>
  );
}
