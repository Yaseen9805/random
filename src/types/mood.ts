// src/types/mood.ts
export const moodOptionsList = ["Happy", "Okay", "Sad", "Anxious", "Irritable", "Overwhelmed", "Calm", "Energetic", "Tired"] as const;
export type Mood = typeof moodOptionsList[number];

export interface MoodEntry {
  id: string;
  timestamp: Date;
  mood: Mood;
  symptoms: string; // Symptoms are required in the form, so keeping it non-optional here
  additionalContext?: string;
}

export interface MoodChartDataPoint {
  name: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
  moodValue: number | null; // Average mood value, null if no entries
  moodCount: number; // Number of entries in this slot
}
