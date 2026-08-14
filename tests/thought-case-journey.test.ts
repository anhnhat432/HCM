import assert from "node:assert/strict";
import test from "node:test";

import { getCaseProgressMilestones } from "@/lib/thought-case-journey";

test("case progress names all six acts in narrative order", () => {
  assert.deepEqual(getCaseProgressMilestones(), [
    {
      id: "case-present",
      href: "#case-present",
      label: "Vấn đề",
      ariaLabel: "Hồi 1: Vấn đề hiện tại",
    },
    {
      id: "case-assumption",
      href: "#case-assumption",
      label: "Giả định",
      ariaLabel: "Hồi 2: Giả định ban đầu",
    },
    {
      id: "case-file",
      href: "#case-file",
      label: "Mở hồ sơ",
      ariaLabel: "Hồi 3: Mở hồ sơ lịch sử",
    },
    {
      id: "case-evidence",
      href: "#case-evidence",
      label: "Dấu vết",
      ariaLabel: "Hồi 4: Ba dấu vết lịch sử",
    },
    {
      id: "case-connection",
      href: "#case-connection",
      label: "Kết nối",
      ariaLabel: "Hồi 5: Kết nối tư tưởng",
    },
    {
      id: "case-return",
      href: "#case-return",
      label: "Trở lại",
      ariaLabel: "Hồi 6: Trở lại hiện tại",
    },
  ]);
});
