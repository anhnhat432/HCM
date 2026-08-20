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
      label: "Đọc vấn đề",
      ariaLabel: "Bước 1: Đọc vấn đề hiện tại",
    },
    {
      id: "dau-vet",
      href: `/ho-so/${slug}/dau-vet`,
      label: "Xem 3 mốc",
      ariaLabel: "Bước 2: Xem ba mốc lịch sử",
    },
    {
      id: "tro-lai",
      href: `/ho-so/${slug}/tro-lai`,
      label: "Nhận gợi ý",
      ariaLabel: "Bước 3: Nhận gợi ý áp dụng",
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
    previous: { href: "/ho-so", label: "Chọn tình huống khác" },
    next: { href: `/ho-so/${slug}/dau-vet`, label: "Xem 3 mốc lịch sử" },
  });
  assert.deepEqual(getCaseStageNavigation(slug, "dau-vet"), {
    previous: { href: `/ho-so/${slug}`, label: "Đọc lại vấn đề" },
    next: {
      href: `/ho-so/${slug}/tro-lai`,
      label: "Nhận gợi ý áp dụng",
    },
  });
  assert.deepEqual(getCaseStageNavigation(slug, "tro-lai"), {
    previous: { href: `/ho-so/${slug}/dau-vet`, label: "Xem lại 3 mốc" },
    next: { href: "/ho-so", label: "Chọn tình huống khác" },
  });
});

test("case stages preserve perspective query parameter when provided", () => {
  assert.equal(
    getCaseStageHref(slug, "dau-vet", 0),
    `/ho-so/${slug}/dau-vet?p=0`,
  );
  assert.equal(
    getCaseStageHref(slug, "tro-lai", "1"),
    `/ho-so/${slug}/tro-lai?p=1`,
  );
  assert.equal(
    getCaseStageHref(slug, "hien-tai", "0"),
    `/ho-so/${slug}?p=0`,
  );

  const navigationWithPerspective = getCaseStageNavigation(slug, "dau-vet", 0);
  assert.equal(
    navigationWithPerspective.previous.href,
    `/ho-so/${slug}?p=0`,
  );
  assert.equal(
    navigationWithPerspective.next.href,
    `/ho-so/${slug}/tro-lai?p=0`,
  );

  const stagesWithPerspective = getCaseJourneyStages(slug, 1);
  assert.equal(stagesWithPerspective[0].href, `/ho-so/${slug}?p=1`);
  assert.equal(stagesWithPerspective[1].href, `/ho-so/${slug}/dau-vet?p=1`);
  assert.equal(stagesWithPerspective[2].href, `/ho-so/${slug}/tro-lai?p=1`);
});
