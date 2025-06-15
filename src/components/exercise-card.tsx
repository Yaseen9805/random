import type { Exercise } from "@/services/exercise";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlayCircle, CheckCircle2 } from "lucide-react";

interface ExerciseCardProps {
  exercise: Exercise;
  onMarkComplete: (exerciseName: string) => void;
  isCompleted: boolean;
}

export function ExerciseCard({ exercise, onMarkComplete, isCompleted }: ExerciseCardProps) {
  return (
    <Card className="overflow-hidden shadow-lg transition-all hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-xl">{exercise.name}</CardTitle>
        <CardDescription className="text-sm h-16 overflow-y-auto">{exercise.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {exercise.videoUrl && (
          <div className="aspect-video rounded-md overflow-hidden bg-muted flex items-center justify-center">
            {exercise.videoUrl.includes("youtube.com/embed") ? (
               <iframe
                width="100%"
                height="100%"
                src={exercise.videoUrl}
                title={exercise.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="border-0"
              ></iframe>
            ) : (
              <a href={exercise.videoUrl} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center text-primary hover:text-primary/80">
                <PlayCircle className="h-16 w-16 mb-2" />
                <span className="font-medium">Watch Video</span>
              </a>
            )}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button 
          onClick={() => onMarkComplete(exercise.name)} 
          variant={isCompleted ? "secondary" : "default"}
          className={`w-full ${isCompleted ? "bg-green-100 text-green-700 hover:bg-green-200" : "bg-primary hover:bg-primary/90 text-primary-foreground"}`}
          aria-pressed={isCompleted}
        >
          <CheckCircle2 className={`mr-2 h-5 w-5 ${isCompleted ? "text-green-700" : ""}`} />
          {isCompleted ? "Completed" : "Mark as Complete"}
        </Button>
      </CardFooter>
    </Card>
  );
}
