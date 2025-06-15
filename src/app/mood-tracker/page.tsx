"use client";

import { MoodChart } from "@/components/mood-chart";
import { MoodTrackerForm } from "@/components/mood-tracker-form";
import type { MoodEntry } from "@/types/mood";
import { useEffect, useState } from "react";

export default function MoodTrackerPage() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Effect to run once on client mount for initialization
  useEffect(() => {
    document.title = "Mood & Symptom Tracker | SwaSakhi";
    setIsClient(true); // Signal that client-side logic can run

    // Load entries from localStorage
    const storedEntriesJSON = localStorage.getItem("moodEntries");
    if (storedEntriesJSON) {
      try {
        const parsedEntries = JSON.parse(storedEntriesJSON).map((entry: any) => ({
          ...entry,
          timestamp: new Date(entry.timestamp) // Ensure timestamp is a Date object
        }));
        setMoodEntries(parsedEntries);
      } catch (error) {
        console.error("Failed to parse mood entries from localStorage", error);
        // localStorage.removeItem("moodEntries"); // Optionally clear corrupted data
      }
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Effect to save entries to localStorage whenever moodEntries changes
  useEffect(() => {
    if (isClient) { // Only run on the client
      if (moodEntries.length > 0) {
        localStorage.setItem("moodEntries", JSON.stringify(moodEntries));
      } else {
        // If moodEntries is empty, remove the item from localStorage
        // This handles cases where the cart is cleared or all items are removed.
        // We check if it exists before removing to avoid unnecessary operations if it's already gone.
        if (localStorage.getItem("moodEntries")) {
            localStorage.removeItem("moodEntries");
        }
      }
    }
  }, [moodEntries, isClient]); // Re-run when moodEntries or isClient status changes

  const handleNewMoodEntry = (entryData: Omit<MoodEntry, 'id' | 'timestamp'>) => {
    // crypto.randomUUID() is client-side. This function should only be called by client interactions.
    // No explicit 'isClient' check needed here if MoodTrackerForm is only rendered when isClient is true.
    const newEntry: MoodEntry = {
      ...entryData,
      id: crypto.randomUUID(),
      timestamp: new Date(),
    };
    setMoodEntries(prevEntries => [...prevEntries, newEntry]);
  };

  if (!isClient) {
    // Render a loading state or null until the client is ready to prevent hydration mismatches
    return (
      <div className="container mx-auto py-8 space-y-10">
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-muted-foreground">Loading Mood Tracker...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 space-y-10">
      <MoodTrackerForm onNewMoodEntry={handleNewMoodEntry} />
      <MoodChart entries={moodEntries} />
    </div>
  );
}
