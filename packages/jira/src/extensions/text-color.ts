import { Mark, mergeAttributes } from "@tiptap/core";

export const TextColor = Mark.create({
  addAttributes() {
    return {
      color: {
        default: null,
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        parseHTML: (element) => element.style.color,
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        renderHTML: (attributes) => ({ style: `color: ${attributes.color}` }),
      },
    };
  },
  name: "textColor",
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ style: "color" }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});
