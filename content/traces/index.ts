import type { TraceData } from "@/types/trace";
import { TraceDataSchema } from "@/schemas/trace.schema";

import daiDoanKet from "./dai-doan-ket.json";
import daoDucTrachNhiem from "./dao-duc-trach-nhiem.json";
import conNguoi from "./con-nguoi.json";

const rawTraces = [daiDoanKet, daoDucTrachNhiem, conNguoi];

export const traces: readonly TraceData[] = rawTraces.map((rawTrace) => {
  return TraceDataSchema.parse(rawTrace) as unknown as TraceData;
});
