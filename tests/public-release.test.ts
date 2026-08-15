import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { JourneyClosing } from "@/components/trace/journey-closing";
import { journeyClosing } from "@/data/journey-closing";
import { thoughtCases } from "@/data/thought-cases";

const siteModuleUrl = new URL("../lib/site.ts", import.meta.url);
const sitemapModuleUrl = new URL("../app/sitemap.ts", import.meta.url);
const robotsModuleUrl = new URL("../app/robots.ts", import.meta.url);
const methodologyPageUrl = new URL(
  "../app/phuong-phap/page.tsx",
  import.meta.url,
);
const siteIconUrl = new URL("../app/icon.svg", import.meta.url);
const rootLayoutUrl = new URL("../app/layout.tsx", import.meta.url);

test("public release metadata uses the verified stable production origin", async () => {
  assert.ok(existsSync(siteModuleUrl), "Public site origin helper must exist");
  const { siteUrl } = await import(siteModuleUrl.href);

  assert.equal(siteUrl.origin, "https://hcm-trace.vercel.app");
});

test("public release provides a site icon without a browser 404", () => {
  assert.ok(existsSync(siteIconUrl), "App Router site icon must exist");
});

test("font loading avoids preloading every family and unused homepage weights", () => {
  const layout = readFileSync(rootLayoutUrl, "utf8");

  assert.equal((layout.match(/preload: false/g) ?? []).length, 3);
  assert.doesNotMatch(layout, /"700"/);
});

test("Homepage suggestions do not pull Trace-only display fonts", () => {
  const stylesheet = readFileSync(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(
    stylesheet,
    /\.scenario-picker-section__heading h2\s*\{[\s\S]*?font-family:\s*var\(--font-homepage\)/,
  );
  assert.match(
    stylesheet,
    /\.scenario-picker__copy strong\s*\{[\s\S]*?font-family:\s*var\(--font-homepage\)/,
  );
  assert.match(stylesheet, /body:has\(\.home\) \.skip-link/);
});

test("sitemap and robots expose every public experience route", async () => {
  assert.ok(existsSync(sitemapModuleUrl), "Sitemap metadata route must exist");
  assert.ok(existsSync(robotsModuleUrl), "Robots metadata route must exist");
  const [{ default: sitemap }, { default: robots }] = await Promise.all([
    import(sitemapModuleUrl.href),
    import(robotsModuleUrl.href),
  ]);

  const urls = sitemap().map((entry: { url: string }) => entry.url);
  const existingRoutes = [
    "https://hcm-trace.vercel.app/",
    "https://hcm-trace.vercel.app/trace/dai-doan-ket",
    "https://hcm-trace.vercel.app/trace/dao-duc-trach-nhiem",
    "https://hcm-trace.vercel.app/trace/con-nguoi",
    "https://hcm-trace.vercel.app/phuong-phap",
  ];
  const caseRoutes = thoughtCases.flatMap((item) => [
    `https://hcm-trace.vercel.app/ho-so/${item.slug}`,
    `https://hcm-trace.vercel.app/ho-so/${item.slug}/dau-vet`,
    `https://hcm-trace.vercel.app/ho-so/${item.slug}/tro-lai`,
  ]);

  assert.deepEqual(urls.slice(0, existingRoutes.length), existingRoutes);
  assert.equal(
    urls.filter((url: string) => url.endsWith("/ho-so")).length,
    1,
  );
  assert.equal(caseRoutes.length, 90);
  assert.deepEqual(urls.slice(existingRoutes.length + 1), caseRoutes);
  assert.equal(urls.length, 96);

  const robotsData = robots();
  assert.equal(robotsData.sitemap, "https://hcm-trace.vercel.app/sitemap.xml");
  assert.deepEqual(robotsData.rules, { userAgent: "*", allow: "/" });
});

test("methodology page explains the public source and image approach", async () => {
  assert.ok(existsSync(methodologyPageUrl), "Methodology page must exist");
  const { default: MethodologyPage } = await import(methodologyPageUrl.href);
  const markup = renderToStaticMarkup(createElement(MethodologyPage));

  for (const heading of [
    "Về dự án",
    "Cách một Trace được xây dựng",
    "Nguồn và kiểm chứng",
    "Hình ảnh và quyền sử dụng",
    "Giới hạn của trải nghiệm",
  ]) {
    assert.ok(markup.includes(heading));
  }

  assert.ok(markup.includes('href="/trace/dai-doan-ket"'));
  assert.ok(markup.includes('href="/"'));
});

test("Homepage and Journey Closing expose the methodology route", () => {
  const methodAction = (
    journeyClosing as typeof journeyClosing & {
      readonly methodAction?: { readonly label: string; readonly href: string };
    }
  ).methodAction;

  assert.deepEqual(methodAction, {
    label: "Về dự án & phương pháp",
    href: "/phuong-phap",
  });

  const closingMarkup = renderToStaticMarkup(
    createElement(JourneyClosing, { closing: journeyClosing }),
  );
  assert.ok(closingMarkup.includes('href="/phuong-phap"'));
});
