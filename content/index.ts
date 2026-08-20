import { thoughtCases } from "./cases";
import { traces } from "./traces";
import rawJourneyClosing from "./journey-closing.json";
import { JourneyClosingDataSchema } from "@/schemas/trace.schema";
import type { JourneyClosingData } from "@/types/trace";

export const journeyClosing: JourneyClosingData = JourneyClosingDataSchema.parse(
  rawJourneyClosing
) as unknown as JourneyClosingData;

export { thoughtCases, traces };
