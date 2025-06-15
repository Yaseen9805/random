import { AboutUsSection } from "@/components/about-us-section";
import { AppFooter } from "@/components/layout/app-footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Baby, Calendar } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-lg bg-card/50 p-8 shadow-md">
        <h1 className="text-4xl font-bold tracking-tight">Welcome to SwaSakhi!</h1>
        <p className="mt-2 text-lg text-foreground/80">
          Your companion through pregnancy, periods, and postpartum wellness.
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8   w-full">
        {/* Pregnancy Assistant Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Baby className="h-8 w-8 text-primary" />
              Pregnancy Assistant
            </CardTitle>
            <CardDescription className="text-lg">Your comprehensive pregnancy companion</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Baby className="h-32 w-32 text-primary mb-6" />
            <p className="text-lg text-center text-foreground/80">
              Track your pregnancy journey, get weekly updates, calculate due dates, and access personalized resources for every stage of your pregnancy.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/pregnancy">Start Your Journey</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Periods Assistant Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-8 w-8 text-primary" />
              Periods Assistant
            </CardTitle>
            <CardDescription className="text-lg">Track, understand, and manage your cycle</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Calendar className="h-32 w-32 text-primary mb-6" />
            <p className="text-lg text-center text-foreground/80">
              Monitor your menstrual cycle, log symptoms, predict ovulation, and get personalized insights for better period management.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods">Track Your Cycle</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>

      <AboutUsSection />
      <AppFooter />
    </div>
  );
}
