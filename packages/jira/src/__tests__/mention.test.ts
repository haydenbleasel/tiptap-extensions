import { describe, expect, test } from "bun:test";

import { Mention } from "../extensions/mention";
import {
  buildSchema,
  findNode,
  parseHTMLToDoc,
  renderNodeToHTML,
} from "./helpers";

describe("Mention", () => {
  const schema = buildSchema([Mention]);

  test("registers an inline atom `mention` node", () => {
    const node = schema.nodes.mention;
    expect(node).toBeDefined();
    expect(node.isInline).toBe(true);
    expect(node.isAtom).toBe(true);
  });

  test("declares id, text, and accessLevel attributes", () => {
    const attrs = schema.nodes.mention.spec.attrs as Record<
      string,
      { default: unknown }
    >;
    expect(attrs.id).toBeDefined();
    expect(attrs.text).toBeDefined();
    expect(attrs.accessLevel).toBeDefined();
    expect(attrs.id.default).toBeNull();
    expect(attrs.text.default).toBeNull();
    expect(attrs.accessLevel.default).toBe("");
  });

  test('renders with `data-type="mention"`', () => {
    const html = renderNodeToHTML(schema, "mention", {
      id: "user-1",
      text: "@Hayden",
    });
    expect(html).toContain('data-type="mention"');
  });

  test("renders id, text, and accessLevel as data-* attributes when set", () => {
    const html = renderNodeToHTML(schema, "mention", {
      accessLevel: "CONTAINER",
      id: "user-42",
      text: "@hb",
    });
    expect(html).toContain('data-id="user-42"');
    expect(html).toContain('data-text="@hb"');
    expect(html).toContain('data-access-level="CONTAINER"');
  });

  test("omits empty accessLevel from rendered attributes", () => {
    const html = renderNodeToHTML(schema, "mention", { id: "user-1" });
    expect(html).not.toContain("data-access-level");
  });

  test("parses a mention element with data-id/data-text back into a mention node", () => {
    const doc = parseHTMLToDoc(
      '<p><span data-type="mention" data-id="user-7" data-text="@bob"></span></p>',
      schema
    );
    const mentions = findNode(doc, "mention");
    expect(mentions).toHaveLength(1);
    expect(mentions[0]?.attrs.id).toBe("user-7");
    expect(mentions[0]?.attrs.text).toBe("@bob");
  });
});
