"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Apple, BookOpen, Brain, GraduationCap, Heart, Stethoscope } from "lucide-react";
import { useState } from "react";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  content: string;
}

const articles: Article[] = [
  {
    id: "1",
    title: "Understanding Your Menstrual Cycle",
    description: "A comprehensive guide to the phases of your menstrual cycle and what happens in your body.",
    category: "basics",
    readTime: "5 min read",
    content: `
      Your menstrual cycle is a natural process that prepares your body for pregnancy each month. It's controlled by hormones and typically lasts 28 days, though it can vary from person to person.

      The cycle has four main phases:
      1. Menstrual Phase (Days 1-5)
         - Your period begins
         - The lining of your uterus sheds
         - Hormone levels are low

      2. Follicular Phase (Days 1-13)
         - Your body prepares for ovulation
         - Follicle-stimulating hormone (FSH) rises
         - Estrogen levels increase

      3. Ovulation Phase (Day 14)
         - An egg is released from your ovary
         - This is your most fertile time
         - Lasts about 24 hours

      4. Luteal Phase (Days 15-28)
         - Progesterone levels rise
         - Your body prepares for pregnancy
         - If no pregnancy occurs, the cycle begins again

      Understanding these phases can help you:
      - Track your fertility
      - Identify normal vs. abnormal symptoms
      - Better manage your reproductive health
    `
  },
  {
    id: "2",
    title: "Nutrition and Your Cycle",
    description: "How to support your body through different phases of your cycle with proper nutrition.",
    category: "nutrition",
    readTime: "4 min read",
    content: `
      Your nutritional needs change throughout your menstrual cycle. Here's how to support your body:

      During Your Period:
      - Iron-rich foods (leafy greens, red meat)
      - Vitamin C (citrus fruits, berries)
      - Magnesium (nuts, seeds, dark chocolate)
      - Stay hydrated

      Follicular Phase:
      - Fresh fruits and vegetables
      - Lean proteins
      - Complex carbohydrates
      - Probiotic foods

      Ovulation:
      - Omega-3 fatty acids
      - Zinc-rich foods
      - Vitamin B6
      - Antioxidant-rich foods

      Luteal Phase:
      - Calcium-rich foods
      - Magnesium
      - Vitamin E
      - Complex carbohydrates

      General Tips:
      - Stay hydrated throughout your cycle
      - Limit caffeine and alcohol
      - Eat regular, balanced meals
      - Listen to your body's cravings
    `
  },
  {
    id: "3",
    title: "Mental Health and Your Cycle",
    description: "Understanding the connection between your menstrual cycle and mental well-being.",
    category: "mental-health",
    readTime: "6 min read",
    content: `
      Your menstrual cycle can significantly impact your mental health. Here's what you need to know:

      Hormonal Influences:
      - Estrogen affects serotonin levels
      - Progesterone impacts GABA receptors
      - These changes can affect mood and emotions

      Common Mental Health Patterns:
      1. Pre-Menstrual Phase
         - Mood swings
         - Anxiety
         - Depression
         - Irritability

      2. During Period
         - Emotional sensitivity
         - Fatigue
         - Mood fluctuations

      Coping Strategies:
      - Regular exercise
      - Stress management techniques
      - Adequate sleep
      - Social support
      - Professional help when needed

      When to Seek Help:
      - Severe mood changes
      - Persistent depression
      - Anxiety that interferes with daily life
      - Thoughts of self-harm
    `
  },
  {
    id: "4",
    title: "Fertility Awareness",
    description: "Learn about natural family planning and fertility awareness methods.",
    category: "fertility",
    readTime: "7 min read",
    content: `
      Fertility awareness methods (FAM) help you understand your body's natural fertility signs.

      Key Fertility Indicators:
      1. Basal Body Temperature (BBT)
         - Track daily temperature
         - Look for temperature shifts
         - Indicates ovulation

      2. Cervical Mucus
         - Changes in consistency
         - Color and texture variations
         - Peak fertility signs

      3. Cervical Position
         - Changes in height
         - Softness and openness
         - Position tracking

      Benefits of FAM:
      - Natural family planning
      - Better body awareness
      - No side effects
      - Can be used for conception or prevention

      Important Considerations:
      - Requires daily tracking
      - Learning curve involved
      - Not 100% effective alone
      - Best combined with other methods
    `
  },
  {
    id: "5",
    title: "Common Menstrual Disorders",
    description: "Understanding different menstrual disorders and when to seek medical help.",
    category: "health",
    readTime: "8 min read",
    content: `
      Several conditions can affect your menstrual cycle. Here are the most common:

      1. Polycystic Ovary Syndrome (PCOS)
         - Irregular periods
         - Excess androgen
         - Polycystic ovaries
         - Treatment options

      2. Endometriosis
         - Painful periods
         - Tissue growth outside uterus
         - Fertility concerns
         - Management strategies

      3. Premenstrual Syndrome (PMS)
         - Physical symptoms
         - Emotional changes
         - Lifestyle management
         - Treatment options

      4. Amenorrhea
         - Missing periods
         - Primary vs. secondary
         - Causes and treatment
         - When to seek help

      When to See a Doctor:
      - Severe pain
      - Irregular cycles
      - Heavy bleeding
      - Missed periods
      - Unusual symptoms
    `
  }
];

