# tiptap-extensions

[![CI](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/haydenbleasel/tiptap-extensions/actions/workflows/ci.yml?query=branch%3Amain)

A collection of [Tiptap](https://tiptap.dev/) extensions, versioned and released independently.

## Packages

| Package                                            | Version                                                                                                                       | Description                        |
| -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| [`tiptap-extension-iframely`](./packages/iframely) | [![npm](https://img.shields.io/npm/v/tiptap-extension-iframely.svg)](https://www.npmjs.com/package/tiptap-extension-iframely) | Embedded content via Iframely      |
| [`tiptap-extension-figma`](./packages/figma)       | [![npm](https://img.shields.io/npm/v/tiptap-extension-figma.svg)](https://www.npmjs.com/package/tiptap-extension-figma)       | Hydrate Figma links into embeds    |
| [`tiptap-extension-jira`](./packages/jira)         | [![npm](https://img.shields.io/npm/v/tiptap-extension-jira.svg)](https://www.npmjs.com/package/tiptap-extension-jira)         | Bidirectional sync with Jira (ADF) |

## Development

```bash
bun install
bun run build       # build all packages
bun run dev         # watch all packages
bun run typecheck   # check types
bun run check       # check linting / formatting
```

## Releasing

This repo uses [Changesets](https://github.com/changesets/changesets). After making a change:

```bash
bun run changeset   # describe the change + select bump
git commit -am "..." && git push
```

On merge to `main`, a "Version Packages" PR opens. Merging it publishes the affected packages to npm.
