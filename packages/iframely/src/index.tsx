import { Node, mergeAttributes } from "@tiptap/core";
import type { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { useEffect, useRef } from "react";

declare global {
  interface Window {
    iframely?: {
      load: (container: HTMLElement, src: string) => void;
    };
  }
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    iframely: {
      setIframelyEmbed: (options: { src: string }) => ReturnType;
    };
  }
}

export const Iframely = Node.create({
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  addCommands() {
    return {
      setIframelyEmbed:
        (options: { src: string }) =>
        ({ commands }) =>
          commands.insertContent({
            attrs: options,
            type: this.name,
          }),
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

        if (window.iframely !== undefined) {
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
  atom: true,
  draggable: true,
  group: "block",
  name: "iframely",

  parseHTML() {
    return [
      {
        tag: 'div[data-type="iframely-embed"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "div",
      mergeAttributes(HTMLAttributes, { "data-type": "iframely-embed" }),
    ];
  },
});
