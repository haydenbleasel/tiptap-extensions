import { Node, mergeAttributes } from "@tiptap/core";

export const Iframely = Node.create({
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },
  atom: true,
  draggable: true,
  group: "block",
  name: "iframely",

  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap extension property"
  parseHTML() {
    return [
      {
        tag: 'div[data-type="iframely-embed"]',
      },
    ];
  },

  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap extension property"
  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "iframely-embed" }),
    ];
  },
});
