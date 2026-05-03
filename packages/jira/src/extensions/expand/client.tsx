import { Node, mergeAttributes } from '@tiptap/core';
import {
  type NodeViewProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';

export const ExpandClient = Node.create({
  name: 'expand',
  group: 'block',
  content: 'block+',
  addAttributes() {
    return {
      title: { default: null },
    };
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap node property"
  parseHTML() {
    return [{ tag: 'div[data-expand-title]' }];
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap node property"
  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-expand-title': node.attrs.title,
      }),
      0,
    ];
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
});
