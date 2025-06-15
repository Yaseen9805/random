import { EducateList } from "@/components/educate-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educate | SwaSakhi",
  description: "Learn about pregnancy, nutrition, vaccination, child care, and more.",
};

export default function EducatePage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">SwaSakhi Educate</h1>
      </div>
      <EducateList />
    </div>
  );
}
