import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, BarChart3, Bot, GraduationCap, HeartPulse, Music2, ShoppingBag, Stethoscope, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function PregnancyPage() {
  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Pregnancy Assistant</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Your comprehensive companion through pregnancy and postpartum wellness
        </p>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-6 w-6 text-primary" />
              Mood Tracker
            </CardTitle>
            <CardDescription>Log feelings & symptoms for insights.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <BarChart3 className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Track your emotional well-being and identify patterns over time.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/mood-tracker">Track Your Mood</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-6 w-6 text-primary" />
              AI Companion
            </CardTitle>
            <CardDescription>Chat for mental wellness support.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Bot className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Get personalized support and guidance from our AI assistant.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/ai-companion">Chat with AI</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Exercises & Well-being
            </CardTitle>
            <CardDescription>Physical exercises & mental well-being routines.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <HeartPulse className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Access tailored physical and mental wellness programs for every stage.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/exercises-wellbeing">Explore Programs</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Growth & Timeline
            </CardTitle>
            <CardDescription>Due date calculator & weekly progress.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <TrendingUp className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Estimate your due date and track your baby's weekly development.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/growth">Explore Growth</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              Educate
            </CardTitle>
            <CardDescription>Articles on pregnancy, nutrition, child care.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <GraduationCap className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Learn from articles covering various motherhood topics.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/educate">Visit Educate</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-6 w-6 text-primary" />
              Community Forum
            </CardTitle>
            <CardDescription>Peer-to-peer support and sharing.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Users className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Connect with other mothers, share experiences, and find support.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/community">Join Community</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              Shop for Essentials
            </CardTitle>
            <CardDescription>Baby care, diapers, supplements.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <ShoppingBag className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Find essential products for mother and baby. (Demo)
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/shop">Browse Shop</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Music2 className="h-6 w-6 text-primary" />
              Ambient Music
            </CardTitle>
            <CardDescription>Calming sounds for relaxation.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Music2 className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Unwind with a selection of soothing ambient sounds.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/ambient-music">Listen Now</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              Professional Help
            </CardTitle>
            <CardDescription>Find OB/GYNs, pediatricians, therapists.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center p-6 flex-grow">
            <Stethoscope className="h-16 w-16 text-primary mb-4" />
            <p className="text-sm text-center text-foreground/80">
              Connect with trusted healthcare professionals and specialists.
            </p>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/professional-help">Find Experts</Link>
            </Button>
          </CardFooter>
        </Card>
      </section>
    </div>
  );
} 