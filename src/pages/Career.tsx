import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteConfig } from "@/config/data";
import PageMetadata from "@/components/PageMetadata";

const Career = () => (
  <div className="min-h-screen bg-background">
    <PageMetadata title="Careers | Propel Up" description="Work with Propel Up to make business administration lighter for busy small businesses." path="/career" />
    <Navbar />
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Help make work <span className="text-primary font-lora">lighter.</span>
            </h1>
          </header>

          <div className="mx-auto max-w-3xl space-y-12 text-muted-foreground leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Working with us</h2>
              <p>{siteConfig.businessName} provides thoughtful administrative, bookkeeping and virtual business support to busy small businesses.</p>
              <p>We are always interested in hearing from organised, reliable people who enjoy making things clearer and helping business owners stay on top of the details.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">What matters to us</h2>
              <ul className="list-disc space-y-2 pl-5">
                <li>Clear, kind and dependable communication.</li>
                <li>Careful handling of client information and records.</li>
                <li>Practical solutions instead of unnecessary complexity.</li>
                <li>Taking ownership while knowing when to ask questions.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Interested?</h2>
              <p>There are no current vacancies listed, but you are welcome to introduce yourself and tell us about your experience.</p>
              <a className="inline-flex rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90" href={`mailto:${siteConfig.businessEmail}`}>
                Get in touch <span className="ml-2" aria-hidden="true">↗</span>
              </a>
            </section>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Career;
