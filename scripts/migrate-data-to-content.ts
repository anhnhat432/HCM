import fs from "node:fs";
import path from "node:path";
import { thoughtCases } from "../data/thought-cases";
import { traces } from "../data/traces";
import { journeyClosing } from "../data/journey-closing";
import { ThoughtCaseSchema } from "../schemas/case.schema";
import { TraceDataSchema, JourneyClosingDataSchema } from "../schemas/trace.schema";

const CONTENT_DIR = path.resolve(process.cwd(), "content");
const CASES_DIR = path.join(CONTENT_DIR, "cases");
const TRACES_DIR = path.join(CONTENT_DIR, "traces");

fs.mkdirSync(CASES_DIR, { recursive: true });
fs.mkdirSync(TRACES_DIR, { recursive: true });

console.log("Migrating Thought Cases...");
for (const item of thoughtCases) {
  // Validate with schema first
  const parsed = ThoughtCaseSchema.safeParse(item);
  if (!parsed.success) {
    console.error(`Validation failed for case: ${item.slug}`, parsed.error.format());
    process.exit(1);
  }

  const filePath = path.join(CASES_DIR, `${item.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(item, null, 2), "utf-8");
}
console.log(`Successfully migrated ${thoughtCases.length} case files to content/cases/`);

console.log("Migrating Traces...");
for (const item of traces) {
  const parsed = TraceDataSchema.safeParse(item);
  if (!parsed.success) {
    console.error(`Validation failed for trace: ${item.slug}`, parsed.error.format());
    process.exit(1);
  }

  const filePath = path.join(TRACES_DIR, `${item.slug}.json`);
  fs.writeFileSync(filePath, JSON.stringify(item, null, 2), "utf-8");
}
console.log(`Successfully migrated ${traces.length} trace files to content/traces/`);

console.log("Migrating Journey Closing...");
const parsedClosing = JourneyClosingDataSchema.safeParse(journeyClosing);
if (!parsedClosing.success) {
  console.error("Validation failed for journey-closing", parsedClosing.error.format());
  process.exit(1);
}
fs.writeFileSync(
  path.join(CONTENT_DIR, "journey-closing.json"),
  JSON.stringify(journeyClosing, null, 2),
  "utf-8"
);
console.log("Successfully migrated journey-closing.json to content/");
