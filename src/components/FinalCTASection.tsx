import { useRef, useEffect, useState } from "react";
import { BookingButton } from "@/components/BookingButton";

const benefits = [
  "A relaxed 20-minute introduction",
  "A clear view of where support could help",
  "No pressure and no obligation"
];

const FinalCTASection = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for fade-in animation
  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(contentRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-background pt-12 pb-[50px] md:pt-20">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80%] animate-glow-breathe"
        style={{
          background: `radial-gradient(
            ellipse 90% 100% at 50% 100%,
            hsl(24 95% 55% / 0.6) 0%,
            hsl(24 95% 50% / 0.35) 25%,
            hsl(24 95% 45% / 0.15) 50%,
            transparent 75%
          )`,
        }}
      />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div 
            ref={contentRef}
            className={`grid md:grid-cols-2 gap-8 md:gap-12 items-center transition-all duration-700 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Left column - Headline and CTA */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight mb-3 sm:mb-4">
                Let’s get the{" "}
                <span className="text-primary font-lora">weight off.</span>
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-5 sm:mb-6">
                Book a free 20-minute introductory conversation and tell me
                what’s taking up too much of your time.
              </p>

              <BookingButton
                size="lg"
                fullWidthMobile
                label="Book your free call"
              />
            </div>

            {/* Right column - Benefits list */}
            <div className="space-y-2 sm:space-y-3">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-center gap-2 sm:gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full border border-primary/50 flex items-center justify-center">
                    <svg 
                      className="w-3 h-3 text-primary" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2.5}
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-sm sm:text-base text-foreground">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FinalCTASection;
