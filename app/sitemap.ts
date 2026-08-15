import type { MetadataRoute } from "next";

import { thoughtCases } from "@/data/thought-cases";
import {
  CASE_JOURNEY_STAGES,
  getCaseStageHref,
} from "@/lib/thought-case-journey";
import { siteUrl } from "@/lib/site";

const publicRoutes = [
  "/",
  "/trace/dai-doan-ket",
  "/trace/dao-duc-trach-nhiem",
  "/trace/con-nguoi",
  "/phuong-phap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const caseRoutes = thoughtCases.flatMap((item) =>
    CASE_JOURNEY_STAGES.map((stage) => getCaseStageHref(item.slug, stage)),
  );
  const routes = [...publicRoutes, "/ho-so", ...caseRoutes];

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
