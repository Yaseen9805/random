"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Lightbulb, Baby, Sparkles, Bone, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { getPregnancyWeeklyUpdate, type PregnancyWeeklyUpdateInput, type PregnancyWeeklyUpdateOutput } from "@/ai/flows/pregnancy-weekly-update";
import Image from "next/image";

const weeks = Array.from({ length: 42 }, (_, i) => i + 1); // Weeks 1 to 42

export function PregnancyProgressDisplay() {
  const [selectedWeek, setSelectedWeek] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [progressData, setProgressData] = useState<PregnancyWeeklyUpdateOutput | null>(null);
  const { toast } = useToast();

  const handleFetchProgress = async () => {
    if (!selectedWeek) {
      toast({
        title: "Select a week",
        description: "Please select a pregnancy week to see the progress.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setProgressData(null);
    try {
      const input: PregnancyWeeklyUpdateInput = { pregnancyWeek: selectedWeek };
      const result = await getPregnancyWeeklyUpdate(input);
      setProgressData(result);
      toast({
        title: `Week ${selectedWeek} Insights`,
        description: "Successfully fetched your weekly pregnancy update.",
      });
    } catch (error) {
      console.error("Error fetching pregnancy progress:", error);
      toast({
        title: "Error",
        description: "Could not fetch pregnancy progress. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const getBabySizeImage = (fruit: string | undefined): string => {
    if (!fruit) return "https://picsum.photos/seed/babydefault/200/200";
    // Simple mapping for demonstration, can be expanded or made more dynamic
    const fruitLower = fruit.toLowerCase();
    if (fruitLower.includes("poppy seed")) return "https://picsum.photos/seed/poppyseed/200/200";
    if (fruitLower.includes("apple seed")) return "https://picsum.photos/seed/appleseed/200/200";
    if (fruitLower.includes("lentil")) return "https://picsum.photos/seed/lentil/200/200";
    if (fruitLower.includes("blueberry")) return "https://picsum.photos/seed/blueberry/200/200";
    if (fruitLower.includes("raspberry")) return "https://picsum.photos/seed/raspberry/200/200";
    if (fruitLower.includes("grape")) return "https://picsum.photos/seed/grape/200/200";
    if (fruitLower.includes("lime")) return "https://picsum.photos/seed/lime/200/200";
    if (fruitLower.includes("plum")) return "https://picsum.photos/seed/plum/200/200";
    if (fruitLower.includes("peach")) return "https://picsum.photos/seed/peach/200/200";
    if (fruitLower.includes("lemon")) return "https://picsum.photos/seed/lemonbaby/200/200";
    if (fruitLower.includes("avocado")) return "https://picsum.photos/seed/avocadobaby/200/200";
    if (fruitLower.includes("orange")) return "https://picsum.photos/seed/orangebaby/200/200";
    if (fruitLower.includes("mango")) return "https://picsum.photos/seed/mangobaby/200/200";
    if (fruitLower.includes("sweet potato")) return "https://picsum.photos/seed/sweetpotato/200/200";
    if (fruitLower.includes("bell pepper")) return "https://picsum.photos/seed/bellpepper/200/200";
    if (fruitLower.includes("pomegranate")) return "https://picsum.photos/seed/pomegranate/200/200";
    if (fruitLower.includes("artichoke")) return "https://picsum.photos/seed/artichoke/200/200";
    if (fruitLower.includes("eggplant")) return "https://picsum.photos/seed/eggplant/200/200";
    if (fruitLower.includes("coconut")) return "https://picsum.photos/seed/coconut/200/200";
    if (fruitLower.includes("head of lettuce")) return "https://picsum.photos/seed/lettuce/200/200";
    if (fruitLower.includes("pineapple")) return "https://picsum.photos/seed/pineapple/200/200";
    if (fruitLower.includes("cantaloupe")) return "https://picsum.photos/seed/cantaloupe/200/200";
    if (fruitLower.includes("honeydew")) return "https://picsum.photos/seed/honeydew/200/200";
    if (fruitLower.includes("watermelon") || fruitLower.includes("pumpkin")) return "https://picsum.photos/seed/watermelon/200/200";
    return `https://picsum.photos/seed/${fruitLower.replace(/\s+/g, '')}/200/200`;
  };


  return (
    <div className="space-y-8">
      <Card className="w-full max-w-md mx-auto shadow-lg">
        <CardHeader>
          <CardTitle>Select Pregnancy Week</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pregnancyWeek">Current Week of Pregnancy</Label>
            <Select
              onValueChange={(value) => setSelectedWeek(Number(value))}
              value={selectedWeek?.toString()}
            >
              <SelectTrigger id="pregnancyWeek">
                <SelectValue placeholder="Select week (1-42)" />
              </SelectTrigger>
              <SelectContent>
                {weeks.map((week) => (
                  <SelectItem key={week} value={week.toString()}>
                    Week {week}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleFetchProgress} disabled={isLoading || !selectedWeek} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Get Weekly Update
          </Button>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {progressData && !isLoading && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Baby className="h-6 w-6 text-primary" /> Baby's Development</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 whitespace-pre-line">{progressData.babyDevelopment}</p>
              {progressData.babySizeFruit && (
                <div className="mt-4 p-4 bg-primary/10 rounded-lg flex items-center gap-4">
                  <Image 
                    src={getBabySizeImage(progressData.babySizeFruit)} 
                    alt={progressData.babySizeFruit} 
                    width={60} 
                    height={60} 
                    className="rounded-full object-cover"
                    data-ai-hint="fruit vegetable"
                  />
                  <div>
                    <p className="font-semibold text-primary">Baby is about the size of...</p>
                    <p className="text-lg text-foreground">{progressData.babySizeFruit}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Activity className="h-6 w-6 text-primary"/> Mother's Changes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground/80 whitespace-pre-line">{progressData.motherChanges}</p>
            </CardContent>
          </Card>
          
          {progressData.tips && progressData.tips.length > 0 && (
             <Card className="md:col-span-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Lightbulb className="h-6 w-6 text-primary" /> Tips for this Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-foreground/80">
                  {progressData.tips.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  );
}
