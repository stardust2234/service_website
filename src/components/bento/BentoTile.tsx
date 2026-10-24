import type { ReactNode } from "react";

interface BentoTileProps {
  children: ReactNode;
  className?: string;
  span?: "1x1" | "2x1" | "1x2" | "2x2";
  gridArea?: string;
}

const BentoTile = ({ children, className = "", span = "1x1", gridArea }: BentoTileProps) => {
  const spanClasses = {
    "1x1": "",
    "2x1": "lg:col-span-2",
    "1x2": "lg:row-span-2",
    "2x2": "lg:col-span-2 lg:row-span-2",
  };

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-5 transition-[transform,opacity] duration-300 md:min-h-[280px] lg:min-h-0 ${spanClasses[span]} ${className}`}
      style={gridArea ? { gridArea } : undefined}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,hsl(var(--primary)/0.08)_0%,transparent_70%)]" />
        <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_20px_hsl(var(--primary)/0.06),inset_0_1px_0_hsl(var(--primary)/0.1)]" />
      </div>
      <div className="relative z-10 flex h-full flex-col">{children}</div>
    </div>
  );
};

export default BentoTile;
