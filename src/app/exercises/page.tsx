// This file is being replaced by /exercises-wellbeing/page.tsx
// Content will be migrated or refactored.
// This file can be deleted after migration is complete if it's no longer directly routed.
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader,CardFooter, CardTitle } from "@/components/ui/card";
import { Brain, HeartPulse } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <HeartPulse className="h-7 w-7 text-primary" />
              Physical Exercises
            </CardTitle>
            <CardDescription>Trimester-based workouts to stay active and healthy.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Physical Exercises"
              width={600}
              height={400}
              className="rounded-md object-cover aspect-video"
              data-ai-hint="woman yoga park"
            />
            <p className="mt-4 text-foreground/80">
              Find safe and effective exercises for each stage of your pregnancy, designed to support your changing body.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/exercises-wellbeing/physical">View Physical Exercises</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-7 w-7 text-primary" />
              Mental Well-being
            </CardTitle>
            <CardDescription>Guidance for managing stress, anxiety, and postpartum emotions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Image
              src="https://placehold.co/600x400.png"
              alt="Mental Well-being"
              width={600}
              height={400}
              className="rounded-md object-cover aspect-video"
              data-ai-hint="woman meditating peace"
            />
            <p className="mt-4 text-foreground/80">
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
