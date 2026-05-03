import { describe, expect, test } from "bun:test";
import { DOMSerializer } from "@tiptap/pm/model";
import { Em } from "../extensions/em";
import { Strong } from "../extensions/strong";
import { SubSup } from "../extensions/subsup";
import { TextColor } from "../extensions/text-color";
import { buildSchema, parseHTMLToDoc, serializeDocToHTML } from "./helpers";

const markOnFirstText = (doc: ReturnType<typeof parseHTMLToDoc>) => {
  const marks: string[] = [];
  doc.descendants((node) => {
    if (node.isText) {
      for (const m of node.marks) {
        marks.push(m.type.name);
      }
    }
  });
  return marks;
};

describe("Em mark", () => {
  const schema = buildSchema([Em]);

  test("registers an `em` mark", () => {
    expect(schema.marks.em).toBeDefined();
  });

  test("parses `<em>` and serializes back to `<em>`", () => {
    const doc = parseHTMLToDoc("<p><em>hello</em></p>", schema);
    expect(markOnFirstText(doc)).toContain("em");
    expect(serializeDocToHTML(doc)).toContain("<em>hello</em>");
  });
});

describe("Strong mark", () => {
  const schema = buildSchema([Strong]);

  test("registers a `strong` mark", () => {
    expect(schema.marks.strong).toBeDefined();
  });

  test("parses `<strong>` and serializes back to `<strong>`", () => {
    const doc = parseHTMLToDoc("<p><strong>bold</strong></p>", schema);
    expect(markOnFirstText(doc)).toContain("strong");
    expect(serializeDocToHTML(doc)).toContain("<strong>bold</strong>");
  });
});

describe("SubSup mark", () => {
  const schema = buildSchema([SubSup]);

  test("registers a `subsup` mark", () => {
    expect(schema.marks.subsup).toBeDefined();
  });

  test("parses `<sub>` with type=sub", () => {
    const doc = parseHTMLToDoc("<p><sub>x</sub></p>", schema);
    let typeAttr: string | undefined;
    doc.descendants((node) => {
      if (node.isText) {
        const mark = node.marks.find((m) => m.type.name === "subsup");
        if (mark) {
          typeAttr = mark.attrs.type;
        }
      }
    });
    expect(typeAttr).toBe("sub");
  });

  test("parses `<sup>` with type=sup", () => {
    const doc = parseHTMLToDoc("<p><sup>2</sup></p>", schema);
    let typeAttr: string | undefined;
    doc.descendants((node) => {
      if (node.isText) {
        const mark = node.marks.find((m) => m.type.name === "subsup");
        if (mark) {
          typeAttr = mark.attrs.type;
        }
      }
    });
    expect(typeAttr).toBe("sup");
  });

  test("renders `sub` type back to a `<sub>` tag", () => {
    const doc = parseHTMLToDoc("<p><sub>x</sub></p>", schema);
    expect(serializeDocToHTML(doc)).toContain("<sub");
  });

  test("renders `sup` type back to a `<sup>` tag", () => {
    const doc = parseHTMLToDoc("<p><sup>2</sup></p>", schema);
    expect(serializeDocToHTML(doc)).toContain("<sup");
  });
});

describe("TextColor mark", () => {
  const schema = buildSchema([TextColor]);

  test("registers a `textColor` mark", () => {
    expect(schema.marks.textColor).toBeDefined();
  });

  test("declares a default-null `color` attribute", () => {
    expect(schema.marks.textColor.spec.attrs?.color).toEqual({ default: null });
  });

  test("applies a textColor mark when parsing a span with a color style", () => {
    const doc = parseHTMLToDoc(
      '<p><span style="color: red">hi</span></p>',
      schema
    );
    expect(markOnFirstText(doc)).toContain("textColor");
  });

  test("renders a constructed textColor mark as a span with `style=\"color: ...\"`", () => {
    const mark = schema.marks.textColor.create({ color: "blue" });
    const text = schema.text("hi", [mark]);
    const paragraph = schema.nodes.paragraph.create(null, text);
    const tmp = document.createElement("div");
    tmp.appendChild(
      DOMSerializer.fromSchema(schema).serializeFragment(paragraph.content)
    );
    expect(tmp.innerHTML).toContain("color: blue");
    expect(tmp.innerHTML).toContain("<span");
  });
});
