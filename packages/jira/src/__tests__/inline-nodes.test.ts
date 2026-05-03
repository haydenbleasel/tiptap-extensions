import { describe, expect, test } from "bun:test";

import { DateNode } from "../extensions/date";
import { InlineCard } from "../extensions/inline-card";
import { Status } from "../extensions/status";
import { UndefinedNode } from "../extensions/undefined";
import {
  buildSchema,
  findNode,
  parseHTMLToDoc,
  renderNodeToHTML,
} from "./helpers";

describe("DateNode", () => {
  const schema = buildSchema([DateNode]);

  test("registers an inline atom `date` node with a `timestamp` attr", () => {
    const node = schema.nodes.date;
    expect(node).toBeDefined();
    expect(node.isInline).toBe(true);
    expect(node.isAtom).toBe(true);
    expect(node.spec.attrs?.timestamp).toEqual({ default: null });
  });

  test('renders a `<time data-type="date" datetime=...>` with a localized date string', () => {
    const ts = Date.UTC(2024, 0, 15);
    const html = renderNodeToHTML(schema, "date", { timestamp: String(ts) });
    expect(html).toContain('data-type="date"');
    expect(html).toContain(`datetime="${ts}"`);
    expect(html.startsWith("<time")).toBe(true);
  });

  test('parses `<time data-type="date">` back into a date node', () => {
    const doc = parseHTMLToDoc(
      '<p><time data-type="date" datetime="123"></time></p>',
      schema
    );
    expect(findNode(doc, "date")).toHaveLength(1);
  });
});

describe("InlineCard", () => {
  const schema = buildSchema([InlineCard]);

  test("registers an inline atom `inlineCard` node with a `url` attr", () => {
    const node = schema.nodes.inlineCard;
    expect(node).toBeDefined();
    expect(node.isInline).toBe(true);
    expect(node.isAtom).toBe(true);
    expect(node.spec.attrs?.url).toEqual({ default: null });
  });

  test("renders to an anchor with data-type and url text content", () => {
    const html = renderNodeToHTML(schema, "inlineCard", {
      url: "https://jira.atlassian.com/browse/X-1",
    });
    expect(html).toContain('data-type="inlineCard"');
    expect(html.startsWith("<a")).toBe(true);
    expect(html).toContain("https://jira.atlassian.com/browse/X-1");
  });

  test('parses `<a data-type="inlineCard">` back into an inlineCard node', () => {
    const doc = parseHTMLToDoc(
      '<p><a data-type="inlineCard">x</a></p>',
      schema
    );
    expect(findNode(doc, "inlineCard")).toHaveLength(1);
  });
});

describe("Status", () => {
  const schema = buildSchema([Status]);

  test("registers an inline atom `status` node with color/style/text/localId attrs", () => {
    const node = schema.nodes.status;
    expect(node).toBeDefined();
    expect(node.isInline).toBe(true);
    expect(node.isAtom).toBe(true);
    const attrs = node.spec.attrs as Record<string, { default: unknown }>;
    expect(attrs.color.default).toBeNull();
    expect(attrs.localId.default).toBeNull();
    expect(attrs.style.default).toBe("");
    expect(attrs.text.default).toBeNull();
  });

  test('renders to `<span data-type="status">` with colored style and text content', () => {
    const html = renderNodeToHTML(schema, "status", {
      color: "red",
      text: "Open",
    });
    expect(html).toContain('data-type="status"');
    expect(html).toContain("color: red");
    expect(html).toContain("Open");
  });

  test('parses `<span data-type="status">` back into a status node', () => {
    const doc = parseHTMLToDoc(
      '<p><span data-type="status">In Progress</span></p>',
      schema
    );
    expect(findNode(doc, "status")).toHaveLength(1);
  });
});

describe("UndefinedNode", () => {
  const schema = buildSchema([UndefinedNode]);

  test("registers an inline atom `undefined` node", () => {
    const node = schema.nodes.undefined;
    expect(node).toBeDefined();
    expect(node.isInline).toBe(true);
    expect(node.isAtom).toBe(true);
  });

  test('renders to a `<span data-type="undefined">` placeholder', () => {
    const html = renderNodeToHTML(schema, "undefined");
    expect(html).toContain('data-type="undefined"');
    expect(html.startsWith("<span")).toBe(true);
  });

  test('parses `<span data-type="undefined">` back', () => {
    const doc = parseHTMLToDoc(
      '<p><span data-type="undefined"></span></p>',
      schema
    );
    expect(findNode(doc, "undefined")).toHaveLength(1);
  });
});
