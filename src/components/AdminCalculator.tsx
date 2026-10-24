import { useMemo, useState } from "react";

interface Task {
  name: string;
  hours: number | "";
}

const MAX_WEEKLY_HOURS = 35;
const MAX_MONTHLY_HOURS = 150;

const initialTasks: Task[] = [
  { name: "Email", hours: 3 },
  { name: "Scheduling", hours: 2 },
  { name: "Invoicing", hours: 2 },
  { name: "Bookkeeping", hours: 3 },
  { name: "Customer follow-up", hours: 2 },
];

const clampHours = (value: number, maximum = MAX_WEEKLY_HOURS) => Math.min(maximum, Math.max(0, Number(value) || 0));

const AdminCalculator = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const weeklyTotal = useMemo(
    () => tasks.reduce((total, task) => total + (Number(task.hours) || 0), 0),
    [tasks],
  );
  const monthlyTotal = Math.min(MAX_MONTHLY_HOURS, Math.round(weeklyTotal * 4.33));

  const updateHours = (index: number, value: number) => {
    setTasks((current) => {
      const otherTaskHours = current.reduce(
        (total, task, taskIndex) => taskIndex === index ? total : total + (Number(task.hours) || 0),
        0,
      );
      const remainingHours = Math.max(0, MAX_WEEKLY_HOURS - otherTaskHours);

      return current.map((task, taskIndex) => (
        taskIndex === index ? { ...task, hours: clampHours(value, remainingHours) } : task
      ));
    });
  };

  const handleInputChange = (index: number, value: string) => {
    if (value === "") {
      setTasks((current) => current.map((task, taskIndex) => (
        taskIndex === index ? { ...task, hours: "" } : task
      )));
      return;
    }

    updateHours(index, Number(value));
  };

  const resetCalculator = () => setTasks(initialTasks);

  return (
    <section className="mx-auto mt-16 max-w-5xl" aria-labelledby="calculator-title">
      <div className="mb-8 text-center">
        <h2 id="calculator-title" className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          How much time is hiding in your <span className="text-primary font-lora">admin?</span>
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Add up the hours you spend on regular business support tasks each week, up to {MAX_WEEKLY_HOURS} hours. The result shows what could potentially be freed up.
        </p>
      </div>

      <div className="grid overflow-hidden rounded-2xl border border-border bg-card shadow-sm lg:grid-cols-[1.2fr_.8fr]">
        <div className="grid gap-4 p-5 sm:grid-cols-2 md:p-8">
          {tasks.map((task, index) => (
            <div key={task.name}>
              <label className="mb-2 block text-sm font-medium text-foreground" htmlFor={`hours-${index}`}>
                {task.name}
              </label>
              <div className="flex items-center rounded-lg border border-border bg-background focus-within:border-primary">
                <input
                  id={`hours-${index}`}
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-foreground outline-none"
                  type="number"
                  min="0"
                  max={MAX_WEEKLY_HOURS}
                  step="0.5"
                  inputMode="decimal"
                  value={task.hours}
                  onChange={(event) => handleInputChange(index, event.target.value)}
                  onBlur={(event) => updateHours(index, Number(event.target.value) || 0)}
                />
                <span className="pr-3 text-sm text-muted-foreground">hrs</span>
              </div>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col justify-center bg-primary p-8 text-primary-foreground lg:p-10"
          aria-live="polite"
          aria-atomic="true"
        >
          <p className="text-sm opacity-80">You spend approximately</p>
          <strong className="mt-2 text-5xl tracking-tight">{weeklyTotal} <span className="text-xl font-normal">hours/week</span></strong>
          <p className="mt-2 opacity-80">on business support tasks, up to {MAX_WEEKLY_HOURS} hours/week.</p>
          <div className="mt-8 border-t border-primary-foreground/20 pt-6">
            That’s around <strong>{monthlyTotal} hours</strong> every month that could potentially be freed up.
          </div>
          <button
            type="button"
            className="mt-8 self-start rounded-lg border border-primary-foreground/40 px-4 py-2 text-sm font-medium transition-colors hover:bg-primary-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/70"
            onClick={resetCalculator}
          >
            Reset calculator
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminCalculator;
