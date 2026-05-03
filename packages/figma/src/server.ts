import { Node, mergeAttributes } from '@tiptap/core';

export const Figma = Node.create({
  name: 'figma',
  group: 'block',
  atom: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  // biome-ignore lint/style/useNamingConvention: "This is a TipTap extension property"
  parseHTML() {
    return [
      {
        tag: 'iframe[src*="figma.com"]',
      },
    ];
  },

  // biome-ignore lint/style/useNamingConvention: "This is a TipTap extension property"
  renderHTML({ HTMLAttributes }) {
    return [
      'iframe',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        width: '800',
        height: '450',
        allowfullscreen: 'true',
      }),
    ];
  },
});
