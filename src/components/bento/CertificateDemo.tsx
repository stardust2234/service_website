import { useEffect, useState } from "react";
import { Award, Check } from "lucide-react";

const options = ["One-off", "Weekly", "Monthly"];

const CertificateDemo = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [stamped, setStamped] = useState(false);

  useEffect(() => {
    const stampTimer = setTimeout(() => setStamped(true), 500);
    const optionsTimer = setTimeout(() => setShowOptions(true), 1000);
    const resetTimer = setTimeout(() => {
      setStamped(false);
      setShowOptions(false);
    }, 4500);

    return () => {
      clearTimeout(stampTimer);
      clearTimeout(optionsTimer);
      clearTimeout(resetTimer);
    };
  }, [stamped, showOptions]);

  return (
    <div className="mt-auto pt-3">
      <div className="h-[52px] overflow-visible">
        <div className="flex items-center gap-3">
          <div className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg border border-primary/50 transition-[transform,opacity] duration-300 ${stamped ? "scale-100" : "scale-90 opacity-50"}`}>
            <Award className={`h-6 w-6 text-primary transition-[transform] duration-500 ${stamped ? "rotate-0 scale-100" : "rotate-12 scale-50"}`} />
            {stamped && <div className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary"><Check className="h-2.5 w-2.5 text-primary-foreground" /></div>}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {options.map((option, index) => (
              <div key={option} className={`rounded bg-muted px-2 py-1 text-xs text-muted-foreground/90 transition-[transform,opacity] duration-300 ${showOptions ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`} style={{ transitionDelay: `${index * 100}ms` }}>
                {option}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CertificateDemo;
