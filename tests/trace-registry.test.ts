import assert from "node:assert/strict";
import test from "node:test";

import { traces } from "@/data/traces";
import { getNextTraceSlug, getTraceBySlug } from "@/lib/trace-registry";
import { traceThemes } from "@/lib/trace-themes";
import type { TraceImage } from "@/types/trace";

const APPROVED_IMAGE_KINDS = new Set([
  "present",
  "historical-photo",
  "historical-place",
  "document",
  "artwork",
  "placeholder",
]);

test("registry exposes exactly three uniquely ordered traces", () => {
  assert.equal(traces.length, 3);
  assert.deepEqual(
    traces.map((trace) => trace.order),
    [1, 2, 3],
  );
  assert.equal(new Set(traces.map((trace) => trace.slug)).size, 3);
});

test("every MVP trace reserves exactly three concise historical moments", () => {
  for (const trace of traces) {
    assert.equal(trace.historicalMoments.length, 3);

    for (const moment of trace.historicalMoments) {
      assert.equal("detail" in moment, false);
    }
  }
});

test("lookup returns a trace only for a known slug", () => {
  assert.equal(getTraceBySlug("dai-doan-ket")?.title, "Đại đoàn kết");
  assert.equal(getTraceBySlug("khong-ton-tai"), undefined);
});

test("next trace follows the approved journey order", () => {
  assert.equal(getNextTraceSlug("dai-doan-ket"), "dao-duc-trach-nhiem");
  assert.equal(getNextTraceSlug("dao-duc-trach-nhiem"), "con-nguoi");
  assert.equal(getNextTraceSlug("con-nguoi"), null);
});

test("dai doan ket exposes the complete approved narrative", () => {
  const trace = getTraceBySlug("dai-doan-ket");

  assert.ok(trace?.presentDay);
  assert.equal(
    trace.centralQuestion,
    "Điều gì có thể giữ một tập thể cùng hướng?",
  );
  assert.deepEqual(
    trace.historicalMoments.map((moment) => moment.year),
    ["1930", "1941", "1945"],
  );
  assert.equal(trace.thoughtFormation?.factors.length, 3);
  assert.equal(trace.application?.items.length, 3);
});

test("dai doan ket continues to the existing second trace route", () => {
  assert.equal(getNextTraceSlug("dai-doan-ket"), "dao-duc-trach-nhiem");
});

test("dao duc va trach nhiem exposes the complete approved narrative", () => {
  const trace = getTraceBySlug("dao-duc-trach-nhiem");

  assert.ok(trace?.presentDay);
  assert.equal(
    trace.centralQuestion,
    "Điều gì định hướng một lựa chọn đúng khi không ai buộc ta phải làm đúng?",
  );
  assert.deepEqual(
    trace.historicalMoments.map((moment) => moment.year),
    ["1927", "1947", "1958"],
  );
  assert.equal(JSON.stringify(trace).includes("1969"), false);
  assert.equal(trace.thoughtFormation?.factors.length, 3);
  assert.equal(trace.application?.items.length, 3);
  assert.equal(getNextTraceSlug(trace.slug), "con-nguoi");
});

test("con nguoi exposes the complete approved narrative", () => {
  const trace = getTraceBySlug("con-nguoi");

  assert.ok(trace?.presentDay);
  assert.equal(
    trace.centralQuestion,
    "Giá trị của một con người được quyết định bởi điều gì?",
  );
  assert.deepEqual(
    trace.historicalMoments.map((moment) => moment.year),
    ["1945", "1958", "1969"],
  );
  assert.equal(trace.thoughtFormation?.factors.length, 3);
  assert.equal(trace.application?.items.length, 3);
  assert.equal(getNextTraceSlug(trace.slug), null);
});

test("every historical moment records content verification and sources", () => {
  for (const trace of traces) {
    for (const moment of trace.historicalMoments) {
      assert.ok(moment.verification);
      assert.ok(moment.sources.length >= 1);
      assert.ok(
        moment.sources.every(
          (source) => source.title.length > 0 && source.url.startsWith("https://"),
        ),
      );
    }
  }
});

