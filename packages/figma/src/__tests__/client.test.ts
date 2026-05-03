import { describe, expect, test } from "bun:test";
import { Editor } from "@tiptap/core";
import type { EditorView } from "@tiptap/pm/view";
import { Figma } from "../index";
import {
  Document,
  Paragraph,
  Text,
  buildSchema,
  renderNodeToHTML,
} from "./helpers";

const VALID_FIGMA_URL =
  "https://www.figma.com/file/abcdefghijklmnopqrstuv/Test";

const buildEditor = () =>
  new Editor({ extensions: [Document, Paragraph, Text, Figma] });

const findFigma = (editor: Editor) => {
  const collected: Array<{ type: string; attrs: Record<string, unknown> }> = [];
  editor.state.doc.descendants((node) => {
    if (node.type.name === "figma") {
      collected.push({ type: node.type.name, attrs: node.attrs });
    }
  });
  return collected;
};

const findFigmaPlugin = (editor: Editor) =>
  editor.view.state.plugins.find((p) =>
    Boolean(p.props.handlePaste || p.props.handleDOMEvents?.drop)
  );

const makePasteEvent = (text: string) => {
  const event = new Event("paste") as ClipboardEvent;
  Object.defineProperty(event, "clipboardData", {
    value: { getData: (t: string) => (t === "text/plain" ? text : "") },
  });
  return event;
};

describe("Figma (client)", () => {
  describe("schema", () => {
    const schema = buildSchema([Figma]);

    test("registers a `figma` block atom node", () => {
      expect(schema.nodes.figma).toBeDefined();
      expect(schema.nodes.figma.isBlock).toBe(true);
      expect(schema.nodes.figma.isAtom).toBe(true);
    });

    test("renders to an iframe with figma defaults", () => {
      const html = renderNodeToHTML(schema, "figma", {
        src: "https://www.figma.com/embed?url=x",
      });
      expect(html).toContain("<iframe");
      expect(html).toContain('allowfullscreen="true"');
      expect(html).toContain('width="800"');
      expect(html).toContain('height="450"');
    });
  });

  describe("setFigma command", () => {
    test("inserts a figma node carrying the provided src", () => {
      const editor = buildEditor();
      editor.commands.setFigma({ src: "https://figma.example/embed" });
      const found = findFigma(editor);
      expect(found).toHaveLength(1);
      expect(found[0]?.attrs.src).toBe("https://figma.example/embed");
      editor.destroy();
    });

    test("returns true when the command runs", () => {
      const editor = buildEditor();
      const result = editor.commands.setFigma({ src: "https://x" });
      expect(result).toBe(true);
      editor.destroy();
    });
  });

  describe("unsetFigma command", () => {
    test("is exposed as a command on the editor", () => {
      const editor = buildEditor();
      expect(typeof editor.commands.unsetFigma).toBe("function");
      editor.destroy();
    });
  });

  describe("paste handler", () => {
    test("registers a ProseMirror plugin that exposes handlePaste", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      expect(plugin).toBeDefined();
      expect(typeof plugin?.props.handlePaste).toBe("function");
      editor.destroy();
    });

    test("converts a pasted figma URL into a figma embed node", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      const handlePaste = plugin?.props.handlePaste as (
        view: EditorView,
        event: ClipboardEvent
      ) => boolean;

      const handled = handlePaste(editor.view, makePasteEvent(VALID_FIGMA_URL));
      expect(handled).toBe(true);

      const found = findFigma(editor);
      expect(found).toHaveLength(1);
      const src = found[0]?.attrs.src as string;
      expect(src).toContain("https://www.figma.com/embed");
      expect(src).toContain("embed_host=tiptap");
      expect(src).toContain(`url=${encodeURIComponent(VALID_FIGMA_URL)}`);
      expect(src).toContain("embed_origin=");

      editor.destroy();
    });

    test("ignores non-figma URLs in the clipboard", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      const handlePaste = plugin?.props.handlePaste as (
        view: EditorView,
        event: ClipboardEvent
      ) => boolean;

      const handled = handlePaste(
        editor.view,
        makePasteEvent("https://example.com/notfigma")
      );
      expect(handled).toBeFalsy();
      expect(findFigma(editor)).toHaveLength(0);

      editor.destroy();
    });

    test("returns falsy when clipboard text is empty", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      const handlePaste = plugin?.props.handlePaste as (
        view: EditorView,
        event: ClipboardEvent
      ) => boolean;

      const handled = handlePaste(editor.view, makePasteEvent(""));
      expect(handled).toBeFalsy();

      editor.destroy();
    });
  });

  describe("drop handler", () => {
    test("registers a ProseMirror plugin that exposes a drop handler", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      expect(plugin).toBeDefined();
      expect(typeof plugin?.props.handleDOMEvents?.drop).toBe("function");
      editor.destroy();
    });

    test("converts a dropped figma URL into a figma embed node", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      const drop = plugin?.props.handleDOMEvents?.drop as (
        view: EditorView,
        event: DragEvent
      ) => boolean;

      const event = new Event("drop") as DragEvent;
      Object.defineProperty(event, "dataTransfer", {
        value: { getData: (t: string) => (t === "text/plain" ? VALID_FIGMA_URL : "") },
      });
      Object.defineProperty(event, "clientX", { value: 0 });
      Object.defineProperty(event, "clientY", { value: 0 });

      // Stub posAtCoords — without a rendered DOM the real one returns null.
      const original = editor.view.posAtCoords;
      editor.view.posAtCoords = () => ({ pos: 1, inside: -1 });

      const handled = drop(editor.view, event);
      expect(handled).toBe(true);

      const found = findFigma(editor);
      expect(found).toHaveLength(1);
      expect(found[0]?.attrs.src as string).toContain(
        "https://www.figma.com/embed"
      );

      editor.view.posAtCoords = original;
      editor.destroy();
    });

    test("ignores drops of non-figma text", () => {
      const editor = buildEditor();
      const plugin = findFigmaPlugin(editor);
      const drop = plugin?.props.handleDOMEvents?.drop as (
        view: EditorView,
        event: DragEvent
      ) => boolean;

      const event = new Event("drop") as DragEvent;
      Object.defineProperty(event, "dataTransfer", {
        value: { getData: () => "https://example.com/foo" },
      });
      Object.defineProperty(event, "clientX", { value: 0 });
      Object.defineProperty(event, "clientY", { value: 0 });

      const handled = drop(editor.view, event);
      expect(handled).toBe(false);
      editor.destroy();
    });
  });
});
