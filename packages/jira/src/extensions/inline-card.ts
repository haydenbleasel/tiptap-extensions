import { Node, mergeAttributes } from '@tiptap/core';

export const InlineCard = Node.create({
  name: 'inlineCard',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      url: { default: null },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'a[data-type="inlineCard"]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      'a',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'inlineCard',
      }),
      node.attrs.url,
    ];
  },
});
