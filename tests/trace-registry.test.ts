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
