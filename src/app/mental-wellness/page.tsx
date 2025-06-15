// This page's content is being moved to /exercises-wellbeing/mental/page.tsx
// This file can be removed or updated to redirect if no longer needed.
// For now, it will serve as a placeholder.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mental Wellness Hub | SwaSakhi",
  description: "Expert advice, daily tips, and resources for managing mental health during and after pregnancy.",
};

export default function MentalWellnessPageRedirect() {
  return (
    <div className="container mx-auto py-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Content Moved</h1>
      <p className="text-lg mb-6">
        The Mental Wellness Hub content has been integrated into our new "Exercises & Well-being" section.
      </p>
      <Link href="/exercises-wellbeing/mental" className="text-primary hover:underline font-semibold">
        Go to Mental Well-being
      </Link>
    </div>
  );
}
