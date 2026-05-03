import { Node, mergeAttributes } from "@tiptap/core";

export const Media = Node.create({
  addAttributes() {
    return {
      alt: { default: null },
      collection: { default: null },
      height: { default: null },
      id: { default: null },
      type: { default: "file" },
      width: { default: null },
    };
  },
  atom: true,
  group: "block",
  name: "media",
  parseHTML() {
    return [{ tag: "img" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(HTMLAttributes, {
        alt: node.attrs.alt,
        height: node.attrs.height,
        src: node.attrs.id,
        width: node.attrs.width,
      }),
    ];
  },
});
