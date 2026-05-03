import { describe, expect, test } from "bun:test";

import { Editor } from "@tiptap/core";

import { Iframely } from "../index";
import {
  Document,
  Paragraph,
  Text,
  buildSchema,
  parseHTMLToDoc,
  renderNodeToHTML,
} from "./helpers";

describe("Iframely (client)", () => {
  describe("schema", () => {
    const schema = buildSchema([Iframely]);

    test("registers an `iframely` block atom node", () => {
      const node = schema.nodes.iframely;
      expect(node).toBeDefined();
      expect(node.isBlock).toBe(true);
      expect(node.isAtom).toBe(true);
    });

    test('renders to a `<div data-type="iframely-embed">` marker', () => {
      const html = renderNodeToHTML(schema, "iframely", { src: "https://x" });
      expect(html).toContain('data-type="iframely-embed"');
    });

    test('parses the `<div data-type="iframely-embed">` marker back', () => {
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
  });

  describe("setIframelyEmbed command", () => {
    test("inserts an iframely node carrying the provided src", () => {
      const editor = new Editor({
        extensions: [Document, Paragraph, Text, Iframely],
      });

      editor.commands.setIframelyEmbed({ src: "https://iframe.ly/abc123" });

      const json = editor.getJSON();
      const flat: { type?: string; attrs?: Record<string, unknown> }[] = [];
      const walk = (node: {
        type?: string;
        attrs?: Record<string, unknown>;
        content?: typeof flat;
      }) => {
        flat.push(node);
        if (node.content) {
          for (const child of node.content) {
            walk(child);
          }
        }
      };
      walk(json as never);

      const inserted = flat.find((n) => n.type === "iframely");
      expect(inserted).toBeDefined();
      expect(inserted?.attrs?.src).toBe("https://iframe.ly/abc123");

      editor.destroy();
    });

    test("returns true when the command runs", () => {
      const editor = new Editor({
        extensions: [Document, Paragraph, Text, Iframely],
      });

      const result = editor.commands.setIframelyEmbed({
        src: "https://iframe.ly/xyz",
      });
      expect(result).toBe(true);

      editor.destroy();
    });
  });
});
