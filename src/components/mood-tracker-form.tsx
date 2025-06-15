
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { analyzeMoodAndProvideSupport, type MoodAnalysisInput, type MoodAnalysisOutput } from "@/ai/flows/mood-analysis-and-support";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { Mood, MoodEntry } from "@/types/mood";
import { moodOptionsList } from "@/types/mood";

const moodTrackerSchema = z.object({
  mood: z.enum(moodOptionsList, { required_error: "Please select your current mood." }),
  symptoms: z.string().min(3, "Please describe your symptoms or feelings.").max(500),
  additionalContext: z.string().max(500).optional(),
});

type MoodTrackerFormValues = z.infer<typeof moodTrackerSchema>;

interface MoodTrackerFormProps {
  onNewMoodEntry: (entryData: Omit<MoodEntry, 'id' | 'timestamp'>) => void;
}

export function MoodTrackerForm({ onNewMoodEntry }: MoodTrackerFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [supportSuggestions, setSupportSuggestions] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<MoodTrackerFormValues>({
    resolver: zodResolver(moodTrackerSchema),
    defaultValues: {
      symptoms: "",
      additionalContext: "",
      mood: undefined, // Explicitly set mood to undefined if no default
    },
  });

  const onSubmit: SubmitHandler<MoodTrackerFormValues> = async (data) => {
    setIsLoading(true);
    setSupportSuggestions(null);

    onNewMoodEntry({
      mood: data.mood,
      symptoms: data.symptoms,
      additionalContext: data.additionalContext || undefined,
    });

    try {
      const input: MoodAnalysisInput = {
        mood: data.mood,
        symptoms: data.symptoms,
        additionalContext: data.additionalContext || undefined,
      };
      const result: MoodAnalysisOutput = await analyzeMoodAndProvideSupport(input);
      setSupportSuggestions(result.supportSuggestions);
      toast({
        title: "Support Ready",
        description: "We've generated some support suggestions for you.",
      });
    } catch (error) {
      console.error("Error getting support suggestions:", error);
      toast({
        title: "Error",
        description: "Could not get support suggestions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      // form.reset(); // Consider if form should reset here
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl">
      <CardHeader>
        <CardTitle>How are you feeling today?</CardTitle>
        <CardDescription>Share your mood and symptoms to receive personalized support suggestions from our AI assistant and track your mood over time.</CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="mood">Current Mood</Label>
            <Controller
              name="mood"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ""}> {/* Handle undefined value for Select */}
                  <SelectTrigger id="mood">
                    <SelectValue placeholder="Select your mood" />
                  </SelectTrigger>
                  <SelectContent>
                    {moodOptionsList.map((moodOption) => (
                      <SelectItem key={moodOption} value={moodOption}>
                        {moodOption}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.mood && (
              <p className="text-sm text-destructive">{form.formState.errors.mood.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="symptoms">Symptoms or Feelings</Label>
            <Textarea
              id="symptoms"
              placeholder="e.g., feeling tired, difficulty sleeping, frequent crying"
              {...form.register("symptoms")}
              className={form.formState.errors.symptoms ? "border-destructive" : ""}
            />
            {form.formState.errors.symptoms && (
              <p className="text-sm text-destructive">{form.formState.errors.symptoms.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalContext">Additional Context (Optional)</Label>
            <Textarea
              id="additionalContext"
              placeholder="e.g., baby is not sleeping well, feeling isolated"
              {...form.register("additionalContext")}
            />
             {form.formState.errors.additionalContext && (
              <p className="text-sm text-destructive">{form.formState.errors.additionalContext.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
            Log Mood & Get Support
          </Button>
        </CardFooter>
      </form>

      {supportSuggestions && (
        <CardContent className="mt-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-2 text-primary">Personalized Support:</h3>
          <div className="p-4 bg-primary/10 rounded-md whitespace-pre-wrap text-sm text-foreground/80">
            {supportSuggestions}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