export default function EducationPage() {
  const [selectedTab, setSelectedTab] = useState("basics");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(article => article.category === selectedTab);

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Education Center</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Learn about your menstrual health and cycle
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-primary" />
                Learning Resources
              </CardTitle>
              <CardDescription>Explore articles and educational content</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="basics">
                    <BookOpen className="h-4 w-4 mr-2" />
                    Basics
                  </TabsTrigger>
                  <TabsTrigger value="nutrition">
                    <Apple className="h-4 w-4 mr-2" />
                    Nutrition
                  </TabsTrigger>
                  <TabsTrigger value="mental-health">
                    <Brain className="h-4 w-4 mr-2" />
                    Mental Health
                  </TabsTrigger>
                  <TabsTrigger value="fertility">
                    <Heart className="h-4 w-4 mr-2" />
                    Fertility
                  </TabsTrigger>
                  <TabsTrigger value="health">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Health
                  </TabsTrigger>
                </TabsList>

                <div className="mt-6">
                  {selectedArticle ? (
                    <div className="space-y-6">
                      <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">{selectedArticle.title}</h2>
                        <Button
                          variant="ghost"
                          onClick={() => setSelectedArticle(null)}
                        >
                          Back to Articles
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedArticle.readTime}
                      </p>
                      <div className="prose prose-sm max-w-none">
                        {selectedArticle.content.split('\n').map((paragraph, index) => (
                          <p key={index} className="mb-4">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-4">
                      {filteredArticles.map((article) => (
                        <Card key={article.id} className="cursor-pointer hover:shadow-md transition-shadow">
                          <CardContent className="p-6" onClick={() => setSelectedArticle(article)}>
                            <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                            <p className="text-sm text-muted-foreground mb-2">
                              {article.description}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {article.readTime}
                            </p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-6 w-6 text-primary" />
                Quick Links
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#tracking-basics">Tracking Basics</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#nutrition-tips">Nutrition Tips</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#mental-health">Mental Health</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#fertility-awareness">Fertility Awareness</a>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <a href="#health-conditions">Health Conditions</a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Resources</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-sm">
                <h4 className="font-medium mb-2">Recommended Reading</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Taking Charge of Your Fertility</li>
                  <li>• Period Power</li>
                  <li>• The Period Repair Manual</li>
                </ul>
              </div>
              <div className="text-sm">
                <h4 className="font-medium mb-2">Professional Organizations</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• American College of Obstetricians and Gynecologists</li>
                  <li>• International Federation of Gynecology and Obstetrics</li>
                  <li>• World Health Organization</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 