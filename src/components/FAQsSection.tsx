import { useState } from "react";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    id: 1,
    question: "What tasks can you help me with?",
    answer: "Admin, customer support, invoicing, bookkeeping preparation, document organisation and the recurring jobs that keep interrupting your work.",
  },
  {
    id: 2,
    question: "Can I get occasional help?",
    answer: "Yes. One-off support is available with a minimum two-hour booking, so you can get help when you need it without committing to a regular package.",
  },
  {
    id: 3,
    question: "What if my records are behind?",
    answer: "That is exactly the kind of situation we can help untangle. We can agree a sensible starting point and work through the backlog in manageable steps.",
  },
  {
    id: 4,
    question: "How do I get started?",
    answer: "Book a free 20-minute introduction. We will talk through what is taking up your time and whether support would be useful.",
  },
];

interface AccordionButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const AccordionButton = ({ isOpen, onClick }: AccordionButtonProps) => (
  <button
    onClick={onClick}
    className={cn(
      "w-9 h-9 rounded-lg flex items-center justify-center",
      "bg-primary/10 border border-primary/30",
      "shadow-[0_2px_8px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
      "transition-all duration-200 ease-out",
      "hover:bg-primary/20 hover:border-primary/50 hover:shadow-[0_4px_12px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5",
      "active:translate-y-0 active:shadow-[0_1px_4px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)]",
      "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
    )}
    aria-expanded={isOpen}
    aria-label={isOpen ? "Collapse answer" : "Expand answer"}
  >
    {isOpen ? (
      <X className="w-4 h-4 text-primary transition-transform duration-200" />
    ) : (
      <Plus className="w-4 h-4 text-primary transition-transform duration-200" />
    )}
  </button>
);

const FAQsSection = () => {
  const [openFaqId, setOpenFaqId] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
            Frequently asked <span className="text-primary font-lora">questions</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Everything you need to know before getting started.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* FAQ Accordion */}
          <div className="space-y-3">
            {faqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              
              return (
                <div
                  key={faq.id}
                  className={cn(
                    "relative bg-card border border-border rounded-2xl overflow-hidden",
                    "transition-all duration-300 ease-out",
                    "group",
                    isOpen && "border-primary/30"
                  )}
                >
                  {/* Accordion Header */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className={cn(
                      "w-full p-4 sm:p-5 flex items-start gap-3 sm:gap-4 text-left",
                      "transition-colors duration-200",
                      "hover:bg-secondary/30 active:bg-secondary/40",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-inset",
                      "touch-manipulation"
                    )}
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${faq.id}`}
                  >
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        {faq.question}
                      </h3>
                    </div>
                    <div 
                      className="flex-shrink-0 mt-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <AccordionButton isOpen={isOpen} onClick={() => toggleFaq(faq.id)} />
                    </div>
                  </button>

                  {/* Accordion Content */}
                  <div
                    id={`faq-content-${faq.id}`}
                    className={cn(
                      "grid transition-all duration-300 ease-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 pb-5">
                        <div className="border-t border-border pt-4">
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQsSection;
