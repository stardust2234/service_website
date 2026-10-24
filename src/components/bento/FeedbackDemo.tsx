import { useEffect, useState } from "react";
import { Check, MessageCircle } from "lucide-react";

const suggestions = [
  { icon: "⏱️", text: "Same day" },
  { icon: "✅", text: "You approve" },
];

const FeedbackDemo = () => {
  const [phase, setPhase] = useState(0);
  const [typedPrompt, setTypedPrompt] = useState("");
  const [showSuggestions, setShowSuggestions] = useState<number[]>([]);
  const [appliedSuggestion, setAppliedSuggestion] = useState<number | null>(null);
  const [hoveredSuggestion, setHoveredSuggestion] = useState<number | null>(null);
  const initialPrompt = "Overdue invoices piling up";
  const improvedPrompt = "Sorted: 3 reminders sent, 2 payments logged.";

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout> | undefined;
    const runAnimation = () => {
      if (phase === 0 || phase === 3) {
        const prompt = phase === 0 ? initialPrompt : improvedPrompt;
        let characterIndex = 0;
        const typeInterval = setInterval(() => {
          if (characterIndex <= prompt.length) {
            setTypedPrompt(prompt.slice(0, characterIndex));
            characterIndex += 1;
          } else {
            clearInterval(typeInterval);
            setPhase((current) => current + 1);
          }
        }, phase === 0 ? 50 : 25);
        return () => clearInterval(typeInterval);
      }

      if (phase === 1) {
        timeout = setTimeout(() => {
          setShowSuggestions([0, 1]);
          setPhase(2);
        }, 1800);
        return;
      }

      if (phase === 2) {
        timeout = setTimeout(() => {
          setAppliedSuggestion(1);
          setPhase(3);
        }, 1600);
        return;
      }

      timeout = setTimeout(() => {
        setPhase(0);
        setTypedPrompt("");
        setShowSuggestions([]);
        setAppliedSuggestion(null);
      }, 2500);
    };

    const cleanup = runAnimation();
    return () => {
      if (timeout) clearTimeout(timeout);
      cleanup?.();
    };
  }, [phase]);

  return (
    <div className="mt-auto pt-3">
      <div className="h-[80px] space-y-1.5 overflow-hidden">
        <div className="h-[44px] overflow-hidden rounded-lg border border-border/50 bg-background/50 p-2">
          <div className="flex items-start gap-2">
            <MessageCircle className="mt-0.5 h-3 w-3 flex-shrink-0 text-muted-foreground" />
            <code className={`line-clamp-2 break-all text-xs leading-snug transition-colors duration-300 ${phase >= 3 ? "text-primary" : "text-muted-foreground/90"}`}>
              {typedPrompt}<span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-primary/70" />
            </code>
          </div>
        </div>
        <div className="flex gap-1.5">
          {suggestions.map((suggestion, index) => (
            <div
              key={suggestion.text}
              className={`flex cursor-pointer items-center gap-1 rounded-full border px-2 py-0.5 text-xs transition-[transform,opacity,background,color,border-color] duration-300 ${showSuggestions.includes(index) ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${appliedSuggestion !== null && appliedSuggestion >= index ? "border-primary/30 bg-primary/20 text-primary" : "border-transparent bg-muted text-muted-foreground"} ${hoveredSuggestion === index ? "scale-105" : ""}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredSuggestion(index)}
              onMouseLeave={() => setHoveredSuggestion(null)}
            >
              <span>{suggestion.icon}</span><span>{suggestion.text}</span>
              {appliedSuggestion !== null && appliedSuggestion >= index && <Check className="h-2.5 w-2.5 animate-scale-in text-primary" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackDemo;
