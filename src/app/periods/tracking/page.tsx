"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodEntry, PeriodStats, periodStore } from "@/lib/period-store";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function CycleTrackingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("history");
  const [entries, setEntries] = useState<PeriodEntry[]>([]);
  const [stats, setStats] = useState<PeriodStats>({
    averageCycleLength: 0,
    totalCyclesTracked: 0,
    lastPeriodStart: null,
    nextPeriodPredicted: null,
    averagePeriodLength: 0,
    cycleRegularity: 0
  });
  const [flow, setFlow] = useState<'light' | 'medium' | 'heavy' | ''>('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const loadData = () => {
      const allEntries = periodStore.getPeriodEntries();
      setEntries(allEntries);
      setStats(periodStore.calculateStats());
    };

    // Load data on mount
    loadData();

    // Optional: Add event listener for storage changes if needed to react to other tabs
    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleDeleteEntry = (id: string) => {
    if (periodStore.deletePeriodEntry(id)) {
      const updatedEntries = entries.filter(entry => entry.id !== id);
      setEntries(updatedEntries);
      setStats(periodStore.calculateStats()); // Recalculate stats after deletion
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(entries, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'cycle-history.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleAddEntry = () => {
    if (!date || !flow) {
      alert('Please select a date and flow.');
      return;
    }

    const newEntry: PeriodEntry = {
      id: Date.now().toString(), // Simple unique ID
      date: format(date, 'yyyy-MM-dd'),
      flow,
      symptoms: symptoms.split(',').map(s => s.trim()).filter(s => s !== ''),
      notes,
    };

    periodStore.addPeriodEntry(newEntry);
    setEntries(periodStore.getPeriodEntries());
    setStats(periodStore.calculateStats());

    // Reset form fields
    setDate(new Date());
    setFlow('');
    setSymptoms('');
    setNotes('');
    setSelectedTab('history'); // Go back to history tab
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Cycle Tracking</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Track your cycle events and view your history
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Cycle History</CardTitle>
              <CardDescription>View your cycle patterns and predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="history">History</TabsTrigger>
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                  <TabsTrigger value="export">Export Data</TabsTrigger>
                </TabsList>
                <TabsContent value="history" className="mt-6">
                  <div className="space-y-4">
                    {entries
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((entry) => (
                        <div key={entry.id} className="flex justify-between items-center p-4 border rounded-lg">
                          <div>
                            <p className="font-medium">
                              {entry.flow === 'light' ? 'Spotting' : 'Period'}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {format(new Date(entry.date), 'MMMM d, yyyy')}
                              {entry.notes && ` - ${entry.notes}`}
                            </p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteEntry(entry.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    {entries.length === 0 && (
                      <p className="text-center text-muted-foreground">
                        No cycle history yet. Add your first entry to get started.
                      </p>
                    )}
                  </div>
                </TabsContent>
                <TabsContent value="predictions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Next Period Prediction</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-4">
                        <p className="text-2xl font-bold">
                          {stats.nextPeriodPredicted
                            ? format(new Date(stats.nextPeriodPredicted), 'MMMM d, yyyy')
                            : 'Not enough data'}
                        </p>
                        <p className="text-muted-foreground mt-2">
                          Based on your average cycle length of {stats.averageCycleLength || 'N/A'} days
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="export" className="mt-6">
                  <Button onClick={handleExportData}>Export Data</Button>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        {/* Side Calendar & Log Period Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Log Period</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label htmlFor="flow">Flow</label>
                <select
                  id="flow"
                  value={flow}
                  onChange={(e) => setFlow(e.target.value as 'light' | 'medium' | 'heavy')}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="">Select flow</option>
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="symptoms">Symptoms (comma-separated)</label>
                <input
                  id="symptoms"
                  type="text"
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="e.g., cramps, headache, fatigue"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <div className="grid gap-2">
                <label htmlFor="notes">Notes</label>
                <textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Any additional notes..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button onClick={handleAddEntry} className="w-full">Log Period</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Average Cycle Length:</span>
                <span className="font-medium">{stats.averageCycleLength || 'N/A'} days</span>
              </div>
              <div className="flex justify-between">
                <span>Total Cycles Tracked:</span>
                <span className="font-medium">{stats.totalCyclesTracked || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Last Period Start:</span>
                <span className="font-medium">
                  {stats.lastPeriodStart ? format(new Date(stats.lastPeriodStart), 'MMM d, yyyy') : 'N/A'}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 