import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { JourneyClosing } from "@/components/trace/journey-closing";
import { TracePage } from "@/components/trace/trace-page";
import { journeyClosing } from "@/data/journey-closing";
import { traces } from "@/data/traces";
import type { CompleteTraceData } from "@/types/trace";

test("every complete Trace renders a passive story with existing images", () => {
  traces.forEach((trace, index) => {
    const markup = renderToStaticMarkup(
      createElement(TracePage, {
        trace: trace as CompleteTraceData,
        nextTrace: traces[(index + 1) % traces.length],
      }),
    );

    assert.ok(markup.includes("trace-back-story"));
    assert.ok(markup.includes(encodeURIComponent(trace.presentDay?.image.src ?? "")));
    assert.ok(
      markup.includes(
        encodeURIComponent(trace.historicalMoments[0].image?.src ?? ""),
      ),
    );
    assert.ok(markup.includes('data-scroll-story="passive"'));

    const storyMarkup = markup.match(
      /<div[^>]*class="trace-back-story[^"]*"[\s\S]*?<\/div>/,
    )?.[0];
    assert.ok(storyMarkup);
    assert.equal(storyMarkup.includes('type="range"'), false);
    assert.equal(storyMarkup.includes("onpointer"), false);
  });
});

test("historical moments and Thought Formation expose one continuous line language", async () => {
  const { HistoricalMoment } = await import(
    "@/components/trace/historical-moment"
  );
  const { ThoughtFormation } = await import(
    "@/components/trace/thought-formation"
  );
  const trace = traces[0] as CompleteTraceData;
  const momentMarkup = renderToStaticMarkup(
    createElement(HistoricalMoment, {
      moment: trace.historicalMoments[0],
      imageRight: false,
      nextHref: "#moment-1941",
      nextLabel: "Tiếp theo",
    }),
  );
  const formationMarkup = renderToStaticMarkup(
    createElement(ThoughtFormation, { formation: trace.thoughtFormation }),
  );

  assert.ok(momentMarkup.includes("historical-moment__continuity"));
  assert.ok(formationMarkup.includes("formation-convergence"));
  assert.equal(
    (formationMarkup.match(/formation-convergence__branch/g) ?? []).length,
    3,
  );
  assert.ok(formationMarkup.includes('aria-hidden="true"'));
});

test("Journey Closing resolves three Trace lines into one decorative mark", () => {
  const markup = renderToStaticMarkup(
    createElement(JourneyClosing, { closing: journeyClosing }),
  );

  assert.ok(markup.includes("journey-trace-mark"));
  assert.equal((markup.match(/journey-trace-mark__input/g) ?? []).length, 3);
  assert.ok(markup.includes("journey-trace-mark__torch"));
  assert.match(markup, /journey-trace-mark[^>]*aria-hidden="true"/);
});
