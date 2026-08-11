import type { MetadataRoute } from "next";

import { siteUrl } from "@/lib/site";

const publicRoutes = [
  "/",
  "/trace/dai-doan-ket",
  "/trace/dao-duc-trach-nhiem",
  "/trace/con-nguoi",
  "/phuong-phap",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return publicRoutes.map((route) => ({
    url: new URL(route, siteUrl).toString(),
  }));
}
