import { Node, mergeAttributes } from '@tiptap/core';

export const Media = Node.create({
  name: 'media',
  group: 'block',
  atom: true,
  addAttributes() {
    return {
      id: { default: null },
      alt: { default: null },
      type: { default: 'file' },
      width: { default: null },
      height: { default: null },
      collection: { default: null },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'img' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      'img',
      mergeAttributes(HTMLAttributes, {
        src: node.attrs.id,
        alt: node.attrs.alt,
        width: node.attrs.width,
        height: node.attrs.height,
      }),
    ];
  },
});
