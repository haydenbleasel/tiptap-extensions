import { Node, mergeAttributes } from "@tiptap/core";

export const DateNode = Node.create({
  addAttributes() {
    return {
      timestamp: { default: null },
    };
  },
  atom: true,
  group: "inline",
  inline: true,
  name: "date",
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: 'time[data-type="date"]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      "time",
      mergeAttributes(HTMLAttributes, {
        "data-type": "date",
        datetime: node.attrs.timestamp,
      }),
      new Date(Number.parseInt(node.attrs.timestamp, 10)).toLocaleDateString(),
    ];
  },
});
