import { useEffect, useState } from "react";
import { Check, FileText } from "lucide-react";

const tasks = ["Sort inbox", "Update bookings", "Send invoices", "Chase payments"];

const ChecklistDemo = () => {
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showProject, setShowProject] = useState(false);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < tasks.length) {
        setCheckedItems((previous) => [...previous, currentIndex]);
        currentIndex += 1;
      } else if (currentIndex === tasks.length) {
        setShowProject(true);
        currentIndex += 1;
      } else {
        setCheckedItems([]);
        setShowProject(false);
        currentIndex = 0;
      }
    }, 700);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-auto pt-4">
      <div className="h-[120px] overflow-hidden md:h-[100px]">
        <div className="flex h-full items-end gap-3">
          <div className="flex-1 rounded-lg border border-border/50 bg-background/50 p-3">
            <div className="mb-2 text-xs uppercase tracking-widest text-muted-foreground/90">Progress</div>
            <div className="space-y-1.5">
              {tasks.map((task, index) => (
                <div key={task} className="flex items-center gap-2 text-xs">
                  <div className={`flex h-3.5 w-3.5 items-center justify-center rounded border transition-[background,border-color] duration-300 ${checkedItems.includes(index) ? "border-primary bg-primary" : "border-muted-foreground/60"}`}>
                    {checkedItems.includes(index) && <Check className="h-2 w-2 text-primary-foreground" />}
                  </div>
                  <span className={`transition-colors duration-300 ${checkedItems.includes(index) ? "text-foreground" : "text-muted-foreground"}`}>{task}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={`w-20 rounded-lg border border-border/50 bg-background/50 p-3 transition-[transform,opacity] duration-500 ${showProject ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <FileText className="mb-1 h-4 w-4 text-primary" />
            <div className="text-xs font-medium text-foreground">Done</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistDemo;
