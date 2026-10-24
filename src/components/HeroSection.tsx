import { BookingButton } from "@/components/BookingButton";
import HeroLightRays from "./HeroLightRays";
import { useScrollParallax } from "@/hooks/use-parallax";

const HeroSection = () => {
  const headlineParallax = useScrollParallax(0.08);
  const subheadlineParallax = useScrollParallax(0.05);

  return (
    <section className="relative flex flex-col md:min-h-screen">
      {/* Light rays background - rendered first, behind everything */}
      <HeroLightRays />
      

      {/* Hero Content */}
      <div className="container mx-auto px-4 md:px-6 py-28 relative z-10 flex-1 flex items-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 bg-secondary/50 backdrop-blur-md rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-8 opacity-0"
            style={{ animation: 'heroFadeIn 0.6s ease-out 0.2s forwards' }}
          >
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse flex-shrink-0" aria-hidden="true" />
            <span className="text-xs sm:text-sm text-foreground">
              Taking on new clients
            </span>
          </div>

          {/* Main Headline */}
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 xl:text-6xl opacity-0"
            style={{ 
              animation: 'heroFadeIn 0.7s ease-out 0.3s forwards',
              transform: `translateY(${headlineParallax}px)`,
            }}
          >
            Less admin.{" "}
            <span 
              className="text-primary font-lora inline-block"
              style={{
                animation: 'subtleGlow 3s ease-in-out infinite',
              }}
            >
              More space
            </span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            to move forward.
          </h1>

          {/* Subheadline */}
          <p 
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-12 opacity-0 px-2"
            style={{ 
              animation: 'heroFadeIn 0.6s ease-out 0.45s forwards',
              transform: `translateY(${subheadlineParallax}px)`,
            }}
          >
            Flexible business support for busy small businesses, from everyday
            admin and customer support to invoicing and bookkeeping.
          </p>

          {/* Primary CTA */}
          <div 
            className="flex flex-col items-center space-y-6 mb-4 opacity-0"
            style={{ animation: 'heroFadeIn 0.6s ease-out 0.65s forwards' }}
          >
            <BookingButton size="lg" label="Book a free call" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes subtleGlow {
          0%, 100% { 
            text-shadow: 0 0 0px hsl(var(--primary) / 0);
            filter: brightness(1);
          }
          50% { 
            text-shadow: 0 0 20px hsl(var(--primary) / 0.4);
            filter: brightness(1.1);
          }
        }
        @keyframes heroFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
