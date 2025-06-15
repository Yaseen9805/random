
"use client";

import { useState, useEffect } from "react";
import type { Exercise, Trimester } from "@/services/exercise";
import { getExercisesForTrimester as fetchExercises } from "@/services/exercise";
import { ExerciseCard } from "./exercise-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label"; // Ensure Label is imported

// Sample data for demonstration, replace with actual API calls
const sampleExercisesTrimester1: Exercise[] = [
  { name: "Pelvic Tilts", description: "Gently rock your pelvis back and forth while lying on your back with knees bent.", videoUrl: "https://www.youtube.com/embed/moa4h-rjuNE" },
  { name: "Kegels", description: "Contract and relax your pelvic floor muscles.", videoUrl: "https://www.youtube.com/embed/oVKemhvgekk" },
  { name: "Walking", description: "Aim for 30 minutes of brisk walking most days of the week.", videoUrl: "https://www.youtube.com/embed/JYUdpcMiLpw" },
];
const sampleExercisesTrimester2: Exercise[] = [
  { name: "Prenatal Yoga Squats", description: "Modified squats suitable for pregnancy, focusing on form.", videoUrl: "https://www.youtube.com/embed/-qmEKTDnrw8" },
  { name: "Swimming", description: "Low-impact exercise that supports your body.", videoUrl: "https://www.youtube.com/embed/Y4upYbQYGxw" },
  { name: "Side-Lying Leg Lifts", description: "Strengthens hip abductors.", videoUrl: "https://www.youtube.com/embed/a5uFPRLSXjo" },
];
const sampleExercisesTrimester3: Exercise[] = [
  { name: "Birth Ball Exercises", description: "Gentle movements on a birth ball to promote flexibility.", videoUrl: "https://www.youtube.com/embed/pxACsE_bH-Y" },
  { name: "Cat-Cow Stretch", description: "Improves spinal mobility and relieves back discomfort.", videoUrl: "https://www.youtube.com/embed/LympZqVz14s" },
  { name: "Deep Breathing", description: "Practice diaphragmatic breathing for relaxation and labor preparation.", videoUrl: "https://www.youtube.com/embed/iKniDZF50-w" },
];


const getExercisesForTrimester = async (trimester: Trimester): Promise<Exercise[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  if (trimester === 1) return sampleExercisesTrimester1;
  if (trimester === 2) return sampleExercisesTrimester2;
  if (trimester === 3) return sampleExercisesTrimester3;
  return [];
};


export function ExerciseList() {
  const [currentTrimester, setCurrentTrimester] = useState<Trimester>(1);
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [completedExercises, setCompletedExercises] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExercises = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // const fetchedExercises = await fetchExercises(currentTrimester); // Using actual API call function
        const fetchedExercises = await getExercisesForTrimester(currentTrimester); // Using mocked version
        setExercises(fetchedExercises);
      } catch (err) {
        console.error("Failed to load exercises:", err);
        setError("Could not load exercises. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    loadExercises();
  }, [currentTrimester]);

  const handleTrimesterChange = (value: string) => {
    setCurrentTrimester(Number(value) as Trimester);
  };

  const toggleComplete = (exerciseName: string) => {
    setCompletedExercises((prevCompleted) => {
      const newCompleted = new Set(prevCompleted);
      if (newCompleted.has(exerciseName)) {
        newCompleted.delete(exerciseName);
      } else {
        newCompleted.add(exerciseName);
      }
      return newCompleted;
    });
  };

  const progressPercentage = exercises.length > 0 ? (completedExercises.size / exercises.length) * 100 : 0;

  return (
    <div className="space-y-8">
      <Tabs defaultValue="1" onValueChange={handleTrimesterChange} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-primary/20">
          <TabsTrigger value="1" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Trimester 1</TabsTrigger>
          <TabsTrigger value="2" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Trimester 2</TabsTrigger>
          <TabsTrigger value="3" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Trimester 3</TabsTrigger>
        </TabsList>
        
        {[1, 2, 3].map(trimester => (
          <TabsContent key={trimester} value={String(trimester)}>
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
              </div>
            ) : error ? (
               <Alert variant="destructive" className="mt-4">
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
            ) : exercises.length === 0 ? (
              <Alert className="mt-4">
                <Lightbulb className="h-5 w-5" />
                <AlertTitle>No Exercises Found</AlertTitle>
                <AlertDescription>
                  There are no exercises available for this trimester yet. Check back soon!
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="my-6">
                  <Label htmlFor={`progress-${trimester}`} className="text-sm font-medium text-foreground/80">
                    Trimester {currentTrimester} Progress: {completedExercises.size} / {exercises.length} exercises completed
                  </Label>
                  <Progress value={progressPercentage} id={`progress-${trimester}`} className="w-full mt-2 h-3 [&>div]:bg-primary" aria-label={`Progress: ${progressPercentage.toFixed(0)}%`} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.name}
                      exercise={exercise}
                      onMarkComplete={toggleComplete}
                      isCompleted={completedExercises.has(exercise.name)}
                    />
                  ))}
                </div>
              </>
            )}
          </TabsContent>
        ))}
      </Tabs>
        <Alert className="mt-8 bg-primary/10 border-primary/20">
          <Lightbulb className="h-5 w-5 text-primary" />
          <AlertTitle className="text-primary font-semibold">Important Note</AlertTitle>
          <AlertDescription className="text-foreground/80">
            Always consult with your healthcare provider before starting any new exercise program during pregnancy. These exercises are general suggestions and may not be suitable for everyone.
          </AlertDescription>
        </Alert>
    </div>
  );
}
