"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PeriodEntry, periodStore } from "@/lib/period-store";
import { Activity, BarChart3, Bell, BookOpen, Calendar, Droplet, Heart, MessageSquare, Pill, Thermometer } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

// Mock data for initialization
const mockData: PeriodEntry[] = [
  {
    "id": "entry-001",
    "date": "2024-03-01",
    "flow": "heavy",
    "symptoms": ["cramps", "fatigue"],
    "mood": 2,
    "temperature": 36.5,
    "notes": "Period started. Feeling tired.",
    "padsUsed": 4
  },
  {
    "id": "entry-002",
    "date": "2024-03-02",
    "flow": "medium",
    "symptoms": ["cramps"],
    "mood": 3,
    "temperature": 36.6,
    "notes": "Still cramping a bit.",
    "padsUsed": 3
  },
  {
    "id": "entry-003",
    "date": "2024-03-03",
    "flow": "light",
    "symptoms": ["bloating"],
    "mood": 4,
    "temperature": 36.6,
    "notes": "Flow getting lighter.",
    "padsUsed": 2
  },
  {
    "id": "entry-004",
    "date": "2024-03-04",
    "flow": "spotting",
    "symptoms": [],
    "mood": 5,
    "temperature": 36.7,
    "notes": "Just spotting now.",
    "padsUsed": 1
  },
  {
    "id": "entry-005",
    "date": "2024-03-05",
    "flow": "none",
    "symptoms": [],
    "mood": 5,
    "temperature": 36.7,
    "notes": "Period ended.",
    "padsUsed": 0
  },
  {
    "id": "entry-006",
    "date": "2024-03-15",
    "flow": "none",
    "symptoms": [],
    "mood": 4,
    "temperature": 36.3,
    "cervicalMucus": "Watery",
    "notes": "Pre-ovulation. Clear, watery CM. Low BBT."
  },
  {
    "id": "entry-007",
    "date": "2024-03-16",
    "flow": "none",
    "symptoms": [],
    "mood": 4,
    "temperature": 36.2,
    "cervicalMucus": "Egg White",
    "lhTest": "Positive",
    "notes": "Peak CM, positive LH test. Ovulation likely soon."
  },
  {
    "id": "entry-008",
    "date": "2024-03-17",
    "flow": "none",
    "symptoms": [],
    "mood": 3,
    "temperature": 36.5,
    "notes": "BBT rise - likely ovulated yesterday."
  },
  {
    "id": "entry-009",
    "date": "2024-03-28",
    "flow": "none",
    "symptoms": ["breast tenderness", "fatigue"],
    "mood": 2,
    "temperature": 36.7,
    "notes": "PMS symptoms starting."
  },
  {
    "id": "entry-010",
    "date": "2024-03-29",
    "flow": "spotting",
    "symptoms": ["cramps"],
    "mood": 3,
    "temperature": 36.6,
    "notes": "Light spotting before period."
  },
  {
    "id": "entry-011",
    "date": "2024-03-30",
    "flow": "heavy",
    "symptoms": ["cramps", "headache"],
    "mood": 1,
    "temperature": 36.5,
    "notes": "New cycle started. Very strong cramps.",
    "padsUsed": 5
  },
  {
    "id": "entry-012",
    "date": "2024-03-31",
    "flow": "medium",
    "symptoms": ["cramps"],
    "mood": 2,
    "temperature": 36.6,
    "notes": "",
    "padsUsed": 4
  },
  {
    "id": "entry-013",
    "date": "2024-04-01",
    "flow": "light",
    "symptoms": [],
    "mood": 3,
    "temperature": 36.6,
    "notes": "",
    "padsUsed": 2
  },
  {
    "id": "entry-014",
    "date": "2024-04-02",
    "flow": "none",
    "symptoms": [],
    "mood": 4,
    "temperature": 36.7,
    "notes": "Period ended."
  },
  {
    "id": "entry-015",
    "date": "2024-04-12",
    "flow": "none",
    "symptoms": [],
    "mood": 4,
    "temperature": 36.3,
    "cervicalMucus": "Watery",
    "notes": "Ovulation window approaching."
  },
  {
    "id": "entry-016",
    "date": "2024-04-13",
    "flow": "none",
    "symptoms": [],
    "mood": 4,
    "temperature": 36.2,
    "cervicalMucus": "Egg White",
    "lhTest": "Positive",
    "notes": "Positive LH test."
  },
  {
    "id": "entry-017",
    "date": "2024-04-14",
    "flow": "none",
    "symptoms": ["light cramps"],
    "mood": 3,
    "temperature": 36.5,
    "notes": "Post-ovulation BBT rise."
  },
  {
    "id": "entry-018",
    "date": "2024-04-26",
    "flow": "heavy",
    "symptoms": ["cramps", "fatigue", "mood swings"],
    "mood": 1,
    "temperature": 36.5,
    "notes": "Period started. Feeling quite emotional.",
    "padsUsed": 5
  },
  {
    "id": "entry-019",
    "date": "2024-04-27",
    "flow": "medium",
    "symptoms": ["cramps"],
    "mood": 2,
    "temperature": 36.6,
    "notes": "",
    "padsUsed": 4
  },
  {
    "id": "entry-020",
    "date": "2024-04-28",
    "flow": "light",
    "symptoms": [],
    "mood": 3,
    "temperature": 36.6,
    "notes": "",
    "padsUsed": 2
  }
];

