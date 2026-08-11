import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { traces } from "@/data/traces";
import type { CompleteTraceData, TraceData } from "@/types/trace";

const journeyModuleUrl = new URL("../lib/trace-journey.ts", import.meta.url);
const recapComponentUrl = new URL(
  "../components/trace/trace-recap.tsx",
  import.meta.url,
);

function requireCompleteTrace(trace: TraceData): asserts trace is CompleteTraceData {
  assert.ok(trace.presentDay);
  assert.ok(trace.centralQuestion);
  assert.ok(trace.thoughtFormation);
  assert.ok(trace.application);
}

async function loadJourneyModule() {
  assert.ok(
    existsSync(journeyModuleUrl),
    "Trace journey helpers must exist before milestones can be generated",
  );

  return import(journeyModuleUrl.href);
}

test("progress timeline derives exactly five milestones from every Trace", async () => {
  const { getTraceProgressMilestones } = await loadJourneyModule();

  for (const trace of traces) {
    const milestones = getTraceProgressMilestones(trace.historicalMoments);

    assert.equal(milestones.length, 5);
    assert.deepEqual(
      milestones.map((milestone: { label: string }) => milestone.label),
      [
        "2026",
        ...trace.historicalMoments.map((moment) => moment.year),
        "2026",
      ],
    );
    assert.deepEqual(
      milestones.map((milestone: { href: string }) => milestone.href),
      [
        "#trace-opening",
        ...trace.historicalMoments.map((moment) => `#moment-${moment.year}`),
        "#application",
      ],
    );
  }
});

test("recap content is derived from each Trace without repeating explanations", async () => {
  const { getTraceRecapContent } = await loadJourneyModule();

  for (const trace of traces) {
    requireCompleteTrace(trace);
    const recap = getTraceRecapContent(trace);

    assert.equal(recap.question, trace.centralQuestion);
    assert.equal(recap.beforeSummary, trace.presentDay.summary);
    assert.deepEqual(
      recap.afterItems,
      trace.application.items.map(({ number, title }) => ({ number, title })),
    );
  }
});

test("Trace recap renders current Trace data for all three experiences", async () => {
  assert.ok(
    existsSync(recapComponentUrl),
    "Trace recap component must exist for every complete Trace",
  );
  const { TraceRecap } = await import(recapComponentUrl.href);

  for (const trace of traces) {
    requireCompleteTrace(trace);
    const markup = renderToStaticMarkup(createElement(TraceRecap, { trace }));

    assert.ok(markup.includes(trace.centralQuestion));
    assert.ok(markup.includes(trace.presentDay.summary));

    for (const item of trace.application.items) {
      assert.ok(markup.includes(item.title));
      assert.equal(markup.includes(item.summary), false);
    }
  }
});
