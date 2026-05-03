import { Node, mergeAttributes } from '@tiptap/core';

export const DateNode = Node.create({
  name: 'date',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      timestamp: { default: null },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'time[data-type="date"]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      'time',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'date',
        datetime: node.attrs.timestamp,
      }),
      new Date(Number.parseInt(node.attrs.timestamp)).toLocaleDateString(),
    ];
  },
});
