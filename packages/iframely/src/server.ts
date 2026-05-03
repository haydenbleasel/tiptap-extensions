import { Node, mergeAttributes } from '@tiptap/core';

export const Iframely = Node.create({
  name: 'iframely',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

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
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'iframely-embed' }),
    ];
  },
});
