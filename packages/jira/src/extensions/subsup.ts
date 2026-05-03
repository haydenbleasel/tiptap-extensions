import { Mark, mergeAttributes } from "@tiptap/core";

export const SubSup = Mark.create({
  addAttributes() {
    return {
      type: {
        default: "sub",
        parseHTML: (element) => (element.tagName === "SUB" ? "sub" : "sup"),
        renderHTML: (attributes) => ({ "data-type": attributes.type }),
      },
    };
  },
  name: "subsup",
  parseHTML() {
    return [
      { getAttrs: () => ({ type: "sub" }), tag: "sub" },
      { getAttrs: () => ({ type: "sup" }), tag: "sup" },
    ];
  },
  renderHTML({ mark, HTMLAttributes }) {
    return [mark.attrs.type, mergeAttributes(HTMLAttributes), 0];
  },
});
