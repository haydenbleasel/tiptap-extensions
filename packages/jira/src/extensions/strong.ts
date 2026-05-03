import { Mark, mergeAttributes } from "@tiptap/core";

export const Strong = Mark.create({
  name: "strong",
  parseHTML() {
    return [{ tag: "strong" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["strong", mergeAttributes(HTMLAttributes), 0];
  },
});
