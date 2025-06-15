"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodEntry, periodStore } from "@/lib/period-store";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { format } from "date-fns";
import { Activity, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function TemperatureTrackingPage() {
  const [selectedTab, setSelectedTab] = useState("tracking");
  const [showAddModal, setShowAddModal] = useState(false);
  const [entries, setEntries] = useState<PeriodEntry[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [newEntry, setNewEntry] = useState<Partial<PeriodEntry>>({
    date: format(new Date(), 'yyyy-MM-dd'),
    temperature: 37.0,
    notes: '',
  });

  const [stats, setStats] = useState({
    average: '0.0',
    lowest: '0.0',
    highest: '0.0',
    totalReadings: 0,
  });

  useEffect(() => {
    const loadData = () => {
      const allEntries = periodStore.getPeriodEntries();
      setEntries(allEntries);
      // Recalculate stats based on loaded entries
      const temperatureEntries = allEntries.filter(entry => entry.temperature);
      const totalTemperature = temperatureEntries.reduce((acc, curr) => acc + (curr.temperature || 0), 0);
      const averageTemp = temperatureEntries.length > 0 ? (totalTemperature / temperatureEntries.length).toFixed(1) : '0.0';
      const lowestTemp = temperatureEntries.length > 0 ? Math.min(...temperatureEntries.map(e => e.temperature || 0)).toFixed(1) : '0.0';
      const highestTemp = temperatureEntries.length > 0 ? Math.max(...temperatureEntries.map(e => e.temperature || 0)).toFixed(1) : '0.0';

      setStats({
        average: averageTemp,
        lowest: lowestTemp,
        highest: highestTemp,
        totalReadings: temperatureEntries.length,
      });
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

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.temperature) return;

    const entry = periodStore.addPeriodEntry({
      date: newEntry.date,
      temperature: newEntry.temperature,
      flow: 'light', // Default value, as this is temperature tracking
      symptoms: [],
      mood: 5,
      notes: newEntry.notes,
    });

    setEntries(prev => {
      const updatedEntries = [...prev, entry];
      // Manually recalculate stats here for immediate UI update
      const temperatureEntries = updatedEntries.filter(entry => entry.temperature);
      const totalTemperature = temperatureEntries.reduce((acc, curr) => acc + (curr.temperature || 0), 0);
      const averageTemp = temperatureEntries.length > 0 ? (totalTemperature / temperatureEntries.length).toFixed(1) : '0.0';
      const lowestTemp = temperatureEntries.length > 0 ? Math.min(...temperatureEntries.map(e => e.temperature || 0)).toFixed(1) : '0.0';
      const highestTemp = temperatureEntries.length > 0 ? Math.max(...temperatureEntries.map(e => e.temperature || 0)).toFixed(1) : '0.0';

      setStats({
        average: averageTemp,
        lowest: lowestTemp,
        highest: highestTemp,
        totalReadings: temperatureEntries.length,
      });
      return updatedEntries;
    });

    setShowAddModal(false);
    setNewEntry({
      date: format(new Date(), 'yyyy-MM-dd'),
      temperature: 37.0,
      notes: '',
    });
  };

  const handleDeleteEntry = (id: string) => {
    if (periodStore.deletePeriodEntry(id)) {
      setEntries(prev => {
        const updatedEntries = prev.filter(entry => entry.id !== id);
        // Manually recalculate stats here for immediate UI update
        const temperatureEntries = updatedEntries.filter(entry => entry.temperature);
        const totalTemperature = temperatureEntries.reduce((acc, curr) => acc + (curr.temperature || 0), 0);
        const averageTemp = temperatureEntries.length > 0 ? (totalTemperature / temperatureEntries.length).toFixed(1) : '0.0';
        const lowestTemp = temperatureEntries.length > 0 ? Math.min(...temperatureEntries.map(e => e.temperature || 0)).toFixed(1) : '0.0';
        const highestTemp = temperatureEntries.length > 0 ? Math.max(...temperatureEntries.map(e => e.temperature || 0)).toFixed(1) : '0.0';

        setStats({
          average: averageTemp,
          lowest: lowestTemp,
          highest: highestTemp,
          totalReadings: temperatureEntries.length,
        });
        return updatedEntries;
      });
    }
  };

  // Prepare chart data
  const chartData = {
    labels: entries
      .filter(entry => entry.temperature)
      .map(entry => format(new Date(entry.date), 'MMM d')),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: entries
          .filter(entry => entry.temperature)
          .map(entry => entry.temperature),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Temperature Trend',
      },
    },
    scales: {
      y: {
        min: 36.0,
        max: 38.0,
        ticks: {
          stepSize: 0.2,
        },
      },
    },
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Temperature Tracking</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Track your basal body temperature (BBT)
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-6 w-6 text-primary" />
                  Temperature Tracking
                </CardTitle>
                <Button onClick={() => setShowAddModal(true)}>
                  Log Temperature
                </Button>
              </div>
              <CardDescription>Track your daily basal body temperature</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="tracking">Tracking</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="tracking" className="mt-6">
                  <div className="space-y-4">
                    {entries
                      .filter(entry => entry.temperature)
                      .map((entry) => (
                        <Card key={entry.id} className="relative">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-4">
                                <div className="mt-1 p-2 rounded-full bg-primary/10">
                                  <Activity className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h3 className="font-semibold">
                                    {format(new Date(entry.date), 'MMMM d, yyyy')}
                                  </h3>
                                  <p className="text-sm text-muted-foreground">
                                    Temperature: {entry.temperature}°C
                                  </p>
                                  {entry.notes && (
                                    <p className="text-sm text-muted-foreground">
                                      Notes: {entry.notes}
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
                    {entries.filter(entry => entry.temperature).length === 0 && (
                      <p className="text-center text-muted-foreground">
                        No temperature readings yet. Start tracking by clicking "Log Temperature".
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="mt-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Temperature Statistics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium">Average Temperature</h4>
                            <p className="text-2xl font-bold">{stats.average}°C</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Lowest Reading</h4>
                            <p className="text-2xl font-bold">{stats.lowest}°C</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Highest Reading</h4>
                            <p className="text-2xl font-bold">{stats.highest}°C</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Total Readings</h4>
                            <p className="text-2xl font-bold">{stats.totalReadings}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Temperature Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Line data={chartData} options={chartOptions} />
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
                <span className="font-semibold">{stats.totalReadings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Reading</span>
                <span className="font-semibold">
                  {entries.length > 0
                    ? format(new Date(entries[entries.length - 1].date), 'MMM d')
                    : 'N/A'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Average</span>
                <span className="font-semibold">{stats.average}°C</span>
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
              <CardTitle>Log Temperature</CardTitle>
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
                <label className="text-sm font-medium">Temperature (°C)</label>
                <input
                  type="number"
                  className="w-full p-2 border rounded-md mt-1"
                  value={newEntry.temperature}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, temperature: parseFloat(e.target.value) }))}
                  step="0.1"
                  min="35"
                  max="42"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  className="w-full p-2 border rounded-md mt-1"
                  rows={3}
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any notes about your temperature reading..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddEntry}>
                  Save Reading
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 