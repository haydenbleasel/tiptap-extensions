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
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'span[data-type="status"]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
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
