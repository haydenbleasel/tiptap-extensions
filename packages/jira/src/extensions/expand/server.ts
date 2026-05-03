import { Node, mergeAttributes } from "@tiptap/core";

export const ExpandServer = Node.create({
  addAttributes() {
    return {
      title: { default: null },
    };
  },
  content: "block+",
  group: "block",
  name: "expand",
  parseHTML() {
    return [{ tag: "div[data-expand-title]" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-expand-title": node.attrs.title,
      }),
      0,
    ];
  },
});
