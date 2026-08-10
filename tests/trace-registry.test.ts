import assert from "node:assert/strict";
import test from "node:test";

import { traces } from "@/data/traces";
import { getNextTraceSlug, getTraceBySlug } from "@/lib/trace-registry";
import { traceThemes } from "@/lib/trace-themes";
import type { TraceImage } from "@/types/trace";

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

test("historical assets expose explicit provenance and placeholder states", () => {
  const expectedAssets = new Map([
    ["dai-doan-ket:1930", "/images/traces/dai-doan-ket/1930-party-foundation.jpg"],
    ["dai-doan-ket:1941", "/images/traces/dai-doan-ket/1941-viet-minh-pac-bo.jpg"],
    ["dai-doan-ket:1945", "/images/traces/dai-doan-ket/1945-independence-declaration.jpg"],
    ["dao-duc-trach-nhiem:1927", "/images/traces/dao-duc-trach-nhiem/1927-duong-kach-menh.jpg"],
    ["con-nguoi:1945", "/images/traces/dai-doan-ket/1945-independence-declaration.jpg"],
  ]);
  const expectedPlaceholders = new Set([
    "dao-duc-trach-nhiem:1947",
    "dao-duc-trach-nhiem:1958",
    "con-nguoi:1958",
    "con-nguoi:1969",
  ]);

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
        assert.equal(image.usageStatus, "needs-review");
      }
    }
  }
});

test("present-day images keep traceable Unsplash licensing metadata", () => {
  for (const trace of traces) {
    assert.ok(trace.presentDay);
    assert.equal(trace.presentDay.image.verificationStatus, "verified");
    assert.equal(trace.presentDay.image.usageStatus, "licensed");
    assert.equal(trace.presentDay.image.license, "Unsplash License");
    assert.match(trace.presentDay.image.sourceUrl ?? "", /^https:\/\/images\.unsplash\.com\/photo-/);
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
