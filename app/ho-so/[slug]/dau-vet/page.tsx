import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseEvidenceStage } from "@/components/cases/case-evidence-stage";
import { CaseJourneyShell } from "@/components/cases/case-journey-shell";
import { thoughtCases } from "@/data/thought-cases";
import { getThoughtCaseMetadata } from "@/lib/thought-case-metadata";
import { getThoughtCaseBySlug } from "@/lib/thought-case-registry";

interface ThoughtCaseEvidencePageProps {
  readonly params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return thoughtCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ThoughtCaseEvidencePageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    return {
      title: "Không tìm thấy hồ sơ",
      description: "Hồ sơ bạn tìm kiếm không tồn tại trong Đuốc Hồng.",
    };
  }

  return getThoughtCaseMetadata(item, "dau-vet");
}

export default async function ThoughtCaseEvidencePage({
  params,
}: ThoughtCaseEvidencePageProps) {
  const { slug } = await params;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <CaseJourneyShell item={item} stage="dau-vet">
      <CaseEvidenceStage item={item} />
    </CaseJourneyShell>
  );
}
