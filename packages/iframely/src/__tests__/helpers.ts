import "./setup";
import { Node, getSchema } from "@tiptap/core";
import type { AnyExtension } from "@tiptap/core";
import { DOMParser, DOMSerializer } from "@tiptap/pm/model";
import type { Schema } from "@tiptap/pm/model";

export const Document = Node.create({
  content: "block+",
  name: "doc",
  topNode: true,
});

export const Paragraph = Node.create({
  content: "inline*",
  group: "block",
  name: "paragraph",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML() {
    return ["p", 0];
  },
});

export const Text = Node.create({
  group: "inline",
  name: "text",
});

export const buildSchema = (extensions: AnyExtension[]): Schema =>
  getSchema([Document, Paragraph, Text, ...extensions]);

export const parseHTMLToDoc = (html: string, schema: Schema) => {
  const container = document.createElement("div");
  container.innerHTML = html;
  return DOMParser.fromSchema(schema).parse(container);
};

export const serializeDocToHTML = (doc: ReturnType<typeof parseHTMLToDoc>) => {
  const fragment = DOMSerializer.fromSchema(doc.type.schema).serializeFragment(
    doc.content
  );
  const container = document.createElement("div");
  container.append(fragment);
  return container.innerHTML;
};

export const renderNodeToHTML = (
  schema: Schema,
  nodeName: string,
  attrs: Record<string, unknown> = {},
  content?: ReturnType<Schema["nodeFromJSON"]>
) => {
  const node = schema.nodes[nodeName].create(attrs, content);
  const dom = DOMSerializer.fromSchema(schema).serializeNode(node);
  const container = document.createElement("div");
  container.append(dom);
  return container.innerHTML;
};
