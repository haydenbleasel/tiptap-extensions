import { describe, expect, test } from "bun:test";

import { Media } from "../extensions/media";
import { MediaGroup } from "../extensions/media-group";
import { Panel } from "../extensions/panel";
import { Rule } from "../extensions/rule";
import {
  buildSchema,
  findNode,
  parseHTMLToDoc,
  renderNodeToHTML,
  serializeDocToHTML,
} from "./helpers";

describe("Media", () => {
  const schema = buildSchema([Media]);

  test("registers a block atom `media` node with default attrs", () => {
    const node = schema.nodes.media;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.isAtom).toBe(true);
    const attrs = node.spec.attrs as Record<string, { default: unknown }>;
    expect(attrs.alt.default).toBeNull();
    expect(attrs.collection.default).toBeNull();
    expect(attrs.height.default).toBeNull();
    expect(attrs.id.default).toBeNull();
    expect(attrs.type.default).toBe("file");
    expect(attrs.width.default).toBeNull();
  });

  test("renders an `<img>` with id mapped to src and alt/width/height passthrough", () => {
    const html = renderNodeToHTML(schema, "media", {
      alt: "screenshot",
      height: "100",
      id: "media-123",
      width: "200",
    });
    expect(html).toContain('src="media-123"');
    expect(html).toContain('alt="screenshot"');
    expect(html).toContain('width="200"');
    expect(html).toContain('height="100"');
    expect(html.startsWith("<img")).toBe(true);
  });

  test("parses an `<img>` back into a media node", () => {
    const doc = parseHTMLToDoc('<img src="x" alt="a">', schema);
    expect(findNode(doc, "media")).toHaveLength(1);
  });
});

describe("MediaGroup", () => {
  const schema = buildSchema([Media, MediaGroup]);

  test("registers a `mediaGroup` block node containing media+", () => {
    const node = schema.nodes.mediaGroup;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.spec.content).toBe("media+");
  });

  test('parses `<div data-type="mediaGroup">` containing `<img>` children', () => {
    const doc = parseHTMLToDoc(
      '<div data-type="mediaGroup"><img src="a"><img src="b"></div>',
      schema
    );
    expect(findNode(doc, "mediaGroup")).toHaveLength(1);
    expect(findNode(doc, "media")).toHaveLength(2);
  });

  test('renders back to a `<div data-type="mediaGroup">`', () => {
    const doc = parseHTMLToDoc(
      '<div data-type="mediaGroup"><img src="a"></div>',
      schema
    );
    expect(serializeDocToHTML(doc)).toContain('data-type="mediaGroup"');
  });
});

describe("Panel", () => {
  const schema = buildSchema([Panel]);

  test("registers a `panel` block node defaulting panelType to `info`", () => {
    const node = schema.nodes.panel;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.spec.attrs?.panelType).toEqual({ default: "info" });
    expect(node.spec.content).toBe("block+");
  });

  test("renders with `data-panel-type` based on the attribute", () => {
    const paragraph = schema.nodes.paragraph.createAndFill();
    if (!paragraph) {
      throw new Error("paragraph could not be created");
    }
    const html = renderNodeToHTML(
      schema,
      "panel",
      { panelType: "warning" },
      paragraph
    );
    expect(html).toContain('data-panel-type="warning"');
  });

  test("parses `<div data-panel-type>` back into a panel node", () => {
    const doc = parseHTMLToDoc(
      '<div data-panel-type="info"><p>hi</p></div>',
      schema
    );
    expect(findNode(doc, "panel")).toHaveLength(1);
  });
});

describe("Rule", () => {
  const schema = buildSchema([Rule]);

  test("registers a `rule` block node", () => {
    const node = schema.nodes.rule;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
  });

  test("renders to an `<hr>` element", () => {
    const html = renderNodeToHTML(schema, "rule");
    expect(html.startsWith("<hr")).toBe(true);
  });

  test("parses `<hr>` back into a rule node", () => {
    const doc = parseHTMLToDoc("<hr>", schema);
    expect(findNode(doc, "rule")).toHaveLength(1);
  });
});
