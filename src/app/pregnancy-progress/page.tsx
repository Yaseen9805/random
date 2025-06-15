import { PregnancyProgressDisplay } from "@/components/pregnancy-progress-display";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Weekly Pregnancy Progress | SwaSakhi",
  description: "Track your baby's development and your body's changes week by week.",
};

export default function PregnancyProgressPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Weekly Pregnancy Journey</h1>
      <PregnancyProgressDisplay />
    </div>
  );
}
