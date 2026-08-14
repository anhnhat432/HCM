import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseJourneyShell } from "@/components/cases/case-journey-shell";
import { CasePresentStage } from "@/components/cases/case-present-stage";
import { thoughtCases } from "@/data/thought-cases";
import { getThoughtCaseMetadata } from "@/lib/thought-case-metadata";
import { getThoughtCaseBySlug } from "@/lib/thought-case-registry";

interface ThoughtCasePageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return thoughtCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ThoughtCasePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    return {
      title: "Không tìm thấy hồ sơ",
      description: "Hồ sơ bạn tìm kiếm không tồn tại trong Đuốc Hồng.",
    };
  }

  return getThoughtCaseMetadata(item, "hien-tai");
}

export default async function ThoughtCasePage({ params }: ThoughtCasePageProps) {
  const { slug } = await params;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <CaseJourneyShell item={item} stage="hien-tai">
      <CasePresentStage item={item} />
    </CaseJourneyShell>
  );
}
