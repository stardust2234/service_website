import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminCalculator from "@/components/AdminCalculator";
import PageMetadata from "@/components/PageMetadata";

const Tools = () => (
  <div className="min-h-screen bg-background">
    <PageMetadata title="Tools | Propel Up" description="Use the Propel Up admin calculator to estimate time spent on recurring business support tasks." path="/tools" />
    <Navbar />
    <main className="pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-6xl">
          <header className="mb-16 text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Useful tools for <span className="text-primary font-lora">busy owners.</span>
            </h1>
          </header>

          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-muted-foreground">
            Simple ways to get a clearer view of your time, your admin and the jobs that could be made lighter.
          </p>
          <AdminCalculator />
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Tools;
