import TiptapMention from "@tiptap/extension-mention";

export const Mention = TiptapMention.extend({
  addAttributes() {
    return {
      accessLevel: {
        default: "",
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        parseHTML: (element) => element.dataset.accessLevel,
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        renderHTML: (attributes) => {
          if (!attributes.accessLevel) {
            return {};
          }
          return { "data-access-level": attributes.accessLevel };
        },
      },
      id: {
        default: null,

        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        parseHTML: (element) => element.dataset.id,

        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return { "data-id": attributes.id };
        },
      },
      text: {
        default: null,

        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
        parseHTML: (element) => element.dataset.text,
        // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
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
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
  HTMLAttributes: {
    "data-type": "mention",
  },
  // biome-ignore lint/style/useNamingConvention: "This is a Tiptap property"
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
