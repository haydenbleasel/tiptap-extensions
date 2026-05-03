import { Mark, mergeAttributes } from "@tiptap/core";

export const SubSup = Mark.create({
  addAttributes() {
    return {
      type: {
        default: "sub",
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        parseHTML: (element) => (element.tagName === "SUB" ? "sub" : "sup"),
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
        renderHTML: (attributes) => ({ "data-type": attributes.type }),
      },
    };
  },
  name: "subsup",
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [
      { getAttrs: () => ({ type: "sub" }), tag: "sub" },
      { getAttrs: () => ({ type: "sup" }), tag: "sup" },
    ];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ mark, HTMLAttributes }) {
    return [mark.attrs.type, mergeAttributes(HTMLAttributes), 0];
  },
});