test("historical assets expose explicit provenance, owner approval, and placeholder states", () => {
  const expectedAssets = new Map([
    ["dai-doan-ket:1930", "/images/traces/dai-doan-ket/1930-party-foundation.jpg"],
    ["dai-doan-ket:1941", "/images/traces/dai-doan-ket/1941-viet-minh-pac-bo.jpg"],
    ["dai-doan-ket:1945", "/images/traces/dai-doan-ket/1945-independence-declaration.jpg"],
    ["dao-duc-trach-nhiem:1927", "/images/traces/dao-duc-trach-nhiem/1927-duong-kach-menh-crop.jpg"],
    ["dao-duc-trach-nhiem:1947", "/images/traces/dao-duc-trach-nhiem/1947-sua-doi-loi-lam-viec.jpg"],
    ["dao-duc-trach-nhiem:1958", "/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg"],
    ["con-nguoi:1945", "/images/traces/dai-doan-ket/1945-independence-declaration.jpg"],
    ["con-nguoi:1958", "/images/traces/con-nguoi/1958-political-class-teachers.jpg"],
    ["con-nguoi:1969", "/images/traces/con-nguoi/1969-testament.jpg"],
  ]);
  const expectedPlaceholders = new Set<string>();

  for (const trace of traces) {
    for (const moment of trace.historicalMoments) {
      const key = `${trace.slug}:${moment.year}`;
      const image = moment.image as TraceImage | undefined;

      assert.ok(image, `${key} must reserve its historical image frame`);
      assert.ok(image.alt.length > 12, `${key} must have informative alt text`);
      assert.ok(image.credit.length > 0, `${key} must have image credit metadata`);

      if (expectedPlaceholders.has(key)) {
        assert.equal(image.isPlaceholder, true);
        assert.equal(image.src, undefined);
        assert.equal(image.sourceUrl, undefined);
        assert.equal(image.verificationStatus, "placeholder");
        assert.equal(image.usageStatus, "not-applicable");
      } else {
        assert.equal(image.isPlaceholder, undefined);
        assert.equal(image.src, expectedAssets.get(key));
        assert.ok(image.sourceUrl?.startsWith("https://"));
        assert.equal(image.verificationStatus, "verified");
        assert.equal(image.usageStatus, "approved");
        assert.ok(image.license || image.usageNote);
        if (image.license !== "Public domain") {
          assert.match(image.usageNote ?? "", /Chủ dự án/);
        }
      }
    }
  }
});

test("phase 8 assets expose evidence-first provenance and presentation", () => {
  const responsibility = getTraceBySlug("dao-duc-trach-nhiem");
  const humanity = getTraceBySlug("con-nguoi");
  const phase8Assets = [
    responsibility?.historicalMoments[1].image,
    responsibility?.historicalMoments[2].image,
    humanity?.historicalMoments[1].image,
    humanity?.historicalMoments[2].image,
  ];

  for (const image of phase8Assets) {
    assert.equal(image?.isPlaceholder, undefined);
    assert.equal(image?.verificationStatus, "verified");
    assert.equal(image?.usageStatus, "approved");
    assert.ok(image?.sourceUrl?.startsWith("https://"));
    assert.ok(image?.license || image?.usageNote);
  }

  for (const image of [phase8Assets[0], phase8Assets[1], phase8Assets[3]]) {
    assert.equal(image?.kind, "document");
    assert.equal(image?.presentation?.fit, "contain");
    assert.equal(image?.presentation?.aspectRatio, "document");
    assert.equal(image?.presentation?.background, "paper");
  }

  assert.equal(phase8Assets[2]?.kind, "historical-photo");
  assert.equal(phase8Assets[2]?.presentation?.fit, "cover");
  assert.equal(phase8Assets[2]?.presentation?.aspectRatio, "landscape");
});

test("present-day images expose owner-approved illustration metadata", () => {
  for (const trace of traces) {
    assert.ok(trace.presentDay);
    const image: TraceImage = trace.presentDay.image;

    assert.equal(image.verificationStatus, "verified");
    assert.equal(image.usageStatus, "approved");
    assert.equal(
      image.license,
      "Không nêu giấy phép của công cụ tạo",
    );
    assert.equal(image.credit, "Ảnh minh họa");
    assert.equal(image.sourceUrl, undefined);
    assert.match(image.usageNote ?? "", /Chủ dự án.*AI/);
    assert.doesNotMatch(image.alt, /\bAI\b/i);
    assert.equal(image.kind, "present");
    assert.equal(image.presentation?.fit, "cover");
    assert.equal(image.presentation?.aspectRatio, "portrait");
  }
});

