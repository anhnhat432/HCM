import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseFilePage } from "@/components/cases/case-file-page";
import { thoughtCases } from "@/data/thought-cases";
import { getThoughtCaseBySlug } from "@/lib/thought-case-registry";
import { getTraceBySlug } from "@/lib/trace-registry";

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

  const primaryTrace = getTraceBySlug(item.primaryTrace);
  const image = primaryTrace?.presentDay?.image;

  return {
    title: item.title,
    description: item.shortPrompt,
    alternates: {
      canonical: `/ho-so/${item.slug}`,
    },
    openGraph: {
      title: `${item.title} | Đuốc Hồng`,
      description: item.shortPrompt,
      siteName: "Đuốc Hồng",
      locale: "vi_VN",
      type: "article",
      images: image?.src
        ? [
            {
              url: image.src,
              alt: image.alt,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${item.title} | Đuốc Hồng`,
      description: item.shortPrompt,
      images: image?.src ? [image.src] : undefined,
    },
  };
}

export default async function ThoughtCasePage({ params }: ThoughtCasePageProps) {
  const { slug } = await params;
  const item = getThoughtCaseBySlug(slug);

  if (!item) {
    notFound();
  }

  return <CaseFilePage item={item} />;
}
