import { Node, mergeAttributes } from '@tiptap/core';

export const Status = Node.create({
  name: 'status',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {
      text: { default: null },
      color: { default: null },
      style: { default: '' },
      localId: { default: null },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'span[data-type="status"]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'status',
        style: `color: ${node.attrs.color}; ${node.attrs.style}`,
      }),
      node.attrs.text,
    ];
  },
});
