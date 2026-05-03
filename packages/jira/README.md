# tiptap-extension-jira

[![Version](https://img.shields.io/npm/v/tiptap-extension-jira.svg)](https://www.npmjs.org/package/tiptap-extension-jira) [![CI](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml?query=branch%3Amain)

A collection of [Tiptap](https://tiptap.dev/) extensions that enable bidirectional sync with Jira. It works by introducing a series of Nodes and Marks unique to the Atlassian Document Format (ADF) that can be used to render Jira content in a TipTap document.

## Features

| Extension        | Type | ADF Node                                                                                 |
| ---------------- | ---- | ---------------------------------------------------------------------------------------- |
| Date             | Node | Undocumented                                                                             |
| Expand           | Node | Undocumented                                                                             |
| Inline Card      | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/inlineCard/      |
| Media            | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/media/           |
| Media Group      | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/mediaGroup/      |
| Media Single     | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/mediaSingle/     |
| Mention          | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/mention/         |
| Panel            | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/panel/           |
| Rule             | Node | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/rule/            |
| Status           | Node | Undocumented                                                                             |
| Undefined        | Node | Undocumented                                                                             |
| Background Color | Mark | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/backgroundColor/ |
| `em`             | Mark | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/em/              |
| `strong`         | Mark | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/strong/          |
| `subSup`         | Mark | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/subsup/          |
| `textColor`      | Mark | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/textColor/       |

You'll also need the following extensions from Tiptap to use this package:

| Extension    | Type | Tiptap Extension                                             | ADF Node                                                                              |
| ------------ | ---- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------- |
| Blockquote   | Node | https://tiptap.dev/docs/editor/extensions/nodes/blockquote   | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/blockquote/   |
| Bullet List  | Node | https://tiptap.dev/docs/editor/extensions/nodes/bullet-list  | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/bulletList/   |
| Code Block   | Node | https://tiptap.dev/docs/editor/extensions/nodes/code-block   | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/codeBlock/    |
| Emoji        | Node | https://tiptap.dev/docs/editor/extensions/nodes/emoji        | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/emoji/        |
| Hard Break   | Node | https://tiptap.dev/docs/editor/extensions/nodes/hard-break   | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/hardBreak/    |
| Heading      | Node | https://tiptap.dev/docs/editor/extensions/nodes/heading      | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/heading/      |
| List Item    | Node | https://tiptap.dev/docs/editor/extensions/nodes/list-item    | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/listItem/     |
| Ordered List | Node | https://tiptap.dev/docs/editor/extensions/nodes/ordered-list | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/orderedList/  |
| Paragraph    | Node | https://tiptap.dev/docs/editor/extensions/nodes/paragraph    | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/paragraph/    |
| Table        | Node | https://tiptap.dev/docs/editor/extensions/nodes/table        | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/table/        |
| Table Cell   | Node | https://tiptap.dev/docs/editor/extensions/nodes/table-cell   | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/table_cell/   |
| Table Header | Node | https://tiptap.dev/docs/editor/extensions/nodes/table-header | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/table_header/ |
| Table Row    | Node | https://tiptap.dev/docs/editor/extensions/nodes/table-row    | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/table_row/    |
| Text         | Node | https://tiptap.dev/docs/editor/extensions/nodes/text         | https://developer.atlassian.com/cloud/jira/platform/apis/document/nodes/text/         |
| Code         | Mark | https://tiptap.dev/docs/editor/extensions/marks/code         | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/code/         |
| Link         | Mark | https://tiptap.dev/docs/editor/extensions/marks/link         | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/link/         |
| Strike       | Mark | https://tiptap.dev/docs/editor/extensions/marks/strike       | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/strike/       |
| Underline    | Mark | https://tiptap.dev/docs/editor/extensions/marks/underline    | https://developer.atlassian.com/cloud/jira/platform/apis/document/marks/underline/    |

## Installation

```bash
pnpm add tiptap-extension-jira
```

## Usage

### Client

```ts
import { Jira } from "tiptap-extension-jira";

const editor = new Editor({
  extensions: [...Object.values(Jira)],
});
```

You can modify any of the extensions, for example:

```ts
import { Jira } from "tiptap-extension-jira";

const { Mention, ...rest } = Jira;

const mention = Jira.Mention.configure({
  suggestion: createMentionSuggestions(["Hayden", "Gavin", "Anna"]),
});

const editor = new Editor({
  extensions: [mention, ...Object.values(rest)],
});
```

I also recommend adding the following Tailwind CSS to your project:

```css
/* Panel */
div[data-panel-type] {
  @apply p-4 bg-muted rounded-md my-4;
}

div[data-panel-type] > *:last-child {
  @apply mb-0;
}

div[data-panel-type="info"] {
  @apply bg-sky-50 text-sky-800;
}

div[data-panel-type="note"] {
  @apply bg-indigo-50 text-indigo-800;
}

div[data-panel-type="success"] {
  @apply bg-emerald-50 text-emerald-800;
}

div[data-panel-type="warning"] {
  @apply bg-amber-50 text-amber-800;
}

div[data-panel-type="error"] {
  @apply bg-rose-50 text-rose-800;
}
```

### Server

If you are running this in a headless environment, you can use the Server extension instead:

```ts
import { Jira } from "tiptap-extension-jira/server";

const editor = new Editor({
  extensions: [...Object.values(Jira)],
});
```
