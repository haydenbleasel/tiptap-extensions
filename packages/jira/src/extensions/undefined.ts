import { Node, mergeAttributes } from '@tiptap/core';

export const UndefinedNode = Node.create({
  name: 'undefined',
  group: 'inline',
  inline: true,
  atom: true,
  addAttributes() {
    return {};
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'span[data-type="undefined"]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(HTMLAttributes, { 'data-type': 'undefined' }),
      '',
    ];
  },
});
