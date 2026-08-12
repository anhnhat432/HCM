import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { TracePage } from "@/components/trace/trace-page";
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
