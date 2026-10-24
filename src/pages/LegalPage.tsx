import { marked } from "marked";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/data";
import { legalDocuments, type LegalDocument } from "@/config/legal";
import PageMetadata from "@/components/PageMetadata";

interface LegalPageProps {
  documentKey: keyof typeof legalDocuments;
}

const placeholders: Record<string, string> = {
  businessName: siteConfig.businessName,
  businessEmail: siteConfig.businessEmail,
  websiteUrl: siteConfig.websiteUrl,
  ownerName: siteConfig.ownerName,
  location: siteConfig.location,
};

function renderContent(content: string) {
  const resolved = content.replace(/\{\{(\w+)\}\}/g, (_, key: string) => placeholders[key] ?? `{{${key}}}`);
  return marked.parse(resolved);
}

const LegalPage = ({ documentKey }: LegalPageProps) => {
  const document: LegalDocument = legalDocuments[documentKey];
  const path = `/${documentKey === "cookies" ? "cookie-policy" : documentKey === "privacy" ? "privacy-policy" : "terms"}`;

  return (
  <div className="min-h-screen bg-background">
    <PageMetadata title={`${document.title} | Propel Up`} description={`Read the Propel Up ${document.title.toLowerCase()} and learn how it applies to this website and its services.`} path={path} />
    <Navbar />
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 text-center">
            <p className="mb-4 text-sm text-muted-foreground">Last updated — {document.lastUpdated}</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              {document.title}
            </h1>
          </header>
          <div
            className="article-content legal-content mx-auto max-w-3xl"
            dangerouslySetInnerHTML={{ __html: renderContent(document.content) }}
          />
        </div>
      </div>
    </main>
    <Footer />
  </div>
  );
};

export default LegalPage;
