# tiptap-extension-figma

[![Version](https://img.shields.io/npm/v/tiptap-extension-figma.svg)](https://www.npmjs.org/package/tiptap-extension-figma) [![CI](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml?query=branch%3Amain)

![tiptap-extension-figma](./sample.png)

A [Tiptap](https://tiptap.dev/) extension for hydrating Figma designs in a TipTap document. It uses Figma's [Live Embed Kit](https://www.figma.com/developers/embed) to take matching URLs and render them in the editor as an iframe.

## Installation

```bash
pnpm add tiptap-extension-figma
```

## Usage

### Client

```ts
import { Figma } from 'tiptap-extension-figma';

const editor = new Editor({
  extensions: [Figma],
});
```

I also recommend adding the following Tailwind CSS to your project:

```css
.ProseMirror iframe[src*="figma.com"] {
  @apply w-full aspect-[4/3] shadow-sm my-8 rounded-md overflow-hidden;
}

.ProseMirror iframe[src*="figma.com"].ProseMirror-selectednode {
  @apply ring ring-primary;
}
```

### Server

If you are running this in a headless environment, you can use the Server extension instead:

```ts
import { Figma } from 'tiptap-extension-figma/server';

const editor = new Editor({
  extensions: [Figma],
});
```

This Node doesn't render anything in the editor, but it stop the Editor from crashing when it encounters a Node with the name `figma`.