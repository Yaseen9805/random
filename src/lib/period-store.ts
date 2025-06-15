import { addDays } from 'date-fns';

// Types for period tracking data
export interface PeriodEntry {
  id: string;
  date: string;
  flow: 'light' | 'medium' | 'heavy';
  symptoms: string[];
  mood: number; // 1-10 scale
  notes?: string;
  temperature?: number;
  medications?: string[];
  padsUsed?: number;
}

export interface CycleData {
  startDate: string;
  endDate: string;
  length: number;
  flow: PeriodEntry[];
}

export interface PeriodStats {
  averageCycleLength: number;
  averagePeriodLength: number;
  lastPeriodStart: string | null;
  nextPeriodPredicted: string | null;
  cycleRegularity: number; // percentage
}

// Data store class for managing period tracking data
class PeriodStore {
  private static instance: PeriodStore;
  private readonly STORAGE_KEY = 'lumina_health_period_data';
  private readonly MEDICATION_STORAGE_KEY = 'lumina_health_medication_entries';
  private readonly REMINDER_STORAGE_KEY = 'lumina_health_reminder_entries';

  private constructor() {
    if (typeof window !== 'undefined') {
      if (!localStorage.getItem(this.MEDICATION_STORAGE_KEY)) {
        localStorage.setItem(this.MEDICATION_STORAGE_KEY, JSON.stringify([]));
      }
      if (!localStorage.getItem(this.REMINDER_STORAGE_KEY)) {
        localStorage.setItem(this.REMINDER_STORAGE_KEY, JSON.stringify([]));
      }
    }
  }

  static getInstance(): PeriodStore {
    if (!PeriodStore.instance) {
      PeriodStore.instance = new PeriodStore();
    }
    return PeriodStore.instance;
  }

  // Get all period entries
  getPeriodEntries(): PeriodEntry[] {
    if (typeof window === 'undefined') return [];
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  // Add a new period entry
  addPeriodEntry(entry: Omit<PeriodEntry, 'id'>): PeriodEntry {
    if (typeof window === 'undefined') throw new Error("localStorage is not available on the server.");
    const entries = this.getPeriodEntries();
    const newEntry: PeriodEntry = {
      ...entry,
      id: crypto.randomUUID(),
    };
    entries.push(newEntry);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    return newEntry;
  }

  // Update an existing period entry
  updatePeriodEntry(id: string, updates: Partial<PeriodEntry>): PeriodEntry | null {
    if (typeof window === 'undefined') return null;
    const entries = this.getPeriodEntries();
    const index = entries.findIndex(entry => entry.id === id);
    
    if (index === -1) return null;

    const updatedEntry = { ...entries[index], ...updates };
    entries[index] = updatedEntry;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(entries));
    return updatedEntry;
  }

