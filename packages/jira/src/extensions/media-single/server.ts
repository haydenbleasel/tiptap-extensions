import { Node, mergeAttributes } from "@tiptap/core";

export const MediaSingleServer = Node.create({
  addAttributes() {
    return {
      layout: {
        default: "align-start",
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        parseHTML: (element) => element.dataset.layout,
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        renderHTML: (attributes) => ({ "data-layout": attributes.layout }),
      },
    };
  },
  content: "media",
  group: "block",
  name: "mediaSingle",
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: "div[data-layout]" }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});
