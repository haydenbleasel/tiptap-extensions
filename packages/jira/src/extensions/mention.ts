import TiptapMention from "@tiptap/extension-mention";

export const Mention = TiptapMention.extend({
  addAttributes() {
    return {
      accessLevel: {
        default: "",
        parseHTML: (element) => element.dataset.accessLevel,
        renderHTML: (attributes) => {
          if (!attributes.accessLevel) {
            return {};
          }
          return { "data-access-level": attributes.accessLevel };
        },
      },
      id: {
        default: null,

        parseHTML: (element) => element.dataset.id,

        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return { "data-id": attributes.id };
        },
      },
      text: {
        default: null,

        parseHTML: (element) => element.dataset.text,
        renderHTML: (attributes) => {
          if (!attributes.text) {
            return {};
          }
          return { "data-text": attributes.text };
        },
      },
    };
  },

  name: "mention",
}).configure({
  HTMLAttributes: {
    "data-type": "mention",
  },
  renderHTML({ options, node }) {
    if (node.attrs.text) {
      return node.attrs.text;
    }

    return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
  },
  renderText({ options, node }) {
    if (node.attrs.text) {
      return node.attrs.text;
    }

    return `${options.suggestion.char}${node.attrs.label ?? node.attrs.id}`;
  },
});
