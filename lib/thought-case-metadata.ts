import type { Metadata } from "next";

import {
  getCaseStageHref,
  type CaseJourneyStage,
} from "@/lib/thought-case-journey";
import { getTraceBySlug } from "@/lib/trace-registry";
import type { ThoughtCase } from "@/types/thought-case";

const STAGE_TITLE_SUFFIX: Record<CaseJourneyStage, string> = {
  "hien-tai": "",
  "dau-vet": " - Dấu vết lịch sử",
  "tro-lai": " - Trở lại hiện tại",
};

export function getThoughtCaseMetadata(
  item: ThoughtCase,
  stage: CaseJourneyStage,
): Metadata {
  const title = `${item.title}${STAGE_TITLE_SUFFIX[stage]}`;
  const canonical = getCaseStageHref(item.slug, stage);
  const primaryTrace = getTraceBySlug(item.primaryTrace);
  const image = primaryTrace?.presentDay?.image;

  return {
    title,
    description: item.shortPrompt,
    alternates: { canonical },
    openGraph: {
      title: `${title} | Đuốc Hồng`,
      description: item.shortPrompt,
      siteName: "Đuốc Hồng",
      locale: "vi_VN",
      type: "article",
      url: canonical,
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
      title: `${title} | Đuốc Hồng`,
      description: item.shortPrompt,
      images: image?.src ? [image.src] : undefined,
    },
  };
}
