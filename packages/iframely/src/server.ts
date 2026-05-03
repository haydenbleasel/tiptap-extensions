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

  parseHTML() {
    return [
      {
        tag: 'div[data-type="iframely-embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "iframely-embed" }),
    ];
  },
});
