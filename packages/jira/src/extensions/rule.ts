import { Node, mergeAttributes } from "@tiptap/core";

export const Rule = Node.create({
  group: "block",
  name: "rule",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", mergeAttributes(HTMLAttributes)];
  },
});
