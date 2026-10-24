type ArticleFrontmatter = {
  number: string;
  title: string;
  published: string;
};

export type Article = ArticleFrontmatter & {
  slug: string;
  content: string;
};

const articleFiles = import.meta.glob("../content/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

function parseFrontmatter(source: string): { data: Partial<ArticleFrontmatter>; content: string } {
  const match = source.match(/^---\s*\n([\s\S]*?)\n---\s*\n?/);

  if (!match) {
    return { data: {}, content: source };
  }

  const data = Object.fromEntries(
    match[1]
      .split("\n")
      .map((line) => line.match(/^([\w-]+):\s*(.*)$/))
      .filter((entry): entry is RegExpMatchArray => entry !== null)
      .map(([, key, value]) => [key, value.replace(/^['"]|['"]$/g, "").trim()]),
  );

  return {
    data,
    content: source.slice(match[0].length).trim(),
  };
}

function slugFromPath(path: string) {
  return path
    .split("/")
    .pop()!
    .replace(/\.md$/, "")
    .replace(/^\d+\./, "");
}

export const articles: Article[] = Object.entries(articleFiles)
  .map(([path, source]) => {
    const { data, content } = parseFrontmatter(source);

    // Draft/placeholder files are not included until they have metadata.
    if (!data.number || !data.title || data.published !== "true") return null;

    return {
      number: data.number,
      title: data.title,
      slug: slugFromPath(path),
      content,
    };
  })
  .filter((article): article is Article => article !== null)
  .sort((first, second) => first.number.localeCompare(second.number));
