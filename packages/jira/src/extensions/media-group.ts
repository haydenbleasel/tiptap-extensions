import { Node } from '@tiptap/core';

export const MediaGroup = Node.create({
  name: 'mediaGroup',
  group: 'block',
  content: 'media+',

  parseHTML() {
    return [
      {
        tag: 'div[data-type="mediaGroup"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', { 'data-type': 'mediaGroup', ...HTMLAttributes }, 0];
  },
});
