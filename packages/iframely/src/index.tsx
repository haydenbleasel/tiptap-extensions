import { Node, type NodeViewProps, mergeAttributes } from '@tiptap/core';
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react';
import { useEffect, useRef } from 'react';

declare global {
  interface Window {
    iframely?: {
      load: (container: HTMLElement, src: string) => void;
    };
  }
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    iframely: {
      setIframelyEmbed: (options: {
        src: string;
      }) => ReturnType;
    };
  }
}

export const Iframely = Node.create({
  name: 'iframely',
  group: 'block',
  atom: true,
  draggable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap extension property"
  parseHTML() {
    return [
      {
        tag: 'div[data-type="iframely-embed"]',
      },
    ];
  },

  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap extension property"
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { 'data-type': 'iframely-embed' }),
    ];
  },

  addCommands() {
    return {
      setIframelyEmbed:
        (options: { src: string }) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },

  addNodeView() {
    return ReactNodeViewRenderer(({ node }: NodeViewProps) => {
      const containerRef = useRef<HTMLDivElement>(null);
      const loaded = useRef(false);

      useEffect(() => {
        if (loaded.current || !containerRef.current) {
          return;
        }

        if (typeof window.iframely !== 'undefined') {
          window.iframely.load(containerRef.current, node.attrs.src);
          loaded.current = true;
        }
      }, [node.attrs.src]);

      return (
        <NodeViewWrapper>
          <div
            ref={containerRef}
            className="not-prose my-8 overflow-hidden shadow-sm"
          />
        </NodeViewWrapper>
      );
    });
  },
});
