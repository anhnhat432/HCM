import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { QrShareDialog } from "@/components/share/qr-share-dialog";
import { resolveShareUrl } from "@/lib/share-url";

test("share URLs prefer canonical metadata", () => {
  assert.equal(
    resolveShareUrl(
      "https://hcm-trace.vercel.app/trace/dai-doan-ket",
      "http://localhost:3000/trace/dai-doan-ket#moment-1930",
    ),
    "https://hcm-trace.vercel.app/trace/dai-doan-ket",
  );
});

test("share URL fallback removes query and hash", () => {
  assert.equal(
    resolveShareUrl(
      null,
      "https://example.test/trace/con-nguoi?x=1#application",
    ),
    "https://example.test/trace/con-nguoi",
  );
});

test("QR sharing exposes a text-named trigger without an open dialog", () => {
  const markup = renderToStaticMarkup(
    createElement(QrShareDialog, {
      label: "Chia sẻ Trace bằng mã QR",
    }),
  );

  assert.ok(markup.includes("qr-share__trigger"));
  assert.ok(markup.includes("Chia sẻ Trace bằng mã QR"));
  assert.equal(markup.includes('role="dialog"'), false);
});
