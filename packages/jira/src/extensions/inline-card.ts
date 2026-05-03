import { Node, mergeAttributes } from "@tiptap/core";

export const InlineCard = Node.create({
  addAttributes() {
    return {
      url: { default: null },
    };
  },
  atom: true,
  group: "inline",
  inline: true,
  name: "inlineCard",
  parseHTML() {
    return [{ tag: 'a[data-type="inlineCard"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "a",
      mergeAttributes(HTMLAttributes, {
        "data-type": "inlineCard",
      }),
      node.attrs.url,
    ];
  },
});
