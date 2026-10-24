import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

const days = ["Mon", "Tue", "Wed", "Thu"];

const CurriculumDemo = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setProgress((previous) => previous >= 100 ? 0 : previous + 3), 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-auto pt-3">
      <div className="h-[60px] space-y-2 overflow-hidden">
        <div className="relative inline-block">
          <div className="flex items-center gap-1.5 rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary"><Clock className="h-3 w-3" />This week</div>
          <div className="absolute inset-0 animate-ping rounded bg-primary/30 opacity-75" style={{ animationDuration: "2s" }} />
        </div>
        <div className="flex items-center gap-1">
          {days.map((day, index) => (
            <div key={day} className="flex flex-1 flex-col items-center">
              <div className={`h-1 w-full rounded-full transition-[background] duration-300 ${progress > index * 25 ? "bg-primary" : "bg-muted"}`} />
              <span className="mt-1 text-xs text-muted-foreground/80">{day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurriculumDemo;