export default function PeriodsPage() {
  useEffect(() => {
    // Initialize with mock data if local storage is empty
    periodStore.initializeWithMockData(mockData);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Periods Assistant</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Track your cycle, log symptoms, and get personalized insights
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Cycle Tracking Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="h-8 w-8 text-primary" />
              Cycle Tracking
            </CardTitle>
            <CardDescription>Monitor your menstrual cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Track period start and end dates</li>
              <li>• Calculate cycle length and regularity</li>
              <li>• View cycle history and patterns</li>
              <li>• Get predictions for next period</li>
              <li>• Export cycle data for healthcare providers</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/tracking">Start Tracking</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Symptom Logging Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Activity className="h-8 w-8 text-primary" />
              Symptom Logging
            </CardTitle>
            <CardDescription>Record and analyze your symptoms</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Track physical symptoms (cramps, bloating, etc.)</li>
              <li>• Log emotional changes and mood swings</li>
              <li>• Record sleep quality and energy levels</li>
              <li>• Monitor appetite and food cravings</li>
              <li>• View symptom patterns over time</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/symptoms">Log Symptoms</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Ovulation Prediction Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Heart className="h-8 w-8 text-primary" />
              Ovulation Prediction
            </CardTitle>
            <CardDescription>Predict your fertile window</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Calculate fertile days</li>
              <li>• Track basal body temperature</li>
              <li>• Monitor cervical mucus changes</li>
              <li>• Record ovulation test results</li>
              <li>• Get personalized fertility insights</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/ovulation">View Predictions</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Flow Tracking Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Droplet className="h-8 w-8 text-primary" />
              Flow Tracking
            </CardTitle>
            <CardDescription>Monitor your period flow</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Track flow intensity (light to heavy)</li>
              <li>• Monitor duration of bleeding</li>
              <li>• Record spotting between periods</li>
              <li>• Track pad/tampon usage</li>
              <li>• View flow patterns over time</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/flow">Track Flow</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Temperature Tracking Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Thermometer className="h-8 w-8 text-primary" />
              Temperature Tracking
            </CardTitle>
            <CardDescription>Monitor basal body temperature</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Record daily basal body temperature</li>
              <li>• View temperature charts</li>
              <li>• Identify ovulation patterns</li>
              <li>• Track temperature trends</li>
              <li>• Get cycle phase insights</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/temperature">Track Temperature</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Medication Tracking Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Pill className="h-8 w-8 text-primary" />
              Medication Tracking
            </CardTitle>
            <CardDescription>Manage your medications</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Track birth control usage</li>
              <li>• Set medication reminders</li>
              <li>• Log pain relief medication</li>
              <li>• Monitor side effects</li>
              <li>• Get refill reminders</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/medication">Manage Medications</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Education Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BookOpen className="h-8 w-8 text-primary" />
              Education
            </CardTitle>
            <CardDescription>Learn about your cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Read cycle health articles</li>
              <li>• Learn about fertility</li>
              <li>• Understand symptoms</li>
              <li>• Get nutrition tips</li>
              <li>• Access expert advice</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/education">Learn More</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Reminders Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Bell className="h-8 w-8 text-primary" />
              Reminders
            </CardTitle>
            <CardDescription>Stay on top of your cycle</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Get period start reminders</li>
              <li>• Set medication alerts</li>
              <li>• Receive ovulation notifications</li>
              <li>• Track appointment reminders</li>
              <li>• Customize notification preferences</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/reminders">Set Reminders</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Analytics Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart3 className="h-8 w-8 text-primary" />
              Analytics
            </CardTitle>
            <CardDescription>View your cycle insights</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• View cycle statistics</li>
              <li>• Track symptom patterns</li>
              <li>• Monitor cycle regularity</li>
              <li>• Analyze flow trends</li>
              <li>• Export detailed reports</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/analytics">View Analytics</Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Community Support Card */}
        <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <MessageSquare className="h-8 w-8 text-primary" />
              Community Support
            </CardTitle>
            <CardDescription>Connect with others</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-foreground/80">
              <li>• Join support groups</li>
              <li>• Share experiences</li>
              <li>• Get peer advice</li>
              <li>• Access expert Q&A</li>
              <li>• Participate in discussions</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6">
              <Link href="/periods/community">Join Community</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
} 