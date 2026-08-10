import { HistoricalMoment } from "@/components/trace/historical-moment";
import type { HistoricalMoments } from "@/types/trace";

interface HistoricalSequenceProps {
  readonly moments: HistoricalMoments;
}

const nextTargets = [
  { href: "#moment-1941", label: "Tiếp theo" },
  { href: "#moment-1945", label: "Tiếp theo" },
  { href: "#thought-formation", label: "Tư tưởng hình thành" },
] as const;

export function HistoricalSequence({ moments }: HistoricalSequenceProps) {
  return (
    <>
      {moments.map((moment, index) => (
        <HistoricalMoment
          imageRight={index % 2 === 1}
          key={moment.id}
          moment={moment}
          nextHref={nextTargets[index].href}
          nextLabel={nextTargets[index].label}
        />
      ))}
    </>
  );
}
