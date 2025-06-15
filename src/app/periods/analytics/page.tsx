"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PeriodEntry, periodStore } from "@/lib/period-store";
import {
    ArcElement,
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { differenceInDays, format } from "date-fns";
import { Activity, Calendar, Clock, Download, Droplet, Heart, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, Doughnut, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function AnalyticsPage() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("6months");
  const [entries, setEntries] = useState<PeriodEntry[]>([]);

  useEffect(() => {
    // Load entries when component mounts
    const loadEntries = () => {
      const allEntries = periodStore.getPeriodEntries();
      setEntries(allEntries);
    };
    loadEntries();
  }, []);

  // Calculate cycle statistics
  const calculateCycleStats = () => {
    if (entries.length < 2) return null;

    const cycleLengths: number[] = [];
    let currentCycleStart: Date | null = null;

    entries
      .filter(entry => entry.flow === 'heavy' || entry.flow === 'medium')
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .forEach(entry => {
        if (!currentCycleStart) {
          currentCycleStart = new Date(entry.date);
        } else {
          const cycleLength = differenceInDays(new Date(entry.date), currentCycleStart);
          if (cycleLength > 0) {
            cycleLengths.push(cycleLength);
          }
          currentCycleStart = new Date(entry.date);
        }
      });

    if (cycleLengths.length === 0) return null;

    const avgCycleLength = cycleLengths.reduce((a, b) => a + b, 0) / cycleLengths.length;
    const minCycleLength = Math.min(...cycleLengths);
    const maxCycleLength = Math.max(...cycleLengths);

    return {
      avgCycleLength: Math.round(avgCycleLength),
      minCycleLength,
      maxCycleLength,
      totalCycles: cycleLengths.length,
    };
  };

  // Calculate symptom frequency
  const calculateSymptomFrequency = () => {
    const symptomCount: { [key: string]: number } = {};
    let totalEntries = 0;

    entries.forEach(entry => {
      if (entry.symptoms && entry.symptoms.length > 0) {
        totalEntries++;
        entry.symptoms.forEach(symptom => {
          symptomCount[symptom] = (symptomCount[symptom] || 0) + 1;
        });
      }
    });

    return {
      symptomCount,
      totalEntries,
    };
  };

  // Calculate mood trends
  const calculateMoodTrends = () => {
    const moodData = entries
      .filter(entry => entry.mood !== undefined)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      labels: moodData.map(entry => format(new Date(entry.date), 'MMM d')),
      data: moodData.map(entry => entry.mood),
    };
  };

  // Calculate flow patterns
  const calculateFlowPatterns = () => {
    const flowCount: { [key: string]: number } = {
      heavy: 0,
      medium: 0,
      light: 0,
      spotting: 0,
    };

    entries.forEach(entry => {
      if (entry.flow) {
        flowCount[entry.flow]++;
      }
    });

    return flowCount;
  };

  const cycleStats = calculateCycleStats();
  const symptomStats = calculateSymptomFrequency();
  const moodTrends = calculateMoodTrends();
  const flowPatterns = calculateFlowPatterns();

  // Prepare chart data
  const moodChartData = {
    labels: moodTrends.labels,
    datasets: [
      {
        label: 'Mood Level',
        data: moodTrends.data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const flowChartData = {
    labels: Object.keys(flowPatterns),
    datasets: [
      {
        label: 'Flow Distribution',
        data: Object.values(flowPatterns),
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const symptomChartData = {
    labels: Object.keys(symptomStats.symptomCount),
    datasets: [
      {
        label: 'Symptom Frequency',
        data: Object.values(symptomStats.symptomCount),
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Analytics</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Track and analyze your cycle patterns
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  Cycle Analytics
                </CardTitle>
                <div className="flex items-center gap-2">
                  <select
                    className="p-2 border rounded-md"
                    value={timeRange}
                    onChange={(e) => setTimeRange(e.target.value)}
                  >
                    <option value="3months">Last 3 Months</option>
                    <option value="6months">Last 6 Months</option>
                    <option value="1year">Last Year</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export Data
                  </Button>
                </div>
              </div>
              <CardDescription>Track and analyze your cycle patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="cycle">Cycle</TabsTrigger>
                  <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                  <TabsTrigger value="mood">Mood</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="mt-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Average Cycle Length</h3>
                        </div>
                        <p className="text-3xl font-bold">{cycleStats?.avgCycleLength} days</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Cycle Regularity</h3>
                        </div>
                        <p className="text-3xl font-bold">{cycleStats?.totalCycles} cycles</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Droplet className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Average Period Length</h3>
                        </div>
                        <p className="text-3xl font-bold">{cycleStats?.avgCycleLength} days</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-2">
                          <Heart className="h-5 w-5 text-primary" />
                          <h3 className="font-semibold">Ovulation Day</h3>
                        </div>
                        <p className="text-3xl font-bold">Day {cycleStats?.avgCycleLength / 2}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Cycle Length Trend</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Line data={cycleStats ? {
                          labels: ['Cycle Length'],
                          datasets: [
                            {
                              label: 'Cycle Length',
                              data: [cycleStats.avgCycleLength],
                              borderColor: 'rgb(75, 192, 192)',
                              tension: 0.1,
                            },
                          ],
                        } : {
                          labels: ['Cycle Length'],
                          datasets: [
                            {
                              label: 'Cycle Length',
                              data: [0],
                              borderColor: 'rgb(75, 192, 192)',
                              tension: 0.1,
                            },
                          ],
                        }} />
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader>
                        <CardTitle>Flow Distribution</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Doughnut data={flowChartData} />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="cycle" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Cycle Length History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Line data={cycleStats ? {
                          labels: ['Cycle Length'],
                          datasets: [
                            {
                              label: 'Cycle Length',
                              data: [cycleStats.avgCycleLength],
                              borderColor: 'rgb(75, 192, 192)',
                              tension: 0.1,
                            },
                          ],
                        } : {
                          labels: ['Cycle Length'],
                          datasets: [
                            {
                              label: 'Cycle Length',
                              data: [0],
                              borderColor: 'rgb(75, 192, 192)',
                              tension: 0.1,
                            },
                          ],
                        }} />
                      </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Cycle Regularity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">{cycleStats?.totalCycles} cycles</p>
                            <p className="text-sm text-muted-foreground">Regular cycles</p>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Average Period Length</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-center">
                            <p className="text-4xl font-bold text-primary">{cycleStats?.avgCycleLength} days</p>
                            <p className="text-sm text-muted-foreground">Last 6 months</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="symptoms" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Symptoms Frequency</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Bar data={symptomChartData} />
                      </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Most Common Symptoms</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {Object.entries(symptomStats.symptomCount)
                              .sort(([, a], [, b]) => b - a)
                              .slice(0, 3)
                              .map(([symptom, count]) => (
                                <div key={symptom} className="flex justify-between items-center">
                                  <span className="capitalize">{symptom}</span>
                                  <span className="font-semibold">{count} days</span>
                                </div>
                              ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Symptoms Severity</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Mild</span>
                              <span className="font-semibold">45%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Moderate</span>
                              <span className="font-semibold">35%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Severe</span>
                              <span className="font-semibold">20%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="mood" className="mt-6">
                  <div className="space-y-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Mood Trends</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Line data={moodChartData} />
                      </CardContent>
                    </Card>
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle>Mood by Cycle Phase</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Follicular Phase</span>
                              <span className="font-semibold">8.5/10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Ovulation</span>
                              <span className="font-semibold">9.0/10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Luteal Phase</span>
                              <span className="font-semibold">7.5/10</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Menstruation</span>
                              <span className="font-semibold">6.5/10</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle>Mood Triggers</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span>Stress</span>
                              <span className="font-semibold">65%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Sleep Quality</span>
                              <span className="font-semibold">55%</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span>Physical Activity</span>
                              <span className="font-semibold">45%</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
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
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Current Cycle Day</span>
                <span className="font-semibold">Day {cycleStats?.avgCycleLength / 2}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Next Period</span>
                <span className="font-semibold">In {cycleStats?.avgCycleLength / 2} days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Fertile Window</span>
                <span className="font-semibold">Days {cycleStats?.avgCycleLength / 2 - 2} to {cycleStats?.avgCycleLength / 2 + 2}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Period</span>
                <span className="font-semibold">28 days ago</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2">Cycle Regularity</h4>
                <p className="text-sm text-muted-foreground">
                  Your cycles have been very regular over the past 6 months, with only minor variations.
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2">Symptom Pattern</h4>
                <p className="text-sm text-muted-foreground">
                  Cramps and mood changes are most common during the first two days of your period.
                </p>
              </div>
              <div className="p-4 bg-primary/10 rounded-lg">
                <h4 className="font-medium mb-2">Mood Trends</h4>
                <p className="text-sm text-muted-foreground">
                  Your mood tends to be highest during ovulation and lowest during menstruation.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {entries
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .slice(0, 5)
                  .map((entry) => (
                    <div key={entry.id} className="flex items-start gap-4">
                      <div className="mt-1 p-2 rounded-full bg-primary/10">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">
                          {format(new Date(entry.date), 'MMMM d, yyyy')}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {entry.flow && `Flow: ${entry.flow}`}
                          {entry.temperature && `Temperature: ${entry.temperature}°C`}
                          {entry.symptoms && entry.symptoms.length > 0 && (
                            <span className="ml-2">
                              Symptoms: {entry.symptoms.join(', ')}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 