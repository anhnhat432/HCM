import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { JourneyClosing } from "@/components/trace/journey-closing";
import { journeyClosing } from "@/data/journey-closing";
import { traces } from "@/data/traces";
import type { CompleteTraceData, TraceData } from "@/types/trace";

const journeyModuleUrl = new URL("../lib/trace-journey.ts", import.meta.url);
const recapComponentUrl = new URL(
  "../components/trace/trace-recap.tsx",
  import.meta.url,
);
const switcherComponentUrl = new URL(
  "../components/trace/trace-switcher.tsx",
  import.meta.url,
);
const sourceDrawerComponentUrl = new URL(
  "../components/trace/source-drawer.tsx",
  import.meta.url,
);
const sourceDetailsModuleUrl = new URL(
  "../lib/trace-sources.ts",
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

test("Journey Closing renders one data-driven takeaway for every Trace", () => {
  const markup = renderToStaticMarkup(
    createElement(JourneyClosing, { closing: journeyClosing }),
  );

  assert.equal(journeyClosing.topics.length, traces.length);

  for (const topic of journeyClosing.topics) {
    const takeaway = (topic as { readonly takeaway?: string }).takeaway;

    if (!takeaway?.trim()) {
      assert.fail(`${topic.title} must define a takeaway`);
    }
    assert.ok(takeaway.length <= 120, `${topic.title} takeaway must stay concise`);
    assert.ok(markup.includes(takeaway));
  }
});

test("Trace switcher renders registry-driven routes and a non-color current marker", async () => {
  assert.ok(
    existsSync(switcherComponentUrl),
    "Trace switcher component must exist in the current header",
  );
  const { TraceSwitcher } = await import(switcherComponentUrl.href);
  const items = traces.map(({ order, slug, title }) => ({ order, slug, title }));

  for (const trace of traces) {
    const markup = renderToStaticMarkup(
      createElement(TraceSwitcher, { currentSlug: trace.slug, items }),
    );

    for (const item of items) {
      assert.ok(markup.includes(`href="/trace/${item.slug}"`));
      assert.ok(markup.includes(item.title.replaceAll("&", "&amp;")));
    }

    assert.match(
      markup,
      new RegExp(
        `href="/trace/${trace.slug}"[^>]*aria-current="page"|aria-current="page"[^>]*href="/trace/${trace.slug}"`,
      ),
    );
    assert.ok(markup.includes("✓"), "Current Trace needs a visible marker");
  }
});

test("Source drawer details preserve each moment's verification, sources, and image provenance", async () => {
  assert.ok(
    existsSync(sourceDetailsModuleUrl),
    "Source drawer data projection must exist",
  );
  const { getSourceDrawerDetails } = await import(sourceDetailsModuleUrl.href);

  for (const trace of traces) {
    for (const moment of trace.historicalMoments) {
      const details = getSourceDrawerDetails(moment);

      assert.equal(details.title, moment.title);
      assert.equal(details.year, moment.year);
      assert.equal(details.verification, moment.verification);
      assert.deepEqual(details.sources, moment.sources);

      if (moment.image) {
        assert.equal(details.image?.caption, moment.image.caption);
        assert.equal(details.image?.credit, moment.image.credit);
        assert.equal(details.image?.sourceUrl, moment.image.sourceUrl);
        assert.equal(details.image?.license, moment.image.license);
        assert.equal(details.image?.usageStatus, moment.image.usageStatus);
      } else {
        assert.equal(details.image, undefined);
      }
    }
  }
});

test("Historical moments expose a compact source drawer trigger", async () => {
  assert.ok(
    existsSync(sourceDrawerComponentUrl),
    "Source drawer client component must exist",
  );
  const { SourceDrawer } = await import(sourceDrawerComponentUrl.href);

  for (const trace of traces) {
    for (const moment of trace.historicalMoments) {
      const markup = renderToStaticMarkup(
        createElement(SourceDrawer, {
          details: {
            title: moment.title,
            year: moment.year,
            verification: moment.verification,
            sources: moment.sources,
            image: moment.image,
          },
        }),
      );

      assert.ok(markup.includes("Nguồn &amp; kiểm chứng"));
      assert.ok(markup.includes(moment.title));
      assert.equal(markup.includes("historical-moment__sources"), false);
    }
  }
});
