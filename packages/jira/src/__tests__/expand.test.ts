import { describe, expect, test } from "bun:test";

import { ExpandClient } from "../extensions/expand/client";
import { ExpandServer } from "../extensions/expand/server";
import {
  buildSchema,
  findNode,
  parseHTMLToDoc,
  renderNodeToHTML,
} from "./helpers";

describe.each([
  ["ExpandServer", ExpandServer],
  ["ExpandClient", ExpandClient],
] as const)("%s", (_name, Extension) => {
  const schema = buildSchema([Extension]);

  test("registers an `expand` block node with title attr and block+ content", () => {
    const node = schema.nodes.expand;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.spec.attrs?.title).toEqual({ default: null });
    expect(node.spec.content).toBe("block+");
  });

  test("renders with `data-expand-title` based on the attribute", () => {
    const paragraph = schema.nodes.paragraph.createAndFill();
    if (!paragraph) {
      throw new Error("paragraph could not be created");
    }
    const html = renderNodeToHTML(
      schema,
      "expand",
      { title: "Notes" },
      paragraph
    );
    expect(html).toContain('data-expand-title="Notes"');
  });

  test("parses `<div data-expand-title>` back into an expand node", () => {
    const doc = parseHTMLToDoc(
      '<div data-expand-title="x"><p>body</p></div>',
      schema
    );
    expect(findNode(doc, "expand")).toHaveLength(1);
  });
});
