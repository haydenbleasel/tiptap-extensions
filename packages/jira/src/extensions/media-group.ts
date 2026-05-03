import { Node } from "@tiptap/core";

export const MediaGroup = Node.create({
  content: "media+",
  group: "block",
  name: "mediaGroup",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="mediaGroup"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", { "data-type": "mediaGroup", ...HTMLAttributes }, 0];
  },
});
