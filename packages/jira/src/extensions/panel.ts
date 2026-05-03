import { Node, mergeAttributes } from "@tiptap/core";

export const Panel = Node.create({
  addAttributes() {
    return {
      panelType: { default: "info" },
    };
  },
  content: "block+",
  group: "block",
  name: "panel",
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: "div[data-panel-type]" }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-panel-type": node.attrs.panelType,
      }),
      0,
    ];
  },
});
