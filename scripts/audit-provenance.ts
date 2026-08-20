import fs from "node:fs";
import path from "node:path";
import type { TraceData } from "../types/trace";

const TRACES_DIR = path.resolve(process.cwd(), "content", "traces");
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

console.log("🛡️ Auditing Provenance, Image Assets, and Historical Citations...\n");

let errorCount = 0;
let warningCount = 0;

interface AssetReport {
  trace: string;
  kind: string;
  idOrMoment: string;
  src: string;
  verificationStatus: string;
  usageStatus: string;
  hasLicense: boolean;
  hasSourceUrl: boolean;
  fileExists: boolean;
}

const reports: AssetReport[] = [];

const traceFiles = fs.readdirSync(TRACES_DIR).filter((f) => f.endsWith(".json"));

for (const file of traceFiles) {
  const filePath = path.join(TRACES_DIR, file);
  const trace: TraceData = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  // Check present-day image
  if (trace.presentDay?.image) {
    const img = trace.presentDay.image;
    const fileOnDisk = path.join(PUBLIC_DIR, img.src.replace(/^\//, ""));
    const exists = fs.existsSync(fileOnDisk);

    if (!exists) {
      console.error(`❌ Present day image missing on disk: ${img.src}`);
      errorCount++;
    }

    if (img.verificationStatus !== "verified") {
      console.warn(`⚠️ Present day image not marked as verified: ${img.src}`);
      warningCount++;
    }

    reports.push({
      trace: trace.title,
      kind: "Present-Day AI",
      idOrMoment: "Opening",
      src: img.src,
      verificationStatus: img.verificationStatus,
      usageStatus: img.usageStatus,
      hasLicense: Boolean(img.license),
      hasSourceUrl: Boolean(img.sourceUrl),
      fileExists: exists,
    });
  }

  // Check historical moments
  for (const moment of trace.historicalMoments) {
    // Check sources
    if (!moment.sources || moment.sources.length === 0) {
      console.error(`❌ Moment [${moment.id}] in [${trace.title}] has no sources`);
      errorCount++;
    } else {
      for (const s of moment.sources) {
        if (!s.url.startsWith("http://") && !s.url.startsWith("https://")) {
          console.error(`❌ Invalid source URL in [${moment.id}]: ${s.url}`);
          errorCount++;
        }
      }
    }

    // Check verification note
    if (!moment.verification || moment.verification.length < 10) {
      console.error(`❌ Moment [${moment.id}] lacks substantial verification note`);
      errorCount++;
    }

    // Check image
    if (moment.image) {
      const img = moment.image;
      if (img.src) {
        const fileOnDisk = path.join(PUBLIC_DIR, img.src.replace(/^\//, ""));
        const exists = fs.existsSync(fileOnDisk);

        if (!exists) {
          console.error(`❌ Historical image missing on disk: ${img.src}`);
          errorCount++;
        }

        if (img.verificationStatus !== "verified") {
          console.warn(`⚠️ Image not verified: ${img.src}`);
          warningCount++;
        }

        reports.push({
          trace: trace.title,
          kind: img.kind,
          idOrMoment: `${moment.year} (${moment.id})`,
          src: img.src,
          verificationStatus: img.verificationStatus,
          usageStatus: img.usageStatus,
          hasLicense: Boolean(img.license),
          hasSourceUrl: Boolean(img.sourceUrl),
          fileExists: exists,
        });
      }
    }
  }
}

// Print report table
console.log("| Trace | Moment | Kind | Verification | Usage | File On Disk |");
console.log("|---|---|---|---|---|---|");
for (const r of reports) {
  console.log(
    `| ${r.trace} | ${r.idOrMoment} | ${r.kind} | ${r.verificationStatus} | ${r.usageStatus} | ${r.fileExists ? "✅ Present" : "❌ Missing"} |`
  );
}

console.log(`\nAudit finished with ${errorCount} errors and ${warningCount} warnings.`);

if (errorCount > 0) {
  process.exit(1);
} else {
  console.log("🛡️ Provenance release gate PASSED!");
}
