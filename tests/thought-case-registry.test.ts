import assert from "node:assert/strict";
import test from "node:test";

import { thoughtCases } from "@/data/thought-cases";
import {
  getCaseEvidence,
  getCaseFileNumber,
  getRelatedCases,
  getThoughtCaseBySlug,
} from "@/lib/thought-case-registry";
import { CASE_CATEGORIES } from "@/types/thought-case";

const expectedSlugs = [
  "nhom-gioi-nhung-khong-hop-tac",
  "mot-nguoi-ganh-het-cong-viec",
  "bat-dong-khi-chay-deadline",
  "thanh-vien-yeu-bi-bo-lai",
  "chia-cong-khong-cong-bang",
  "nguoi-lanh-dao-khong-nhan-loi",
  "quyet-dinh-de-lam-nhung-sai",
  "thanh-tich-cua-nhom-cong-cua-ai",
  "noi-that-khi-khong-ai-biet",
  "ky-luat-va-long-tin",
  "loi-ich-ca-nhan-va-tap-the",
  "uu-tien-nguoi-quen",
  "chia-se-tai-nguyen-khan-hiem",
  "thoa-hiep-den-dau",
  "im-lang-truoc-sai-pham",
  "dam-dong-dang-cong-kich-mot-nguoi",
  "tin-chua-kiem-chung",
  "bat-dong-tren-mang",
  "thanh-tich-va-hinh-anh-ca-nhan",
  "noi-dung-gay-chia-re",
  "diem-so-co-dinh-nghia-con-nguoi",
  "nguoi-cham-tien-bo",
  "co-hoi-thu-hai",
  "ap-luc-nang-suat",
  "giao-duc-vi-thanh-tich",
  "khac-biet-the-he",
  "nguoi-moi-trong-cong-dong",
  "muc-tieu-chung-khi-loi-ich-khac-nhau",
  "phat-trien-nhung-bo-quen-con-nguoi",
  "trach-nhiem-truoc-van-de-chung",
] as const;

test("launch registry exposes exactly the approved 30 unique case slugs", () => {
  assert.deepEqual(
    thoughtCases.map((item) => item.slug),
    expectedSlugs,
  );
  assert.equal(new Set(expectedSlugs).size, 30);
});

test("every category contains exactly five complete cases", () => {
  for (const category of CASE_CATEGORIES) {
    const cases = thoughtCases.filter((item) => item.category === category);
    assert.equal(cases.length, 5, category);
  }

  for (const item of thoughtCases) {
    assert.equal(item.reveals.length, 3, item.slug);
    assert.equal(item.presentLenses.length, 3, item.slug);
    assert.equal(item.relatedCaseSlugs.length, 2, item.slug);
    assert.ok(item.context.length >= 80, item.slug);
    assert.ok(item.context.length <= 360, item.slug);
  }
});

test("every case resolves three source-backed Trace moments", () => {
  for (const item of thoughtCases) {
    for (const reveal of item.reveals) {
      const { trace, moment } = getCaseEvidence(reveal.evidence);
      assert.equal(trace.slug, reveal.evidence.traceSlug);
      assert.equal(moment.id, reveal.evidence.momentId);
      assert.ok(moment.verification.length > 0);
      assert.ok(moment.sources.length > 0);
    }
  }
});

test("case data never copies historical source or moment fields", () => {
  const forbiddenKeys = new Set([
    "year",
    "historicalSummary",
    "verification",
    "sources",
    "image",
    "sourceUrl",
  ]);

  for (const item of thoughtCases) {
    for (const reveal of item.reveals) {
      for (const key of Object.keys(reveal)) {
        assert.equal(forbiddenKeys.has(key), false, `${item.slug}:${key}`);
      }
    }
  }
});

test("lookup and related-case resolution reject broken links", () => {
  assert.equal(
    getThoughtCaseBySlug("diem-so-co-dinh-nghia-con-nguoi")?.primaryTrace,
    "con-nguoi",
  );
  assert.equal(getThoughtCaseBySlug("khong-ton-tai"), undefined);

  for (const item of thoughtCases) {
    const related = getRelatedCases(item);
    assert.equal(related.length, 2);
    assert.ok(related.every((candidate) => candidate.slug !== item.slug));
  }
});

test("invalid evidence fails loudly", () => {
  assert.throws(
    () =>
      getCaseEvidence({
        traceSlug: "dai-doan-ket",
        momentId: "khong-ton-tai",
      }),
    /Unknown historical moment/,
  );
});

test("case file numbers follow the approved registry order", () => {
  assert.equal(getCaseFileNumber(thoughtCases[0]), "HS-001");
  assert.equal(getCaseFileNumber(thoughtCases[29]), "HS-030");
});
