import { useState } from "react";
import { CheckCircle2, Plus, X } from "lucide-react";
import { BookingButton } from "@/components/BookingButton";
import { cn } from "@/lib/utils";

const services = [
  {
    id: "productivity",
    eyebrow: "Make room",
    title: "Productivity & delegation",
    summary:
      "Move the jobs that keep interrupting your best work off your plate and into capable hands.",
    points: [
      "Inbox and calendar triage",
      "Follow-ups and recurring tasks",
      "Research, data entry and light project support",
    ],
  },
  {
    id: "systems",
    eyebrow: "Keep things organised",
    title: "Admin & systems",
    summary:
      "Create simple, reliable ways of working so information is easy to find and nothing gets missed.",
    points: [
      "Customer records and CRM updates",
      "Document templates and file organisation",
      "Practical workflows for everyday admin",
    ],
  },
  {
    id: "bookkeeping",
    eyebrow: "Know your numbers",
    title: "Bookkeeping",
    summary:
      "Stay on top of the financial admin and get a clearer view of how your business is doing.",
    points: [
      "Invoices, bills and expense tracking",
      "Bank reconciliations and record keeping",
      "Accounts information prepared for your accountant",
    ],
  },
];

const ServicesSection = () => {
  const [openServiceId, setOpenServiceId] = useState<string | null>(null);

  const toggleService = (id: string) => {
    setOpenServiceId((currentId) => currentId === id ? null : id);
  };

  return (
    <section id="services" className="py-16 sm:py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 max-w-6xl mx-auto">
          {/* Left Column - Title & Description */}
          <div className="lg:sticky lg:top-32 lg:self-start space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Support that makes <span className="text-primary font-lora">room.</span>
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Three ways to work together. Start with one job that needs
                finishing, or build a regular rhythm that keeps admin under
                control.
              </p>
            </div>

            {/* CTA Button */}
            <BookingButton
              size="lg"
              fullWidthMobile
              label="Book a free call"
            />
          </div>

          {/* Right Column - Service Cards */}
          <div className="space-y-3">
            {services.map((service) => (
              <div
                key={service.title}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 ease-out",
                  "hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)] active:translate-y-0 active:shadow-[0_4px_15px_rgba(0,0,0,0.25)]",
                  openServiceId === service.id && "border-primary/30",
                )}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="absolute inset-[-100%] bg-[linear-gradient(90deg,transparent_0%,transparent_40%,hsl(var(--primary)/0.12)_50%,transparent_60%,transparent_100%)] animate-shimmer" />
                </div>

                <div className="relative p-5 sm:p-6">
                  <div className="mb-3 inline-block rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                    {service.eyebrow}
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleService(service.id)}
                    className="flex w-full items-center justify-between gap-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset"
                    aria-expanded={openServiceId === service.id}
                    aria-controls={`service-content-${service.id}`}
                  >
                    <h3 className="text-base font-semibold text-foreground md:text-lg">{service.title}</h3>
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary transition-colors hover:bg-primary/20">
                      {openServiceId === service.id ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
                    </span>
                  </button>

                  <div
                    id={`service-content-${service.id}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      openServiceId === service.id ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="pt-4">
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
                        <ul className="space-y-2.5 border-t border-border pt-4">
                          {service.points.map((point) => (
                            <li key={point} className="flex items-start gap-2.5">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                              <span className="text-sm text-foreground">{point}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
