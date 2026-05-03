import { Node, mergeAttributes } from "@tiptap/core";

export const UndefinedNode = Node.create({
  addAttributes() {
    return {};
  },
  atom: true,
  group: "inline",
  inline: true,
  name: "undefined",
  parseHTML() {
    return [{ tag: 'span[data-type="undefined"]' }];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, { "data-type": "undefined" }),
      "",
    ];
  },
});
