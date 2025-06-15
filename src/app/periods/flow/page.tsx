"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodEntry, PeriodStats, periodStore } from "@/lib/period-store";
import { format } from "date-fns";
import { Droplet, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

export default function FlowTrackingPage() {
  const [selectedTab, setSelectedTab] = useState("tracking");
  const [showAddModal, setShowAddModal] = useState(false);
  const [entries, setEntries] = useState<PeriodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [stats, setStats] = useState<PeriodStats>({
    averageCycleLength: 0,
    totalCyclesTracked: 0,
    lastPeriodStart: null,
    nextPeriodPredicted: null,
  });

  const [newEntry, setNewEntry] = useState<Partial<PeriodEntry>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    flow: 'medium',
    symptoms: [],
    mood: 5,
    padsUsed: 0,
  });

  useEffect(() => {
    // Load entries and stats when component mounts
    const loadData = () => {
      const allEntries = periodStore.getPeriodEntries();
      setEntries(allEntries);
      setStats(periodStore.calculateStats());
    };
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

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.flow) return;

    const entry = periodStore.addPeriodEntry({
      date: newEntry.date,
      flow: newEntry.flow as 'light' | 'medium' | 'heavy',
      symptoms: newEntry.symptoms || [],
      mood: newEntry.mood || 5,
      notes: newEntry.notes,
      padsUsed: newEntry.padsUsed,
    });

    setEntries(prev => [...prev, entry]);
    setStats(periodStore.calculateStats()); // Recalculate stats after adding
    setShowAddModal(false);
    setNewEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      flow: 'medium',
      symptoms: [],
      mood: 5,
      padsUsed: 0,
    });
  };

  const handleDeleteEntry = (id: string) => {
    if (periodStore.deletePeriodEntry(id)) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
      setStats(periodStore.calculateStats()); // Recalculate stats after deletion
    }
  };

  const getFlowColor = (flow: string) => {
    switch (flow) {
      case 'light':
        return 'bg-blue-100 text-blue-800';
      case 'medium':
        return 'bg-purple-100 text-purple-800';
      case 'heavy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Flow Tracking</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Track and monitor your menstrual flow
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Droplet className="h-6 w-6 text-primary" />
                  Flow Tracking
                </CardTitle>
                <Button onClick={() => setShowAddModal(true)}>
                  Log Flow
                </Button>
              </div>
              <CardDescription>Track your daily flow and symptoms</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="tracking" className="mt-6">
                  <div className="space-y-4">
                    {entries.map((entry) => (
                      <Card key={entry.id} className="relative">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className={`mt-1 p-2 rounded-full ${getFlowColor(entry.flow)}`}>
                                <Droplet className="h-5 w-5" />
                              </div>
                              <div>
                                <h3 className="font-semibold">
                                  {format(new Date(entry.date), 'MMMM d, yyyy')}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  Flow: {entry.flow.charAt(0).toUpperCase() + entry.flow.slice(1)}
                                </p>
                                {entry.symptoms.length > 0 && (
                                  <p className="text-sm text-muted-foreground">
                                    Symptoms: {entry.symptoms.join(', ')}
                                  </p>
                                )}
                                {entry.notes && (
                                  <p className="text-sm text-muted-foreground">
                                    Notes: {entry.notes}
                                  </p>
                                )}
                                {entry.padsUsed && (
                                  <p className="text-sm text-muted-foreground">
                                    Pads Used: {entry.padsUsed}
                                  </p>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteEntry(entry.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {entries.length === 0 && (
                      <p className="text-center text-muted-foreground">
                        No flow entries yet. Start tracking by clicking "Log Flow".
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Flow Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Average Cycle Length</h4>
                            <p className="text-2xl font-bold">{stats.averageCycleLength} days</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Last Period</h4>
                            <p className="text-2xl font-bold">
                              {stats.lastPeriodStart ? format(new Date(stats.lastPeriodStart), 'MMM d, yyyy') : 'N/A'}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Next Period Predicted</h4>
                            <p className="text-2xl font-bold">
                              {stats.nextPeriodPredicted ? format(new Date(stats.nextPeriodPredicted), 'MMM d, yyyy') : 'N/A'}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Flow Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {['light', 'medium', 'heavy'].map((flow) => {
                            const count = entries.filter(e => e.flow === flow).length;
                            const percentage = entries.length > 0
                              ? Math.round((count / entries.length) * 100)
                              : 0;
                            return (
                              <div key={flow} className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="capitalize">{flow}</span>
                                  <span>{percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full">
                                  <div
                                    className={`h-full rounded-full ${getFlowColor(flow)}`}
                                    style={{ width: `${percentage}%` }}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && setSelectedDate(date)}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Days Tracked</span>
                <span className="font-semibold">{entries.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Logged</span>
                <span className="font-semibold">
                  {entries.length > 0
                    ? format(new Date(entries[entries.length - 1].date), 'MMM d')
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Cycle Regularity</span>
                <span className="font-semibold">{stats.cycleRegularity}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Entry Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Log Flow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md mt-1"
                  value={newEntry.date}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, date: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Flow Intensity</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={newEntry.flow}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, flow: e.target.value as 'light' | 'medium' | 'heavy' }))}
                >
                  <option value="light">Light</option>
                  <option value="medium">Medium</option>
                  <option value="heavy">Heavy</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Pads Used</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md mt-1"
                  value={newEntry.padsUsed}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, padsUsed: parseInt(e.target.value) }))}
                  min="0"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  className="w-full p-2 border rounded-md mt-1"
                  rows={3}
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about your flow..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  Save Entry
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 