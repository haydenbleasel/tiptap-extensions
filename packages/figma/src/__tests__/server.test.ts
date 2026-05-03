import { describe, expect, test } from "bun:test";

import { Figma } from "../server";
import {
  buildSchema,
  parseHTMLToDoc,
  renderNodeToHTML,
  serializeDocToHTML,
} from "./helpers";

describe("Figma (server)", () => {
  const schema = buildSchema([Figma]);

  test("registers a `figma` block atom node", () => {
    const node = schema.nodes.figma;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.isAtom).toBe(true);
  });

  test("declares a default-null `src` attribute", () => {
    expect(schema.nodes.figma.spec.attrs?.src).toEqual({ default: null });
  });

  test("renders to an iframe with figma defaults (allowfullscreen, 800x450)", () => {
    const html = renderNodeToHTML(schema, "figma", {
      src: "https://www.figma.com/embed?url=...",
    });
    expect(html).toContain('allowfullscreen="true"');
    expect(html).toContain('width="800"');
    expect(html).toContain('height="450"');
    expect(html.startsWith("<iframe")).toBe(true);
  });

  test('parses an `<iframe src="...figma.com...">` back into a figma node', () => {
    const doc = parseHTMLToDoc(
      '<iframe src="https://www.figma.com/embed?url=foo"></iframe>',
      schema
    );
    let found = false;
    doc.descendants((node) => {
      if (node.type.name === "figma") {
        found = true;
      }
    });
    expect(found).toBe(true);
  });

  test("does not match iframes from other domains", () => {
    const doc = parseHTMLToDoc(
      '<iframe src="https://example.com/foo"></iframe>',
      schema
    );
    let found = false;
    doc.descendants((node) => {
      if (node.type.name === "figma") {
        found = true;
      }
    });
    expect(found).toBe(false);
  });

  test("parse → serialize round trip preserves the iframe form", () => {
    const doc = parseHTMLToDoc(
      '<iframe src="https://www.figma.com/embed?url=foo"></iframe>',
      schema
    );
    const html = serializeDocToHTML(doc);
    expect(html).toContain("<iframe");
    expect(html).toContain('width="800"');
  });
});
