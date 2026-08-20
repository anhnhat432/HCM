import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseJourneyShell } from "@/components/cases/case-journey-shell";
import { CaseReturnStage } from "@/components/cases/case-return-stage";
import { thoughtCases } from "@/data/thought-cases";
import { getThoughtCaseMetadata } from "@/lib/thought-case-metadata";
import { getThoughtCaseBySlug } from "@/lib/thought-case-registry";

interface ThoughtCaseReturnPageProps {
  readonly params: Promise<{ slug: string }>;
  readonly searchParams?: Promise<{ p?: string }>;
}

export function generateStaticParams() {
  return thoughtCases.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: ThoughtCaseReturnPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    return {
      title: "Không tìm thấy hồ sơ",
      description: "Hồ sơ bạn tìm kiếm không tồn tại trong Đuốc Hồng.",
    };
  }

  return getThoughtCaseMetadata(item, "tro-lai");
}

export default async function ThoughtCaseReturnPage({
  params,
  searchParams,
}: ThoughtCaseReturnPageProps) {
  const { slug } = await params;
  const search = searchParams ? await searchParams : undefined;
  const perspective = search?.p ?? null;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <CaseJourneyShell item={item} perspective={perspective} stage="tro-lai">
      <CaseReturnStage item={item} perspective={perspective} />
    </CaseJourneyShell>
  );
}
