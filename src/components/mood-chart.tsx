
"use client";

import { useState, useMemo, useEffect } from 'react';
import { format, startOfDay, endOfDay, getHours } from 'date-fns';
import { Calendar as CalendarIcon, LineChart as LineChartIcon } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import type { MoodEntry, MoodChartDataPoint, Mood } from '@/types/mood';

interface MoodChartProps {
  entries: MoodEntry[];
}

const moodValueMapping: Record<Mood, number> = {
  Happy: 5,
  Energetic: 4.5,
  Calm: 4,
  Okay: 3,
  Tired: 2,
  Irritable: 1.5,
  Anxious: 1.5,
  Sad: 1,
  Overwhelmed: 1,
};

const moodEmojiMapping: Record<Mood, string> = {
  Happy: "😊",
  Energetic: "⚡️",
  Calm: "😌",
  Okay: "🙂",
  Tired: "😴",
  Irritable: "😠",
  Anxious: "😟",
  Sad: "😔",
  Overwhelmed: "😩",
};


const chartConfig = {
  moodValue: {
    label: 'Mood Level',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

export function MoodChart({ entries }: MoodChartProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setSelectedDate(new Date());
  }, []);


  const dailyChartData: MoodChartDataPoint[] = useMemo(() => {
    if (!selectedDate || !isMounted) return [];

    const dayStart = startOfDay(selectedDate);
    const dayEnd = endOfDay(selectedDate);

    const todaysEntries = entries.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate >= dayStart && entryDate <= dayEnd;
    });

    const slotsTemplate: MoodChartDataPoint[] = [
      { name: 'Morning', moodValue: null, moodCount: 0 },
      { name: 'Afternoon', moodValue: null, moodCount: 0 },
      { name: 'Evening', moodValue: null, moodCount: 0 },
      { name: 'Night', moodValue: null, moodCount: 0 },
    ];

    const moodSums: Record<MoodChartDataPoint['name'], number> = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };
    const moodCounts: Record<MoodChartDataPoint['name'], number> = { Morning: 0, Afternoon: 0, Evening: 0, Night: 0 };

    todaysEntries.forEach(entry => {
      const hour = getHours(new Date(entry.timestamp));
      let slotName: MoodChartDataPoint['name'] | null = null;

      if (hour >= 6 && hour < 12) slotName = 'Morning';
      else if (hour >= 12 && hour < 17) slotName = 'Afternoon';
      else if (hour >= 17 && hour < 21) slotName = 'Evening';
      else slotName = 'Night';

      if (slotName) {
        moodSums[slotName] += moodValueMapping[entry.mood as Mood];
        moodCounts[slotName]++;
      }
    });
    
    return slotsTemplate.map(slot => ({
      ...slot,
      moodValue: moodCounts[slot.name] > 0 ? moodSums[slot.name] / moodCounts[slot.name] : null,
      moodCount: moodCounts[slot.name],
    }));

  }, [selectedDate, entries, isMounted]);

  if (!isMounted || !selectedDate) {
    return <div className="flex justify-center items-center h-64"><p>Loading chart...</p></div>;
  }

  return (
    <Card className="shadow-xl">
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <LineChartIcon className="h-6 w-6 text-primary" />
              Daily Mood Trends
            </CardTitle>
            <CardDescription>
              Select a date to view your mood patterns throughout the day.
            </CardDescription>
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full sm:w-[240px] justify-start text-left font-normal',
                  !selectedDate && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                initialFocus
                disabled={(date: Date) => date > new Date() || date < new Date('2000-01-01')}
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent>
        {dailyChartData.every(d => d.moodValue === null) ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <p className="text-lg text-muted-foreground">No mood entries for {selectedDate ? format(selectedDate, 'PPP') : 'the selected date'}.</p>
            <p className="text-sm text-muted-foreground/80">Log your mood using the form above to see your trends.</p>
          </div>
        ) : (
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart accessibilityLayer data={dailyChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                stroke="hsl(var(--foreground)/0.6)"
              />
              <YAxis
                domain={[0, 5]}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="hsl(var(--foreground)/0.6)"
                tickFormatter={(value) => {
                  if (value === 5) return "😊";
                  if (value >= 4 && value < 5) return "🙂";
                  if (value >= 3 && value < 4) return "😐";
                  if (value >= 2 && value < 3) return "😕";
                  if (value >= 1 && value < 2) return "😔";
                  if (value === 0) return "";
                  return value.toString();
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    labelFormatter={(label: string, payload?: Array<any>) => {
                       const dataPoint = payload?.[0]?.payload as MoodChartDataPoint | undefined;
                       return (
                        <div className="font-medium">
                          {dataPoint?.name} Mood
                        </div>
                       )
                    }}
                    formatter={(value: number | string | Array<number | string>, name: string, item: { payload: MoodChartDataPoint }) => {
                      const dataPoint = item.payload;
                      const moodLabel = Object.keys(moodValueMapping).find(key => moodValueMapping[key as Mood] === Number(value));
                      const emoji = moodLabel ? moodEmojiMapping[moodLabel as Mood] : '';
                      
                      if (dataPoint.moodCount === 0) {
                        return (
                          <div className="flex flex-col gap-0.5">
                             <span className="text-muted-foreground">No entries</span>
                          </div>
                        )
                      }
                      return (
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-foreground">
                            Avg: {typeof value === 'number' ? value.toFixed(1) : 'N/A'} {emoji}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Based on {dataPoint.moodCount} {dataPoint.moodCount === 1 ? 'entry' : 'entries'}
                          </span>
                        </div>
                      );
                    }}
                  />
                }
              />
              <Bar dataKey="moodValue" fill="var(--color-moodValue)" radius={8} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
