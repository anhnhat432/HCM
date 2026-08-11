const fallbackSiteUrl = "https://hcm-trace.vercel.app";

const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const siteUrl = new URL(configuredSiteUrl || fallbackSiteUrl);
