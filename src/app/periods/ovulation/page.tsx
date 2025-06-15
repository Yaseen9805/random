"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodEntry, PeriodStats, periodStore } from "@/lib/period-store";
import { addDays, format, subDays } from "date-fns";
import { Activity, Droplet, Thermometer, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

interface TrackingData {
  date: string;
  bbt: number | null;
  cervicalMucus: string | null;
  lhTest: string | null;
}

export default function OvulationPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("prediction");
  const [entries, setEntries] = useState<PeriodEntry[]>([]);
  const [trackingData, setTrackingData] = useState<TrackingData[]>([]);
  const [showBBTModal, setShowBBTModal] = useState(false);
  const [showMucusModal, setShowMucusModal] = useState(false);
  const [showLHModal, setShowLHModal] = useState(false);
  const [currentBBT, setCurrentBBT] = useState<number | null>(null);
  const [currentMucus, setCurrentMucus] = useState<string | null>(null);
  const [currentLH, setCurrentLH] = useState<string | null>(null);
  const [stats, setStats] = useState<PeriodStats>({
    averageCycleLength: 0,
    totalCyclesTracked: 0,
    lastPeriodStart: null,
    nextPeriodPredicted: null,
  });

  useEffect(() => {
    const loadData = () => {
      const allEntries = periodStore.getPeriodEntries();
      setEntries(allEntries);
      setStats(periodStore.calculateStats());
    };
    loadData();

    const handleStorageChange = () => {
      loadData();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Calculate next ovulation date
  const calculateNextOvulation = () => {
    if (!stats.lastPeriodStart || !stats.averageCycleLength) return null;
    
    const lastPeriodStart = new Date(stats.lastPeriodStart);
    const nextPeriodStart = addDays(lastPeriodStart, stats.averageCycleLength);
    const ovulationDate = subDays(nextPeriodStart, 14);
    
    return ovulationDate;
  };

  // Calculate fertile window
  const calculateFertileWindow = () => {
    const ovulationDate = calculateNextOvulation();
    if (!ovulationDate) return null;

    const fertileStart = subDays(ovulationDate, 5);
    const fertileEnd = addDays(ovulationDate, 1);

    return {
      start: fertileStart,
      end: fertileEnd
    };
  };

  const handleBBTSubmit = () => {
    if (!date || !currentBBT) return;

    const entry = periodStore.addPeriodEntry({
      date: format(date, 'yyyy-MM-dd'),
      temperature: currentBBT,
      flow: 'light',
      symptoms: [],
      mood: 5,
      notes: 'BBT Reading',
    });

    setEntries(prev => [...prev, entry]);
    setStats(periodStore.calculateStats());
    setShowBBTModal(false);
    setCurrentBBT(null);
  };

  const handleMucusSubmit = () => {
    if (!date || !currentMucus) return;

    const entry = periodStore.addPeriodEntry({
      date: format(date, 'yyyy-MM-dd'),
      flow: 'light',
      symptoms: [],
      mood: 5,
      notes: `Cervical Mucus: ${currentMucus}`,
    });

    setEntries(prev => [...prev, entry]);
    setStats(periodStore.calculateStats());
    setShowMucusModal(false);
    setCurrentMucus(null);
  };

  const handleLHSubmit = () => {
    if (!date || !currentLH) return;

    const entry = periodStore.addPeriodEntry({
      date: format(date, 'yyyy-MM-dd'),
      flow: 'light',
      symptoms: [],
      mood: 5,
      notes: `LH Test: ${currentLH}`,
    });

    setEntries(prev => [...prev, entry]);
    setStats(periodStore.calculateStats());
    setShowLHModal(false);
    setCurrentLH(null);
  };

  const handleDeleteEntry = (id: string) => {
    if (periodStore.deletePeriodEntry(id)) {
      setEntries(prev => prev.filter(entry => entry.id !== id));
      setStats(periodStore.calculateStats());
    }
  };

  const ovulationDate = calculateNextOvulation();
  const fertileWindow = calculateFertileWindow();

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Ovulation Tracking</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Track your fertility signs and predict ovulation
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Ovulation Tracking</CardTitle>
              <CardDescription>Monitor your fertility signs</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="prediction">Prediction</TabsTrigger>
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                </TabsList>

                <TabsContent value="prediction" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Next Ovulation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-4">
                          <p className="text-2xl font-bold">
                            {ovulationDate 
                              ? format(ovulationDate, 'MMMM d, yyyy')
                              : 'Not enough data'}
                          </p>
                          <p className="text-muted-foreground mt-2">
                            Based on your cycle history
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Fertile Window</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-4">
                          {fertileWindow ? (
                            <>
                              <p className="text-2xl font-bold">
                                {format(fertileWindow.start, 'MMM d')} - {format(fertileWindow.end, 'MMM d')}
                              </p>
                              <p className="text-muted-foreground mt-2">
                                Your most fertile days
                              </p>
                            </>
                          ) : (
                            <p className="text-muted-foreground">
                              Not enough data to predict fertile window
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="tracking" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Track Symptoms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <Button 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => setShowBBTModal(true)}
                          >
                            <Thermometer className="mr-2 h-4 w-4" />
                            Basal Body Temperature
                          </Button>
                          <Button 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => setShowMucusModal(true)}
                          >
                            <Droplet className="mr-2 h-4 w-4" />
                            Cervical Mucus
                          </Button>
                          <Button 
                            variant="outline" 
                            className="justify-start"
                            onClick={() => setShowLHModal(true)}
                          >
                            <Activity className="mr-2 h-4 w-4" />
                            LH Test Results
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Tracking Data Display */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Tracking Data</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {entries
                            .filter(entry => entry.temperature || entry.notes?.includes('Cervical Mucus') || entry.notes?.includes('LH Test'))
                            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                            .map((entry) => (
                              <div key={entry.id} className="flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                  <p className="font-medium">
                                    {format(new Date(entry.date), 'MMMM d, yyyy')}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {entry.temperature && `Temperature: ${entry.temperature}°C`}
                                    {entry.notes && (
                                      <span className="ml-2">{entry.notes}</span>
                                    )}
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
                          {entries.filter(entry => entry.temperature || entry.notes?.includes('Cervical Mucus') || entry.notes?.includes('LH Test')).length === 0 && (
                            <p className="text-center text-muted-foreground">
                              No tracking data yet. Log your first entry to get started.
                            </p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Side Calendar */}
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
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={() => setShowBBTModal(true)} className="w-full">
                <Thermometer className="mr-2 h-4 w-4" /> Log BBT
              </Button>
              <Button onClick={() => setShowMucusModal(true)} className="w-full">
                <Droplet className="mr-2 h-4 w-4" /> Log Cervical Mucus
              </Button>
              <Button onClick={() => setShowLHModal(true)} className="w-full">
                <Activity className="mr-2 h-4 w-4" /> Log LH Test
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* BBT Modal */}
      {showBBTModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Log BBT</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Temperature (°C)</label>
                <input
                  type="number"
                  step="0.01"
                  min="35"
                  max="42"
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentBBT || ''}
                  onChange={(e) => setCurrentBBT(parseFloat(e.target.value))}
                  placeholder="Enter temperature"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowBBTModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleBBTSubmit}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Cervical Mucus Modal */}
      {showMucusModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Log Cervical Mucus</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Consistency</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentMucus || ''}
                  onChange={(e) => setCurrentMucus(e.target.value)}
                >
                  <option value="">Select consistency</option>
                  <option value="Dry">Dry</option>
                  <option value="Sticky">Sticky</option>
                  <option value="Creamy">Creamy</option>
                  <option value="Watery">Watery</option>
                  <option value="Egg White">Egg White</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMucusModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleMucusSubmit}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showLHModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Log LH Test</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Result</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentLH || ''}
                  onChange={(e) => setCurrentLH(e.target.value)}
                >
                  <option value="">Select result</option>
                  <option value="Negative">Negative</option>
                  <option value="Positive">Positive</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowLHModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleLHSubmit}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 