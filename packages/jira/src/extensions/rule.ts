import { Node, mergeAttributes } from "@tiptap/core";

export const Rule = Node.create({
  group: "block",
  name: "rule",
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  parseHTML() {
    return [{ tag: "hr" }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap mark property"
  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(HTMLAttributes)];
  },
});
