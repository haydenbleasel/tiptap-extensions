import { Mark, mergeAttributes } from "@tiptap/core";

export const Em = Mark.create({
  name: "em",
  parseHTML() {
    return [{ tag: "em" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["em", mergeAttributes(HTMLAttributes), 0];
  },
});
