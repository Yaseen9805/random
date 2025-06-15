/**
 * Represents an exercise with a name, description, and video URL.
 */
export interface Exercise {
  /**
   * The name of the exercise.
   */
  name: string;
  /**
   * A description of the exercise.
   */
  description: string;
  /**
   * The URL of the video demonstrating the exercise.
   */
  videoUrl: string;
}

/**
 * Represents a trimester during pregnancy.
 */
export type Trimester = 1 | 2 | 3;

/**
 * Asynchronously retrieves exercises for a given trimester.
 *
 * @param trimester The trimester for which to retrieve exercises.
 * @returns A promise that resolves to an array of Exercise objects.
 */
export async function getExercisesForTrimester(
  trimester: Trimester
): Promise<Exercise[]> {
  // TODO: Implement this by calling an API or database.

  return [
    {
      name: 'Sample Exercise',
      description: 'A sample exercise for demonstration purposes.',
      videoUrl: 'https://www.example.com/sample-exercise.mp4',
    },
  ];
}
