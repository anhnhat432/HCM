import fs from "node:fs";
import path from "node:path";
import { ThoughtCaseSchema } from "../schemas/case.schema";
import {
  TraceDataSchema,
  JourneyClosingDataSchema,
} from "../schemas/trace.schema";
import type { ThoughtCase } from "../types/thought-case";
import type { TraceData } from "../types/trace";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const CASES_DIR = path.join(CONTENT_DIR, "cases");
const TRACES_DIR = path.join(CONTENT_DIR, "traces");
const CLOSING_FILE = path.join(CONTENT_DIR, "journey-closing.json");

console.log("🔍 Validating content files against Zod schemas...");

let errorCount = 0;

// 1. Validate Journey Closing
if (!fs.existsSync(CLOSING_FILE)) {
  console.error("❌ Missing content/journey-closing.json");
  errorCount++;
} else {
  try {
    const raw = JSON.parse(fs.readFileSync(CLOSING_FILE, "utf-8"));
    JourneyClosingDataSchema.parse(raw);
    console.log("  ✅ content/journey-closing.json valid");
  } catch (err: unknown) {
    console.error("  ❌ content/journey-closing.json validation failed:", err);
    errorCount++;
  }
}

// 2. Validate Traces
const traceFiles = fs.readdirSync(TRACES_DIR).filter((f) => f.endsWith(".json"));
const loadedTraces = new Map<string, TraceData>();

for (const file of traceFiles) {
  const filePath = path.join(TRACES_DIR, file);
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const parsed = TraceDataSchema.parse(raw) as unknown as TraceData;
    loadedTraces.set(parsed.slug, parsed);
    console.log(`  ✅ Trace [${parsed.slug}] valid (${parsed.historicalMoments.length} moments)`);
  } catch (err: unknown) {
    console.error(`  ❌ Trace file ${file} validation failed:`, err);
    errorCount++;
  }
}

if (loadedTraces.size !== 3) {
  console.error(`❌ Expected exactly 3 traces, found ${loadedTraces.size}`);
  errorCount++;
}

// 3. Validate Cases
const caseFiles = fs.readdirSync(CASES_DIR).filter((f) => f.endsWith(".json"));
const loadedCases = new Map<string, ThoughtCase>();

for (const file of caseFiles) {
  const filePath = path.join(CASES_DIR, file);
  try {
    const raw = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const parsed = ThoughtCaseSchema.parse(raw) as unknown as ThoughtCase;

    if (loadedCases.has(parsed.slug)) {
      console.error(`  ❌ Duplicate case slug: ${parsed.slug}`);
      errorCount++;
    }

    // Check slug matches filename
    const expectedFilename = `${parsed.slug}.json`;
    if (file !== expectedFilename) {
      console.error(`  ❌ Case filename ${file} does not match slug ${parsed.slug}`);
      errorCount++;
    }

    loadedCases.set(parsed.slug, parsed);
  } catch (err: unknown) {
    console.error(`  ❌ Case file ${file} validation failed:`, err);
    errorCount++;
  }
}

console.log(`  ✅ Loaded and validated ${loadedCases.size} case files`);

if (loadedCases.size !== 30) {
  console.error(`❌ Expected exactly 30 living cases, found ${loadedCases.size}`);
  errorCount++;
}

// 4. Cross-Reference & Referential Integrity Validation
console.log("🔗 Validating cross-references and relational links...");

for (const [slug, item] of loadedCases) {
  // Check related cases exist and are not self-referential
  for (const relatedSlug of item.relatedCaseSlugs) {
    if (!loadedCases.has(relatedSlug)) {
      console.error(`  ❌ Case ${slug} references unknown related case: ${relatedSlug}`);
      errorCount++;
    }
    if (relatedSlug === slug) {
      console.error(`  ❌ Case ${slug} references itself in relatedCaseSlugs`);
      errorCount++;
    }
  }

  // Check reveals point to valid traces and moment IDs
  for (let i = 0; i < item.reveals.length; i++) {
    const reveal = item.reveals[i];
    const trace = loadedTraces.get(reveal.evidence.traceSlug);
    if (!trace) {
      console.error(`  ❌ Case ${slug} reveal[${i}] references unknown trace: ${reveal.evidence.traceSlug}`);
      errorCount++;
      continue;
    }

    const moment = trace.historicalMoments.find((m) => m.id === reveal.evidence.momentId);
    if (!moment) {
      console.error(
        `  ❌ Case ${slug} reveal[${i}] references unknown moment: ${reveal.evidence.traceSlug}:${reveal.evidence.momentId}`
      );
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`\n❌ Content validation failed with ${errorCount} errors.`);
  process.exit(1);
} else {
  console.log("\n🎉 All content files, schemas, and relational links verified successfully!");
}
