import { Node, mergeAttributes } from "@tiptap/core";

export const Status = Node.create({
  addAttributes() {
    return {
      color: { default: null },
      localId: { default: null },
      style: { default: "" },
      text: { default: null },
    };
  },
  atom: true,
  group: "inline",
  inline: true,
  name: "status",
  parseHTML() {
    return [{ tag: 'span[data-type="status"]' }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(HTMLAttributes, {
        "data-type": "status",
        style: `color: ${node.attrs.color}; ${node.attrs.style}`,
      }),
      node.attrs.text,
    ];
  },
});
