import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { articles } from "@/config/articles";
import PageMetadata from "@/components/PageMetadata";

const formatArticleDate = (date?: string) => {
  if (!date) return null;

  const parsedDate = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsedDate.getTime())) return date;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(parsedDate);
};

const Articles = () => (
  <div className="min-h-screen bg-background">
    <PageMetadata title="Articles | Propel Up" description="Practical guidance about business administration, bookkeeping and delegation for busy business owners." path="/articles" />
    <Navbar />
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Practical notes for  <span className="text-primary font-lora">busy owners.</span>
            </h1>
          </header>

          <div className="grid gap-5 md:grid-cols-3">
            {articles.map((article) => (
              <article key={article.slug} className="group flex min-h-72 flex-col rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg">
                <span className="text-sm font-medium text-primary">{article.number}</span>
                <h2 className="mt-12 text-xl font-semibold leading-snug text-foreground">{article.title}</h2>
                {(article.publishedDate || article.updatedDate) && (
                  <p className="mt-4 text-xs text-muted-foreground">
                    {article.updatedDate
                      ? `Updated ${formatArticleDate(article.updatedDate)}`
                      : `Published ${formatArticleDate(article.publishedDate)}`}
                  </p>
                )}
                <Link className="mt-auto pt-8 text-sm font-medium text-muted-foreground transition-colors group-hover:text-primary" to={`/articles/${article.slug}`}>
                  Read article <span aria-hidden="true">↗</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Articles;
