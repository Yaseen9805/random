import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, HeartPulse } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
// Removed Image import as it's no longer used directly in CardContent for placeholders

export const metadata: Metadata = {
  title: "Exercises & Well-being | SwaSakhi",
  description: "Access physical exercises and mental well-being programs.",
};

export default function ExercisesWellbeingHubPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Exercises & Well-being</h1>
      <p className="text-lg text-foreground/80 mb-12 text-center max-w-2xl mx-auto">
        Explore programs tailored for your physical and mental wellness during and after pregnancy.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-7 w-7 text-primary" />
              Physical Exercises
            </CardTitle>
            <CardDescription>Trimester-based workouts to stay active and healthy.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <HeartPulse className="h-16 w-16 text-primary mb-4" />
            <p className="mt-4 text-foreground/80 text-center">
              Find safe and effective exercises for each stage of your pregnancy, designed to support your changing body.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/exercises-wellbeing/physical">View Physical Exercises</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-7 w-7 text-primary" />
              Mental Well-being
            </CardTitle>
            <CardDescription>Guidance for managing stress, anxiety, and postpartum emotions.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Brain className="h-16 w-16 text-primary mb-4" />
            <p className="mt-4 text-foreground/80 text-center">
              Access resources, tips, and techniques for emotional balance and mental strength during motherhood.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/exercises-wellbeing/mental">Explore Mental Well-being</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
