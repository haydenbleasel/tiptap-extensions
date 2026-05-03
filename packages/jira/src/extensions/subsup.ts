import { Mark, mergeAttributes } from '@tiptap/core';

export const SubSup = Mark.create({
  name: 'subsup',
  addAttributes() {
    return {
      type: {
        default: 'sub',
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        parseHTML: (element) => (element.tagName === 'SUB' ? 'sub' : 'sup'),
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        renderHTML: (attributes) => {
          return { 'data-type': attributes.type };
        },
      },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [
      { tag: 'sub', getAttrs: () => ({ type: 'sub' }) },
      { tag: 'sup', getAttrs: () => ({ type: 'sup' }) },
    ];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ mark, HTMLAttributes }) {
    return [mark.attrs.type, mergeAttributes(HTMLAttributes), 0];
  },
});
