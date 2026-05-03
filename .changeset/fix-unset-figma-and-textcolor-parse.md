---
"tiptap-extension-figma": patch
"tiptap-extension-jira": patch
---

Fix `unsetFigma` deleting an invalid range (`to: -1`) — now removes the figma node from the document. Fix `TextColor` mark not capturing the `color` attribute on parse — value is now read in the parse rule's `getAttrs` (per-attribute `parseHTML` is skipped by Tiptap for style-match parse rules).
