import { Link, useParams } from "react-router-dom";
import { marked } from "marked";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookingButton } from "@/components/BookingButton";
import PageMetadata from "@/components/PageMetadata";
import { articles } from "@/config/articles";

const Article = () => {
  const { slug } = useParams();
  const article = articles.find((item) => item.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <PageMetadata title="Article not found | Propel Up" description="The requested article could not be found." path={`/articles/${slug ?? ""}`} robots="noindex,follow" />
        <Navbar />
        <main className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold text-foreground">Article not found</h1>
          <Link className="mt-8 inline-flex text-primary hover:underline" to="/articles">Back to articles</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PageMetadata title={`${article.title} | Propel Up`} description={article.title} path={`/articles/${article.slug}`} type="article" />
      <Navbar />
      <main className="pt-28 pb-24">
        <article className="container mx-auto max-w-4xl px-4 md:px-6">
          <Link className="text-sm text-muted-foreground transition-colors hover:text-foreground" to="/articles">
            ← All articles
          </Link>
          <header className="mb-12 mt-10 border-b border-border pb-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-wider text-primary">Article {article.number}</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{article.title}</h1>
          </header>
          <div className="article-content" dangerouslySetInnerHTML={{ __html: marked.parse(article.content) }} />
          <div className="mt-16 border-t border-border pt-8">
            <p className="mb-5 text-muted-foreground">Need a hand with the admin behind your business?</p>
            <div className="flex flex-wrap items-center gap-4">
              <BookingButton label="Book a free introduction" />
              <Link className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline" to="/tools">
                Try the Admin calculator <span className="ml-1" aria-hidden="true"></span>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

export default Article;
