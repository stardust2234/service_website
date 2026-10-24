import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import { Target, Award, Zap, BookOpen, Users, MessageSquare } from "lucide-react";
import BentoTile from "@/components/bento/BentoTile";
import ChecklistDemo from "@/components/bento/ChecklistDemo";
import TextMorphDemo from "@/components/bento/TextMorphDemo";
import CurriculumDemo from "@/components/bento/CurriculumDemo";
import CertificateDemo from "@/components/bento/CertificateDemo";
import FeedbackDemo from "@/components/bento/FeedbackDemo";
import CommunityDemo from "@/components/bento/CommunityDemo";

type BentoDemo = ComponentType;

interface Feature {
  area: string;
  span: "1x1" | "2x1";
  icon: LucideIcon;
  title: string;
  description: string;
  Demo: BentoDemo;
}

const features: Feature[] = [
  { area: "practical", span: "2x1", icon: Target, title: "Practical, not theoretical", description: "Get useful work done, not another complicated system to learn.", Demo: ChecklistDemo },
  { area: "guided", span: "1x1", icon: MessageSquare, title: "Built around your business", description: "Support starts with what is taking up your time right now.", Demo: FeedbackDemo },
  { area: "community", span: "1x1", icon: Users, title: "Clear communication", description: "Agree priorities, keep things visible and know what happens next.", Demo: CommunityDemo },
  { area: "industry", span: "1x1", icon: Award, title: "Flexible by design", description: "Use one-off help or create a regular rhythm that suits you.", Demo: CertificateDemo },
  { area: "learn", span: "2x1", icon: BookOpen, title: "Careful with details", description: "Your records, customers and business information are handled thoughtfully.", Demo: TextMorphDemo },
  { area: "current", span: "1x1", icon: Zap, title: "More room to move", description: "The goal is simple: less admin and more time for your actual work.", Demo: CurriculumDemo },
];

const FeatureCard = ({ feature, desktop = false }: { feature: Feature; desktop?: boolean }) => {
  const Icon = feature.icon;
  const Demo = feature.Demo;

  return (
    <BentoTile span={desktop ? feature.span : "1x1"} gridArea={desktop ? feature.area : undefined}>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </div>
      <h3 className="mb-1.5 font-display text-lg font-semibold leading-snug text-foreground">{feature.title}</h3>
      <p className="text-sm leading-relaxed text-muted-foreground/90">{feature.description}</p>
      <Demo />
    </BentoTile>
  );
};

const BentoGrid = () => (
  <div className="overflow-x-hidden">
    <div className="flex flex-col gap-4 md:hidden">
      {features.map((feature) => <FeatureCard key={feature.area} feature={feature} />)}
    </div>

    <div className="mx-auto hidden max-w-4xl grid-cols-2 items-stretch gap-4 md:grid lg:hidden">
      {features.map((feature) => <FeatureCard key={feature.area} feature={feature} />)}
    </div>

    <div
      className="mx-auto hidden max-w-6xl grid-cols-4 gap-4 lg:grid"
      style={{
        gridTemplateAreas: `
          "practical practical guided community"
          "industry learn learn current"
        `,
      }}
    >
      {features.map((feature) => <FeatureCard key={feature.area} feature={feature} desktop />)}
    </div>
  </div>
);

export default BentoGrid;
