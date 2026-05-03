import { Mark, mergeAttributes } from "@tiptap/core";

export const TextColor = Mark.create({
  addAttributes() {
    return {
      color: {
        default: null,
        renderHTML: (attributes) => ({ style: `color: ${attributes.color}` }),
      },
    };
  },
  name: "textColor",
  parseHTML() {
    return [
      {
        style: "color",
        getAttrs: (value) => ({ color: value }),
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});
