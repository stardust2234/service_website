import { useEffect, useState } from "react";

const TextMorphDemo = () => {
  const [showAfter, setShowAfter] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => setShowAfter((previous) => !previous), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-auto pt-3">
      <div className="h-[72px] overflow-hidden">
        <div className="h-full rounded-lg border border-border/50 bg-background/50 p-3">
          <div className="mb-2 flex items-center gap-2">
            <div className={`rounded px-2 py-0.5 text-xs transition-[background,color] duration-300 ${!showAfter ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>Before</div>
            <div className={`rounded px-2 py-0.5 text-xs transition-[background,color] duration-300 ${showAfter ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>After</div>
          </div>
          <div className="relative h-10 overflow-hidden">
            <div className={`absolute inset-0 transition-[transform,opacity] duration-500 ${!showAfter ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}><code className="text-xs text-muted-foreground">Client hours in three places</code></div>
            <div className={`absolute inset-0 transition-[transform,opacity] duration-500 ${showAfter ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}><code className="text-xs text-primary">One clear invoice, ready to send</code></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TextMorphDemo;
