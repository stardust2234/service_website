import { useEffect } from "react";
import { siteConfig } from "@/config/data";

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  robots?: string;
}

const upsertMeta = (attribute: "name" | "property", key: string, content: string) => {
  let element = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
};

const PageMetadata = ({ title, description, path, type = "website", robots = "index,follow" }: PageMetadataProps) => {
  useEffect(() => {
    const canonical = new URL(path, `${siteConfig.websiteUrl.replace(/\/$/, "")}/`).toString();

    document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", robots);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    let link = document.head.querySelector<HTMLLinkElement>("link[rel=canonical]");
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [description, path, robots, title, type]);

  return null;
};

export default PageMetadata;
