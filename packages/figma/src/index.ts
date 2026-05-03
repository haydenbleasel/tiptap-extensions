import { InputRule, Node, mergeAttributes } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    figma: {
      setFigma: (options: { src: string }) => ReturnType;
      unsetFigma: () => ReturnType;
    };
  }
}

const figmaRegex =
  /https:\/\/[\w.-]+\.?figma.com\/([\w-]+)\/([0-9a-zA-Z]{22,128})(?:\/.*)?$/;

const createEmbedSrc = (url: string) => {
  const embedUrl = new URL("https://www.figma.com/embed");

  embedUrl.searchParams.set("embed_host", "tiptap");
  embedUrl.searchParams.set("embed_origin", window.location.origin);
  embedUrl.searchParams.set("url", url);

  return embedUrl.toString();
};

export const Figma = Node.create({
  addAttributes() {
    return {
      src: {
        default: null,
      },
    };
  },

  addCommands() {
    return {
      setFigma:
        (options) =>
        ({ commands }) =>
          commands.insertContent({
            attrs: options,
            type: this.name,
          }),

      unsetFigma:
        () =>
        ({ tr, state, dispatch }) => {
          let pos: number | null = null;
          let size = 0;
          state.doc.descendants((node, nodePos) => {
            if (node.type.name === this.name) {
              pos = nodePos;
              size = node.nodeSize;
              return false;
            }
          });
          if (pos === null) {
            return false;
          }
          if (dispatch) {
            tr.delete(pos, pos + size);
          }
          return true;
        },
    };
  },

  addInputRules() {
    return [
      new InputRule({
        find: figmaRegex,
        handler: ({ match, commands }) => {
          const [url] = match;
          const embedSrc = createEmbedSrc(url);

          commands.setFigma({ src: embedSrc });
        },
      }),
    ];
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey("figmaEmbedPlugin"),
        props: {
          handleDOMEvents: {
            drop: (view, event) => {
              const text = event.dataTransfer?.getData("text/plain");
              if (text && figmaRegex.test(text)) {
                const embedSrc = createEmbedSrc(text);
                const coordinates = view.posAtCoords({
                  left: event.clientX,
                  top: event.clientY,
                });
                if (coordinates) {
                  view.dispatch(
                    view.state.tr.insert(
                      coordinates.pos,
                      this.type.create({ src: embedSrc })
                    )
                  );
                  return true;
                }
              }
              return false;
            },
          },

          handlePaste: (view, event) => {
            const text = event.clipboardData?.getData("text/plain");
            if (text && figmaRegex.test(text)) {
              const embedSrc = createEmbedSrc(text);
              view.dispatch(
                view.state.tr.replaceSelectionWith(
                  this.type.create({ src: embedSrc })
                )
              );
              return true;
            }
            return false;
          },
        },
      }),
    ];
  },
  atom: true,
  group: "block",
  name: "figma",

  parseHTML() {
    return [
      {
        tag: 'iframe[src*="figma.com"]',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "iframe",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        allowfullscreen: "true",
        height: "450",
        width: "800",
      }),
    ];
  },
});
