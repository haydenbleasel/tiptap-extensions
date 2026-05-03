import "./setup";
import { Node, getSchema } from "@tiptap/core";
import type { AnyExtension } from "@tiptap/core";
import { DOMParser, DOMSerializer } from "@tiptap/pm/model";
import type { Node as PMNode, Schema } from "@tiptap/pm/model";

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

export const serializeDocToHTML = (doc: PMNode) => {
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
  content?: PMNode | PMNode[]
) => {
  const node = schema.nodes[nodeName].create(
    attrs,
    content as Parameters<Schema["nodes"][string]["create"]>[1]
  );
  const dom = DOMSerializer.fromSchema(schema).serializeNode(node);
  const container = document.createElement("div");
  container.append(dom);
  return container.innerHTML;
};

export const findNode = (doc: PMNode, name: string) => {
  const found: PMNode[] = [];
  doc.descendants((node) => {
    if (node.type.name === name) {
      found.push(node);
    }
  });
  return found;
};
