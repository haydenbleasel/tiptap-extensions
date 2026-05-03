import { describe, expect, test } from "bun:test";
import { Media } from "../extensions/media";
import { MediaSingleClient } from "../extensions/media-single/client";
import { MediaSingleServer } from "../extensions/media-single/server";
import { buildSchema, findNode, parseHTMLToDoc } from "./helpers";

describe.each([
  ["MediaSingleServer", MediaSingleServer],
  ["MediaSingleClient", MediaSingleClient],
] as const)("%s", (_name, Extension) => {
  const schema = buildSchema([Media, Extension]);

  test("registers a `mediaSingle` block node containing a single media child", () => {
    const node = schema.nodes.mediaSingle;
    expect(node).toBeDefined();
    expect(node.isBlock).toBe(true);
    expect(node.spec.content).toBe("media");
  });

  test("defaults `layout` to `align-start`", () => {
    expect(schema.nodes.mediaSingle.spec.attrs?.layout).toEqual({
      default: "align-start",
    });
  });

  test("parses `<div data-layout=...>` containing an `<img>` back into a mediaSingle", () => {
    const doc = parseHTMLToDoc(
      '<div data-layout="center"><img src="x"></div>',
      schema
    );
    const found = findNode(doc, "mediaSingle");
    expect(found).toHaveLength(1);
    expect(found[0]?.attrs.layout).toBe("center");
  });
});
