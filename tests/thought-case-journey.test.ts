import assert from "node:assert/strict";
import test from "node:test";

import {
  CASE_JOURNEY_STAGES,
  getCaseJourneyStages,
  getCaseStageHref,
  getCaseStageNavigation,
} from "@/lib/thought-case-journey";

const slug = "nhom-gioi-nhung-khong-hop-tac";

test("case journey exposes exactly three route-backed stages", () => {
  assert.deepEqual(CASE_JOURNEY_STAGES, ["hien-tai", "dau-vet", "tro-lai"]);
  assert.deepEqual(getCaseJourneyStages(slug), [
    {
      id: "hien-tai",
      href: `/ho-so/${slug}`,
      label: "Hiện tại",
      ariaLabel: "Bước 1: Hiện tại",
    },
    {
      id: "dau-vet",
      href: `/ho-so/${slug}/dau-vet`,
      label: "Dấu vết",
      ariaLabel: "Bước 2: Dấu vết lịch sử",
    },
    {
      id: "tro-lai",
      href: `/ho-so/${slug}/tro-lai`,
      label: "Trở lại",
      ariaLabel: "Bước 3: Trở lại hiện tại",
    },
  ]);
});

test("case stage hrefs keep the present stage on the canonical base route", () => {
  assert.equal(getCaseStageHref(slug, "hien-tai"), `/ho-so/${slug}`);
  assert.equal(getCaseStageHref(slug, "dau-vet"), `/ho-so/${slug}/dau-vet`);
  assert.equal(getCaseStageHref(slug, "tro-lai"), `/ho-so/${slug}/tro-lai`);
});

test("case stages provide one clear previous and next route action", () => {
  assert.deepEqual(getCaseStageNavigation(slug, "hien-tai"), {
    previous: { href: "/ho-so", label: "Chọn hồ sơ khác" },
    next: { href: `/ho-so/${slug}/dau-vet`, label: "Mở ba dấu vết" },
  });
  assert.deepEqual(getCaseStageNavigation(slug, "dau-vet"), {
    previous: { href: `/ho-so/${slug}`, label: "Quay lại vấn đề" },
    next: {
      href: `/ho-so/${slug}/tro-lai`,
      label: "Kết nối và trở lại",
    },
  });
  assert.deepEqual(getCaseStageNavigation(slug, "tro-lai"), {
    previous: { href: `/ho-so/${slug}/dau-vet`, label: "Xem lại dấu vết" },
    next: { href: "/ho-so", label: "Chọn hồ sơ tiếp theo" },
  });
});
