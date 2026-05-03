import { Node, mergeAttributes } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import type { NodeViewProps } from "@tiptap/react";

export const ExpandClient = Node.create({
  addAttributes() {
    return {
      title: { default: null },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(({ node }: NodeViewProps) => (
      <NodeViewWrapper>
        <details>
          <summary>{node.attrs.title}</summary>
          <div>
            {node.content.content.map((child) => (
              <div key={child.textContent}>{child.textContent}</div>
            ))}
          </div>
        </details>
      </NodeViewWrapper>
    ));
  },
  content: "block+",
  group: "block",
  name: "expand",
  parseHTML() {
    return [{ tag: "div[data-expand-title]" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, {
        "data-expand-title": node.attrs.title,
      }),
      0,
    ];
  },
});
