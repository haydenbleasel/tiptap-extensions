import { Node, mergeAttributes } from "@tiptap/core";

export const MediaSingleServer = Node.create({
  addAttributes() {
    return {
      layout: {
        default: "align-start",
        parseHTML: (element) => element.dataset.layout,
        renderHTML: (attributes) => ({ "data-layout": attributes.layout }),
      },
    };
  },
  content: "media",
  group: "block",
  name: "mediaSingle",
  parseHTML() {
    return [{ tag: "div[data-layout]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});
