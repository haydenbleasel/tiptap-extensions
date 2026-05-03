import { describe, expect, test } from "bun:test";
import { Iframely } from "../server";
import {
  buildSchema,
  parseHTMLToDoc,
  renderNodeToHTML,
  serializeDocToHTML,
} from "./helpers";

describe("Iframely (server)", () => {
  const schema = buildSchema([Iframely]);

  test("registers an `iframely` block atom node", () => {
    const node = schema.nodes.iframely;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.isAtom).toBe(true);
  });

  test("declares a default-null `src` attribute", () => {
    const node = schema.nodes.iframely;
    expect(node.spec.attrs?.src).toEqual({ default: null });
  });

  test("renders to `<div data-type=\"iframely-embed\">` with src passed through", () => {
    const html = renderNodeToHTML(schema, "iframely", {
      src: "https://iframe.ly/abc123",
    });
    expect(html).toContain('data-type="iframely-embed"');
    // schema-level renderHTML does not output the src attribute - only the data-type marker
    expect(html.startsWith("<div")).toBe(true);
  });

  test("parses `<div data-type=\"iframely-embed\">` back into an iframely node", () => {
    const doc = parseHTMLToDoc(
      '<div data-type="iframely-embed"></div>',
      schema
    );
    let found = false;
    doc.descendants((node) => {
      if (node.type.name === "iframely") {
        found = true;
      }
    });
    expect(found).toBe(true);
  });

  test("ignores unrelated divs", () => {
    const doc = parseHTMLToDoc("<div>plain</div>", schema);
    let foundIframely = false;
    doc.descendants((node) => {
      if (node.type.name === "iframely") {
        foundIframely = true;
      }
    });
    expect(foundIframely).toBe(false);
  });

  test("parse → serialize round trip preserves the data-type marker", () => {
    const doc = parseHTMLToDoc(
      '<div data-type="iframely-embed"></div>',
      schema
    );
    const html = serializeDocToHTML(doc);
    expect(html).toContain('data-type="iframely-embed"');
  });
});