  // Delete a period entry
  deletePeriodEntry(id: string): boolean {
    if (typeof window === 'undefined') return false;
    const entries = this.getPeriodEntries();
    const filteredEntries = entries.filter(entry => entry.id !== id);
    
    if (filteredEntries.length === entries.length) return false;
    
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filteredEntries));
    return true;
  }

  // Get entries within a date range
  getEntriesInRange(startDate: string, endDate: string): PeriodEntry[] {
    if (typeof window === 'undefined') return [];
    const entries = this.getPeriodEntries();
    return entries.filter(entry => 
      entry.date >= startDate && entry.date <= endDate
    );
  }

  // Calculate period statistics
  calculateStats(): PeriodStats {
    if (typeof window === 'undefined') {
      return {
        averageCycleLength: 0,
        averagePeriodLength: 0,
        lastPeriodStart: null,
        nextPeriodPredicted: null,
        cycleRegularity: 0,
      };
    }
    const entries = this.getPeriodEntries();
    if (entries.length === 0) {
      return {
        averageCycleLength: 0,
        averagePeriodLength: 0,
        lastPeriodStart: null,
        nextPeriodPredicted: null,
        cycleRegularity: 0,
      };
    }

    // Sort entries by date
    const sortedEntries = [...entries].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Filter out entries that are not flow entries for cycle length calculation
    const flowEntries = sortedEntries.filter(entry => entry.flow && entry.flow !== 'light');

    // If there are no flow entries, we can't calculate cycle length or period length accurately.
    if (flowEntries.length < 2) {
      return {
        averageCycleLength: 0,
        averagePeriodLength: 0,
        lastPeriodStart: flowEntries.length > 0 ? flowEntries[flowEntries.length - 1].date : null,
        nextPeriodPredicted: null,
        cycleRegularity: 0,
      };
    }

    // Calculate cycle lengths (from the start of one period to the start of the next)
    const cycleLengths: number[] = [];
    for (let i = 1; i < flowEntries.length; i++) {
      const previousPeriodStart = new Date(flowEntries[i - 1].date);
      const currentPeriodStart = new Date(flowEntries[i].date);
      const diffTime = Math.abs(currentPeriodStart.getTime() - previousPeriodStart.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      cycleLengths.push(diffDays);
    }

    // Calculate average cycle length
    const averageCycleLength = cycleLengths.length > 0
      ? Math.round(cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length)
      : 0;

    // Calculate cycle regularity (using standard deviation)
    // A higher regularity means less variance in cycle length.
    const cycleRegularity = cycleLengths.length > 1
      ? Math.round((1 - (Math.std(cycleLengths) / averageCycleLength)) * 100)
      : 0; // If only one or no cycles, regularity is 0

    // Calculate average period length
    const periodLengths: number[] = [];
    let currentPeriodLength = 0;
    for (let i = 0; i < sortedEntries.length; i++) {
      if (sortedEntries[i].flow && sortedEntries[i].flow !== 'light') {
        currentPeriodLength++;
      } else if (currentPeriodLength > 0) {
        periodLengths.push(currentPeriodLength);
        currentPeriodLength = 0;
      }
    }
    if (currentPeriodLength > 0) {
      periodLengths.push(currentPeriodLength);
    }

    const averagePeriodLength = periodLengths.length > 0
      ? Math.round(periodLengths.reduce((a, b) => a + b, 0) / periodLengths.length)
      : 0;

    // Get last period start
    const lastPeriodStart = flowEntries.length > 0 
      ? flowEntries[flowEntries.length - 1].date 
      : null;

    // Predict next period
    let nextPeriodPredicted: string | null = null;
    if (lastPeriodStart && averageCycleLength > 0) {
      const lastPeriodStartDate = new Date(lastPeriodStart);
      const nextPredictedDate = addDays(lastPeriodStartDate, averageCycleLength);
      nextPeriodPredicted = nextPredictedDate.toISOString().split('T')[0];
    }

    return {
      averageCycleLength,
      averagePeriodLength,
      lastPeriodStart,
      nextPeriodPredicted,
      cycleRegularity,
    };
  }

  // Get entries for a specific month
  getEntriesForMonth(year: number, month: number): PeriodEntry[] {
    if (typeof window === 'undefined') return [];
    const entries = this.getPeriodEntries();
    return entries.filter(entry => {
      const date = new Date(entry.date);
      return date.getFullYear() === year && date.getMonth() === month;
    });
  }

  // Get entries for a specific year
  getEntriesForYear(year: number): PeriodEntry[] {
    if (typeof window === 'undefined') return [];
    const entries = this.getPeriodEntries();
    return entries.filter(entry => {
      const date = new Date(entry.date);
      return date.getFullYear() === year;
    });
  }

  // Clear all data from local storage
  clearAllData() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
      localStorage.removeItem(this.MEDICATION_STORAGE_KEY);
      localStorage.removeItem(this.REMINDER_STORAGE_KEY);
    }
  }

  initializeWithMockData(mockData: PeriodEntry[]) {
    if (typeof window !== 'undefined') { // Ensure this runs only in the browser
      const existingEntries = localStorage.getItem(this.STORAGE_KEY);
      if (!existingEntries || JSON.parse(existingEntries).length === 0) {
        // Only add mock data if there's no existing data
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(mockData));
        console.log("Mock data initialized.");
      }
    }
  }
}

// Helper function to calculate standard deviation
// This assumes Math.std might not be natively available or might need a polyfill.
// For simplicity, defining it here if it's not already defined to avoid errors.
if (!Math.std) {
  Math.std = function(array: number[]): number {
    const n = array.length;
    if (n === 0) return 0;
    const mean = array.reduce((a, b) => a + b) / n;
    return Math.sqrt(array.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
  };
}

// Export a singleton instance
export const periodStore = PeriodStore.getInstance(); 