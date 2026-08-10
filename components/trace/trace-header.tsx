import Link from "next/link";

interface TraceHeaderProps {
  readonly title: string;
  readonly order: number;
}

export function TraceHeader({ title, order }: TraceHeaderProps) {
  const chapter = String(order).padStart(2, "0");

  return (
    <header className="trace-header">
      <div className="site-container trace-header__inner">
        <Link className="trace-header__brand" href="/">
          HCM // TRACE
        </Link>
        <span className="trace-header__title">{title}</span>
        <span className="trace-header__chapter">{chapter} / 03</span>
      </div>
    </header>
  );
}
