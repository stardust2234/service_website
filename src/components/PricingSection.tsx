import { CheckCircle2 } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";

const oneOffFeatures = [
  "Minimum two-hour booking",
  "Agree the task in advance",
  "Useful for occasional support"
];

const ongoingFeatures = [
  "A regular support arrangement",
  "Prioritised recurring tasks",
  "A simple monthly review"
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-12 md:py-20">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3">
            Choose what <span className="text-primary font-lora">works</span> for you.
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start small, get help with one thing, or create a regular rhythm that
            keeps admin under control.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {/* One-off support - Primary */}
          <div className="group bg-card border-2 border-primary rounded-2xl p-6 md:p-7 relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out shadow-[0_0_30px_-5px_hsl(var(--primary)/0.3)] hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3),0_0_40px_-5px_hsl(var(--primary)/0.4)]">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-100%] bg-[linear-gradient(90deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.15)_50%,transparent_60%,transparent_100%)] animate-shimmer" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Plan name */}
              <div className="text-sm font-medium text-primary mb-3">
                One-off support
              </div>

              {/* Price Block */}
              <div className="mb-4 h-[90px]">
                <div className="mb-1 flex items-baseline gap-2">
                  <span className="text-sm text-muted-foreground font-medium">
                    From
                  </span>
                  <span className="text-4xl md:text-5xl font-bold text-foreground font-lora">
                    £18
                  </span>
                  <span className="text-lg text-muted-foreground font-medium">
                    / hour
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  For a focused backlog or a job that needs finishing.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-5 flex-1">
                {oneOffFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <BookingButton size="lg" fullWidth label="Talk through this option" />
              </div>
            </div>
          </div>

          {/* Ongoing support - Secondary */}
          <div className="group bg-card border border-border rounded-2xl p-6 md:p-7 relative overflow-hidden flex flex-col transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]">
            {/* Shimmer overlay */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute inset-[-100%] bg-[linear-gradient(90deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.12)_50%,transparent_60%,transparent_100%)] animate-shimmer" />
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Plan name */}
              <div className="text-sm font-medium text-muted-foreground mb-3">
                Ongoing support
              </div>

              {/* Price Block */}
              <div className="mb-4 h-[90px]">
                <div className="mb-1">
                  <span className="text-4xl md:text-5xl font-bold text-foreground font-lora">
                    Tailored to you
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  A dependable extra pair of hands for your regular admin.
                </p>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-5 flex-1">
                {ongoingFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <div className="mt-auto">
                <BookingButton size="lg" fullWidth label="Talk through this option" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
