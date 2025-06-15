import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, CalendarCheck2 } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Growth & Timeline | SwaSakhi",
  description: "Track your due date and weekly pregnancy progress.",
};

export default function GrowthHubPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-10 text-center">Growth & Timeline</h1>
      <p className="text-lg text-foreground/80 mb-12 text-center max-w-2xl mx-auto">
        Monitor your pregnancy journey, estimate your due date, and follow your baby's weekly development.
      </p>
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck2 className="h-7 w-7 text-primary" />
              Due Date Calculator
            </CardTitle>
            <CardDescription>Estimate your baby's expected due date.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <CalendarCheck2 className="h-16 w-16 text-primary mb-4" />
            <p className="mt-4 text-foreground/80 text-center">
              Calculate your estimated due date based on your last menstrual period or conception date.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/growth/due-date-calculator">Calculate Due Date</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Baby className="h-7 w-7 text-primary" />
              Weekly Pregnancy Progress
            </CardTitle>
            <CardDescription>Track baby's development and your body's changes.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Baby className="h-16 w-16 text-primary mb-4" />
            <p className="mt-4 text-foreground/80 text-center">
              Follow your baby's week-by-week growth and the transformations your body is undergoing.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/growth/weekly-progress">View Weekly Progress</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
