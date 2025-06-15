import { ExerciseList } from "@/components/exercise-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Physical Exercises | SwaSakhi",
  description: "Find trimester-based exercises with progress tracking and personalized guidance.",
};

export default function PhysicalExercisesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Pregnancy Physical Exercise Guide</h1>
      <ExerciseList />
    </div>
  );
}
