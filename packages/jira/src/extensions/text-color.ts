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
        getAttrs: (value) => ({ color: value }),
        style: "color",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", mergeAttributes(HTMLAttributes), 0];
  },
});
