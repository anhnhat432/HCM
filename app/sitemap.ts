import type { MetadataRoute } from "next";

import { thoughtCases } from "@/data/thought-cases";
import { siteUrl } from "@/lib/site";

const publicRoutes = [
  "/",
  "/trace/dai-doan-ket",
  "/trace/dao-duc-trach-nhiem",
  "/trace/con-nguoi",
  "/phuong-phap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const caseRoutes = thoughtCases.map((item) => `/ho-so/${item.slug}`);
  const routes = [...publicRoutes, "/ho-so", ...caseRoutes];

  return routes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
