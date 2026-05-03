import { Node, mergeAttributes } from '@tiptap/core';

export const ExpandServer = Node.create({
  name: 'expand',
  group: 'block',
  content: 'block+',
  addAttributes() {
    return {
      title: { default: null },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap node property"
  parseHTML() {
    return [{ tag: 'div[data-expand-title]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap node property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-expand-title': node.attrs.title,
      }),
      0,
    ];
  },
});
