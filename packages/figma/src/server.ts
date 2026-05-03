import { Node, mergeAttributes } from "@tiptap/core";

export const Figma = Node.create({
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },
  atom: true,
  group: "block",
  name: "figma",

  parseHTML() {
    return [
      {
        tag: 'iframe[src*="figma.com"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        allowfullscreen: "true",
        height: "450",
        width: "800",
      }),
    ];
  },
});
