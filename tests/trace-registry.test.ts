import assert from "node:assert/strict";
import test from "node:test";

import { traces } from "@/data/traces";
import { getNextTraceSlug, getTraceBySlug } from "@/lib/trace-registry";
import { traceThemes } from "@/lib/trace-themes";

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

test("dao duc va trach nhiem records sources and verification work", () => {
  const trace = getTraceBySlug("dao-duc-trach-nhiem");

  assert.ok(trace);
  assert.ok(
    trace.historicalMoments.every(
      (moment) => moment.sources?.length && moment.verification,
    ),
  );
  assert.ok(
    trace.historicalMoments.every(
      (moment) => moment.image?.isPlaceholder && !moment.image.src,
    ),
  );
  assert.deepEqual(
    trace.historicalMoments.map((moment) => moment.image?.credit),
    [
      "TODO: 1927 archival asset required",
      "TODO: 1947 archival asset required",
      "TODO: 1958 archival asset required",
    ],
  );
});

test("dai doan ket records verification work for every historical asset", () => {
  const trace = getTraceBySlug("dai-doan-ket");

  assert.deepEqual(
    trace?.historicalMoments.map((moment) => moment.image?.credit),
    [
      "TODO: 1930 archival asset needs verification",
      "TODO: 1941 archival asset needs verification",
      "TODO: 1945 archival asset required",
    ],
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
