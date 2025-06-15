import { DueDateCalculatorForm } from "@/components/due-date-calculator-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Due Date Calculator | SwaSakhi",
  description: "Estimate your baby's due date.",
};

export default function DueDateCalculatorPage() {
  return (
    <div className="container mx-auto py-8">
       <h1 className="text-3xl font-bold mb-8 text-center">Due Date Calculator</h1>
      <DueDateCalculatorForm />
    </div>
  );
}