test("approved illustrations replace all Present Day assets and keep guarded historical assets unchanged", () => {
  assert.equal(
    getTraceBySlug("dai-doan-ket")?.presentDay?.image.src,
    "/images/traces/dai-doan-ket/present-day-ai-group.jpg",
  );
  assert.equal(
    getTraceBySlug("dao-duc-trach-nhiem")?.presentDay?.image.src,
    "/images/traces/dao-duc-trach-nhiem/present-day-ai-decision.jpg",
  );
  assert.equal(
    getTraceBySlug("con-nguoi")?.presentDay?.image.src,
    "/images/traces/con-nguoi/present-day-ai-student.jpg",
  );
  assert.equal(
    getTraceBySlug("dao-duc-trach-nhiem")?.historicalMoments[2].image?.src,
    "/images/traces/dao-duc-trach-nhiem/1958-dao-duc-cach-mang.jpg",
  );
  assert.equal(
    getTraceBySlug("dai-doan-ket")?.historicalMoments[2].image?.src,
    "/images/traces/dai-doan-ket/1945-independence-declaration.jpg",
  );
  assert.equal(
    getTraceBySlug("con-nguoi")?.historicalMoments[0].image?.src,
    "/images/traces/dai-doan-ket/1945-independence-declaration.jpg",
  );
});

test("every trace image declares the approved presentation taxonomy", () => {
  for (const trace of traces) {
    const images: TraceImage[] = [];

    if (trace.presentDay) {
      images.push(trace.presentDay.image);
    }

    for (const moment of trace.historicalMoments) {
      if (moment.image) {
        images.push(moment.image);
      }
    }

    for (const image of images) {
      assert.equal(
        APPROVED_IMAGE_KINDS.has(image.kind),
        true,
        `${image.alt} must declare an approved image kind`,
      );
      assert.equal(
        "objectPosition" in image,
        false,
        `${image.alt} must keep crop metadata inside presentation`,
      );
    }
  }
});

test("documents expose explicit presentation rules", () => {
  const responsibility = getTraceBySlug("dao-duc-trach-nhiem");
  const humanity = getTraceBySlug("con-nguoi");
  const documentImages = [
    responsibility?.historicalMoments[0].image,
    responsibility?.historicalMoments[1].image,
    responsibility?.historicalMoments[2].image,
    humanity?.historicalMoments[2].image,
  ];

  for (const image of documentImages) {
    assert.equal(image?.kind, "document");
    assert.equal(image?.presentation?.fit, "contain");
    assert.equal(image?.presentation?.aspectRatio, "document");
    assert.equal(image?.presentation?.background, "paper");
  }
});

test("historical photographs and places use landscape presentation", () => {
  const unity = getTraceBySlug("dai-doan-ket");
  const humanity = getTraceBySlug("con-nguoi");
  const images = [
    unity?.historicalMoments[1].image,
    unity?.historicalMoments[2].image,
    humanity?.historicalMoments[0].image,
    humanity?.historicalMoments[1].image,
  ];

  for (const image of images) {
    assert.equal(image?.presentation?.aspectRatio, "landscape");
  }
});

test("con nguoi records sources for its synthesized formation conclusion", () => {
  const trace = getTraceBySlug("con-nguoi");

  assert.ok(trace?.thoughtFormation?.verification);
  assert.ok((trace?.thoughtFormation?.sources?.length ?? 0) >= 3);
});

test("production copy uses approved names and historical context", () => {
  const serialized = JSON.stringify(traces);
  const unity = getTraceBySlug("dai-doan-ket");

  assert.equal(serialized.includes("HCM // TRACE"), false);
  assert.equal(serialized.includes("Pắc Bó"), false);
  assert.match(serialized, /Pác Bó/);
  assert.match(unity?.historicalMoments[1].summary ?? "", /Nguyễn Ái Quốc/);
  assert.equal(
    unity?.historicalMoments[0].summary.includes("Bài học đầu tiên"),
    false,
  );
});

test("theme mapping exposes one semantic class for every trace theme", () => {
  assert.deepEqual(Object.keys(traceThemes), [
    "unity",
    "responsibility",
    "humanity",
  ]);

  for (const className of Object.values(traceThemes)) {
    assert.match(className, /^trace-theme--/);
  }
});
