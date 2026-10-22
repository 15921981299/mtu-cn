import assert from "node:assert/strict";
import test from "node:test";
import {
  contentSlug,
  rememberContent,
  readContent,
  contentLeadParams,
} from "../src/scripts/content-attribution.ts";
import {
  populateRfqAttributionFields,
  trackAcceptedInquiry,
  trackPageAttribution,
} from "../src/scripts/attribution.ts";

test("only article URLs are identified as content views", () => {
  assert.equal(contentSlug("/insights/mtu-common-rail/"), "mtu-common-rail");
  for (const path of [
    "/insights/",
    "/guides/abc/",
    "/insights/a/b/",
    "/insights/bad%20slug/",
  ])
    assert.equal(contentSlug(path), null);
});

test("article context survives intermediate pages and reaches the form and accepted lead", () => {
  const storage = new Map();
  const fields = new Map();
  const events = [];
  globalThis.sessionStorage = {
    getItem: (key) => storage.get(key) ?? null,
    setItem: (key, value) => storage.set(key, value),
  };
  globalThis.window = {
    location: new URL(
      "https://mtupeijian.com/insights/mtu-4000-common-rail-pressure-drop/",
    ),
    gtag: (...args) => events.push(args),
  };
  globalThis.document = {
    referrer: "",
    createElement: () => ({ type: "", name: "", value: "" }),
  };
  trackPageAttribution();
  rememberContent({
    article: "mtu-4000-common-rail-pressure-drop",
    batch: "P0",
    part: "EX52407500064",
  });
  window.location = new URL(
    "https://mtupeijian.com/part-products/ex52407500064-injector/",
  );
  trackPageAttribution();
  window.location = new URL("https://mtupeijian.com/contact/");
  populateRfqAttributionFields({
    querySelector: (selector) =>
      fields.get(/name="([^"]+)"/.exec(selector)?.[1]) ?? null,
    appendChild: (field) => fields.set(field.name, field),
  });
  assert.equal(
    fields.get("content_article")?.value,
    "mtu-4000-common-rail-pressure-drop",
  );
  assert.equal(fields.get("content_part")?.value, "EX52407500064");
  assert.equal(
    trackAcceptedInquiry("1c7512bf-2783-4d8d-b99f-45f3da048886"),
    true,
  );
  const lead = events.find((event) => event[1] === "generate_lead");
  assert.equal(lead[2].content_article, "mtu-4000-common-rail-pressure-drop");
  assert.equal(lead[2].content_batch, "P0");
  assert.equal(
    trackAcceptedInquiry("1c7512bf-2783-4d8d-b99f-45f3da048886"),
    false,
  );
  delete globalThis.window;
  delete globalThis.document;
  delete globalThis.sessionStorage;
});

test("blocked storage keeps local context and a new article clears the prior part", () => {
  globalThis.sessionStorage = {
    getItem: () => {
      throw new Error("blocked");
    },
    setItem: () => {
      throw new Error("blocked");
    },
  };
  rememberContent({ article: "mtu-high-oil-consumption", batch: "P1" });
  assert.equal(readContent().article, "mtu-high-oil-consumption");
  assert.equal(contentLeadParams().content_part, "");
  delete globalThis.sessionStorage;
});
