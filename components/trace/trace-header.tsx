import Link from "next/link";

import { TraceSwitcher } from "@/components/trace/trace-switcher";
import { traces } from "@/data/traces";
import type { TraceSlug } from "@/types/trace";

interface TraceHeaderProps {
  readonly title: string;
  readonly slug: TraceSlug;
}

const switcherItems = traces.map(({ order, slug, title }) => ({
  order,
  slug,
  title,
}));

export function TraceHeader({ title, slug }: TraceHeaderProps) {
  return (
    <header className="trace-header">
      <div className="site-container trace-header__inner">
        <Link className="trace-header__brand" href="/">
          ĐUỐC HỒNG
        </Link>
        <span className="trace-header__title">{title}</span>
        <TraceSwitcher currentSlug={slug} items={switcherItems} />
      </div>
    </header>
  );
}
