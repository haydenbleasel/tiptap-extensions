# tiptap-extension-iframely

[![Version](https://img.shields.io/npm/v/tiptap-extension-iframely.svg)](https://www.npmjs.org/package/tiptap-extension-iframely) [![CI](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml?query=branch%3Amain)

A [Tiptap](https://tiptap.dev/) extension for adding embedded content with Iframely.

## Installation

```bash
bun add tiptap-extension-iframely
```

## Usage

### Client

First, add Iframely's [embedjs](https://iframely.com/docs/embedjs) to your project e.g.

```html
<script async src="//cdn.iframe.ly/embed.js?api_key={API_KEY}"></script>
```

Then, add the extension to your editor:

```ts
import { Iframely } from "tiptap-extension-iframely";

const editor = new Editor({
  extensions: [Iframely],
});
```

Once it's installed, you can add a new Iframely node with:

```ts
const src = ""; // The URL you want to embed!

editor.chain().focus().deleteRange(range).setIframelyEmbed({ src }).run();
```

I also recommend adding the following Tailwind CSS to your project:

```css
.node-iframely.ProseMirror-selectednode {
  @apply ring ring-primary;
}
```

### Server

If you are running this in a headless environment, you can use the Server extension instead:

```ts
import { Iframely } from "tiptap-extension-iframely/server";

const editor = new Editor({
  extensions: [Iframely],
});
```

This Node doesn't render anything in the editor, but it stop the Editor from crashing when it encounters a Node with the name `iframely`.
