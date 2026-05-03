import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";

export const MediaSingleClient = Node.create({
  addAttributes() {
    return {
      layout: {
        default: "align-start",
        parseHTML: (element) => element.dataset.layout,
        renderHTML: (attributes) => ({ "data-layout": attributes.layout }),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(() => (
      <NodeViewWrapper>
        <div className="pointer-events-none flex aspect-video w-full select-none items-center justify-center rounded-lg border bg-card">
          <p>Sorry, we can't render images from Jira just yet.</p>
        </div>
      </NodeViewWrapper>
    ));
  },
  content: "media",
  group: "block",
  name: "mediaSingle",
  parseHTML() {
    return [{ tag: "div[data-layout]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes), 0];
  },
});
