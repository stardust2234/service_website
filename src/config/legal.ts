export type LegalDocument = {
  title: string;
  lastUpdated: string;
  content: string;
};

const legalFiles = import.meta.glob("../content/legal/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseDocument(source: string): LegalDocument {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);
  const metadata = Object.fromEntries(
    (match?.[1] ?? "")
      .split("\n")
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter((entry): entry is RegExpMatchArray => entry !== null)
      .map(([, key, value]) => [key, value.replace(/^['"]|['"]$/g, "").trim()]),
  ) as Partial<LegalDocument>;

  if (!metadata.title || !metadata.lastUpdated || !match) {
    throw new Error("Legal Markdown is missing title or lastUpdated frontmatter");
  }

  return {
    title: metadata.title,
    lastUpdated: metadata.lastUpdated,
    content: source.slice(match[0].length).trim(),
  };
}

const documents = Object.fromEntries(
  Object.entries(legalFiles).map(([path, source]) => [
    path.split("/").pop()!.replace(".md", ""),
    parseDocument(source),
  ]),
) as Record<string, LegalDocument>;

export const legalDocuments = {
  cookies: documents.cookies,
  privacy: documents.privacy,
  terms: documents.terms,
} as const;
