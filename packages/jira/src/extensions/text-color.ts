import { Mark, mergeAttributes } from "@tiptap/core";

export const TextColor = Mark.create({
  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color,
        renderHTML: (attributes) => ({ style: `color: ${attributes.color}` }),
      },
    };
  },
  name: "textColor",
  parseHTML() {
    return [{ style: "color" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});
