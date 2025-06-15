"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Coffee, Moon } from "lucide-react";
import { useState } from "react";

interface SymptomState {
  painLevel: number;
  flowIntensity: string;
  physicalSymptoms: string[];
  mood: string[];
  energyLevel: number;
  notes: string;
  lifestyle: {
    caffeine: boolean;
    sleep: boolean;
    exercise: boolean;
  };
}

export default function SymptomsPage() {
  const [selectedDate] = useState<Date>(new Date());
  const [selectedTab, setSelectedTab] = useState("physical");
  const [symptoms, setSymptoms] = useState<SymptomState>({
    painLevel: 0,
    flowIntensity: "",
    physicalSymptoms: [],
    mood: [],
    energyLevel: 0,
    notes: "",
    lifestyle: {
      caffeine: false,
      sleep: false,
      exercise: false
    }
  });

  const handlePainLevel = (level: number) => {
    setSymptoms(prev => ({ ...prev, painLevel: level }));
  };

  const handleFlowIntensity = (intensity: string) => {
    setSymptoms(prev => ({ ...prev, flowIntensity: intensity }));
  };

  const handleSymptomToggle = (symptom: string) => {
    setSymptoms(prev => ({
      ...prev,
      physicalSymptoms: prev.physicalSymptoms.includes(symptom)
        ? prev.physicalSymptoms.filter(s => s !== symptom)
        : [...prev.physicalSymptoms, symptom]
    }));
  };

  const handleMoodToggle = (mood: string) => {
    setSymptoms(prev => ({
      ...prev,
      mood: prev.mood.includes(mood)
        ? prev.mood.filter(m => m !== mood)
        : [...prev.mood, mood]
    }));
  };

  const handleEnergyLevel = (level: number) => {
    setSymptoms(prev => ({ ...prev, energyLevel: level }));
  };

  const handleLifestyleToggle = (factor: keyof typeof symptoms.lifestyle) => {
    setSymptoms(prev => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [factor]: !prev.lifestyle[factor]
      }
    }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setSymptoms(prev => ({ ...prev, notes: e.target.value }));
  };

  const handleSaveNotes = () => {
    // Here you would typically save to a database
    console.log("Saving symptoms data:", symptoms);
    alert("Symptoms saved successfully!");
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Symptom Tracking</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Log and monitor your physical and emotional symptoms
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Symptoms Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              Today's Symptoms
            </CardTitle>
            <CardDescription>Log your symptoms for {selectedDate.toLocaleDateString()}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="physical">Physical</TabsTrigger>
                <TabsTrigger value="emotional">Emotional</TabsTrigger>
              </TabsList>
              <TabsContent value="physical" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Pain Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Button
                            key={level}
                            variant={symptoms.painLevel === level ? "default" : "outline"}
                            size="sm"
                            className="flex-1"
                            onClick={() => handlePainLevel(level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Flow Intensity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {["Light", "Medium", "Heavy"].map((intensity) => (
                          <Button
                            key={intensity}
                            variant={symptoms.flowIntensity === intensity ? "default" : "outline"}
                            size="sm"
                            className="flex-1"
                            onClick={() => handleFlowIntensity(intensity)}
                          >
                            {intensity}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Physical Symptoms</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Cramps",
                          "Headache",
                          "Bloating",
                          "Breast Tenderness",
                          "Back Pain",
                          "Acne",
                          "Nausea",
                          "Fatigue"
                        ].map((symptom) => (
                          <Button
                            key={symptom}
                            variant={symptoms.physicalSymptoms.includes(symptom) ? "default" : "outline"}
                            size="sm"
                            className="justify-start"
                            onClick={() => handleSymptomToggle(symptom)}
                          >
                            {symptom}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="emotional" className="mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Mood</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Happy",
                          "Sad",
                          "Anxious",
                          "Irritable",
                          "Calm",
                          "Stressed"
                        ].map((mood) => (
                          <Button
                            key={mood}
                            variant={symptoms.mood.includes(mood) ? "default" : "outline"}
                            size="sm"
                            className="justify-start"
                            onClick={() => handleMoodToggle(mood)}
                          >
                            {mood}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Energy Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <Button
                            key={level}
                            variant={symptoms.energyLevel === level ? "default" : "outline"}
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEnergyLevel(level)}
                          >
                            {level}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Side Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lifestyle Factors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <Coffee className="h-4 w-4" />
                <span>Caffeine Intake</span>
                <Button 
                  variant={symptoms.lifestyle.caffeine ? "default" : "outline"} 
                  size="sm" 
                  className="ml-auto"
                  onClick={() => handleLifestyleToggle("caffeine")}
                >
                  {symptoms.lifestyle.caffeine ? "Logged" : "Log"}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Moon className="h-4 w-4" />
                <span>Sleep Quality</span>
                <Button 
                  variant={symptoms.lifestyle.sleep ? "default" : "outline"} 
                  size="sm" 
                  className="ml-auto"
                  onClick={() => handleLifestyleToggle("sleep")}
                >
                  {symptoms.lifestyle.sleep ? "Logged" : "Log"}
                </Button>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                <span>Exercise</span>
                <Button 
                  variant={symptoms.lifestyle.exercise ? "default" : "outline"} 
                  size="sm" 
                  className="ml-auto"
                  onClick={() => handleLifestyleToggle("exercise")}
                >
                  {symptoms.lifestyle.exercise ? "Logged" : "Log"}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Symptom History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {symptoms.physicalSymptoms.length > 0 ? (
                  symptoms.physicalSymptoms.map((symptom, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{symptom}</span>
                      <span className="text-sm text-muted-foreground">Today</span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center">No symptoms logged today</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Notes Section */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Notes</CardTitle>
          <CardDescription>Add any additional observations or notes</CardDescription>
        </CardHeader>
        <CardContent>
          <textarea
            className="w-full min-h-[100px] p-2 border rounded-md"
            placeholder="Add your notes here..."
            value={symptoms.notes}
            onChange={handleNotesChange}
          />
          <Button className="mt-4" onClick={handleSaveNotes}>Save Notes</Button>
        </CardContent>
      </Card>
    </div>
  );
} 