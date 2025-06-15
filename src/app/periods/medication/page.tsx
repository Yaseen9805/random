"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Pill } from "lucide-react";
import { useState } from "react";

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  notes?: string;
  reminders: {
    time: string;
    days: string[];
  };
}

interface MedicationLog {
  id: string;
  medicationId: string;
  date: string;
  time: string;
  taken: boolean;
  notes?: string;
}

export default function MedicationTrackingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("medications");
  const [medications, setMedications] = useState<Medication[]>([]);
  const [medicationLogs, setMedicationLogs] = useState<MedicationLog[]>([]);
  const [showMedicationModal, setShowMedicationModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [currentMedication, setCurrentMedication] = useState<Partial<Medication>>({
    name: "",
    dosage: "",
    frequency: "",
    startDate: new Date().toISOString().split('T')[0],
    reminders: {
      time: "",
      days: []
    }
  });
  const [selectedMedication, setSelectedMedication] = useState<string>("");

  const handleMedicationSubmit = () => {
    if (!currentMedication.name || !currentMedication.dosage || !currentMedication.frequency) return;

    const newMedication: Medication = {
      id: Math.random().toString(36).substr(2, 9),
      name: currentMedication.name,
      dosage: currentMedication.dosage,
      frequency: currentMedication.frequency,
      startDate: currentMedication.startDate || new Date().toISOString().split('T')[0],
      notes: currentMedication.notes,
      reminders: currentMedication.reminders || {
        time: "",
        days: []
      }
    };

    setMedications(prev => [...prev, newMedication]);
    setShowMedicationModal(false);
    setCurrentMedication({
      name: "",
      dosage: "",
      frequency: "",
      startDate: new Date().toISOString().split('T')[0],
      reminders: {
        time: "",
        days: []
      }
    });
  };

  const handleLogSubmit = () => {
    if (!selectedMedication || !date) return;

    const newLog: MedicationLog = {
      id: Math.random().toString(36).substr(2, 9),
      medicationId: selectedMedication,
      date: date.toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      taken: true
    };

    setMedicationLogs(prev => [...prev, newLog]);
    setShowLogModal(false);
    setSelectedMedication("");
  };

  const getMedicationName = (id: string) => {
    return medications.find(m => m.id === id)?.name || "Unknown Medication";
  };

  const getUpcomingReminders = () => {
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    
    return medications.filter(med => {
      const reminderDays = med.reminders.days;
      return reminderDays.includes(dayOfWeek);
    });
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Medication Tracking</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Manage your medications and track your adherence
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Tracking Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Pill className="h-6 w-6 text-primary" />
              Medication Management
            </CardTitle>
            <CardDescription>Track your medications and adherence</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="medications">Medications</TabsTrigger>
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="reminders">Reminders</TabsTrigger>
              </TabsList>
              <TabsContent value="medications" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Add Medication</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className="w-full"
                        onClick={() => setShowMedicationModal(true)}
                      >
                        Add New Medication
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Medications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {medications.map((medication) => (
                          <div key={medication.id} className="flex justify-between items-center p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{medication.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Dosage: {medication.dosage}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Frequency: {medication.frequency}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Started: {new Date(medication.startDate).toLocaleDateString()}
                              </p>
                              {medication.notes && (
                                <p className="text-sm text-muted-foreground mt-1">
                                  Notes: {medication.notes}
                                </p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  setSelectedMedication(medication.id);
                                  setShowLogModal(true);
                                }}
                              >
                                Log Dose
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setMedications(medications.filter(m => m.id !== medication.id));
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        ))}
                        {medications.length === 0 && (
                          <p className="text-center text-muted-foreground">
                            No medications added yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="logs" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medication Logs</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {medicationLogs
                          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                          .map((log) => (
                            <div key={log.id} className="flex justify-between items-center p-4 border rounded-lg">
                              <div>
                                <p className="font-medium">
                                  {getMedicationName(log.medicationId)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Date: {new Date(log.date).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Time: {log.time}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Status: {log.taken ? "Taken" : "Missed"}
                                </p>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => {
                                  setMedicationLogs(medicationLogs.filter(l => l.id !== log.id));
                                }}
                              >
                                Remove
                              </Button>
                            </div>
                          ))}
                        {medicationLogs.length === 0 && (
                          <p className="text-center text-muted-foreground">
                            No medication logs yet
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="reminders" className="mt-6">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Today's Reminders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {getUpcomingReminders().map((medication) => (
                          <div key={medication.id} className="flex items-center gap-4 p-4 border rounded-lg">
                            <AlertCircle className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">{medication.name}</p>
                              <p className="text-sm text-muted-foreground">
                                Time: {medication.reminders.time}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Dosage: {medication.dosage}
                              </p>
                            </div>
                          </div>
                        ))}
                        {getUpcomingReminders().length === 0 && (
                          <p className="text-center text-muted-foreground">
                            No reminders for today
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

        {/* Side Stats */}
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
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Active Medications:</span>
                <span className="font-medium">{medications.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Doses Logged Today:</span>
                <span className="font-medium">
                  {medicationLogs.filter(log => 
                    new Date(log.date).toDateString() === new Date().toDateString()
                  ).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Total Doses Logged:</span>
                <span className="font-medium">{medicationLogs.length}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Medication Modal */}
      {showMedicationModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Add Medication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Medication Name</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentMedication.name}
                  onChange={(e) => setCurrentMedication(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter medication name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Dosage</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentMedication.dosage}
                  onChange={(e) => setCurrentMedication(prev => ({ ...prev, dosage: e.target.value }))}
                  placeholder="Enter dosage"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Frequency</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentMedication.frequency}
                  onChange={(e) => setCurrentMedication(prev => ({ ...prev, frequency: e.target.value }))}
                >
                  <option value="">Select frequency</option>
                  <option value="Once daily">Once daily</option>
                  <option value="Twice daily">Twice daily</option>
                  <option value="Three times daily">Three times daily</option>
                  <option value="Four times daily">Four times daily</option>
                  <option value="As needed">As needed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Start Date</label>
                <input
                  type="date"
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentMedication.startDate}
                  onChange={(e) => setCurrentMedication(prev => ({ ...prev, startDate: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Reminder Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded-md mt-1"
                  value={currentMedication.reminders?.time}
                  onChange={(e) => setCurrentMedication(prev => ({
                    ...prev,
                    reminders: { ...prev.reminders, time: e.target.value }
                  }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Reminder Days</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={currentMedication.reminders?.days.includes(day)}
                        onChange={(e) => {
                          const days = currentMedication.reminders?.days || [];
                          const newDays = e.target.checked
                            ? [...days, day]
                            : days.filter(d => d !== day);
                          setCurrentMedication(prev => ({
                            ...prev,
                            reminders: { ...prev.reminders, days: newDays }
                          }));
                        }}
                      />
                      <span className="text-sm">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <textarea
                  className="w-full p-2 border rounded-md mt-1"
                  rows={3}
                  value={currentMedication.notes}
                  onChange={(e) => setCurrentMedication(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Add any additional notes..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowMedicationModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleMedicationSubmit}>
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Log Modal */}
      {showLogModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Log Medication</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Medication</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={selectedMedication}
                  onChange={(e) => setSelectedMedication(e.target.value)}
                >
                  <option value="">Select medication</option>
                  {medications.map((med) => (
                    <option key={med.id} value={med.id}>
                      {med.name} - {med.dosage}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowLogModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleLogSubmit}>
                  Log Dose
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 