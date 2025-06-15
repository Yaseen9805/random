"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Bell, Calendar, Clock, Droplet, Heart, Pill, Settings } from "lucide-react";
import { useState } from "react";

interface Reminder {
  id: string;
  type: string;
  title: string;
  description: string;
  time: string;
  days: string[];
  enabled: boolean;
  notificationType: 'push' | 'email' | 'both';
}

export default function RemindersPage() {
  const [selectedTab, setSelectedTab] = useState("active");
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: "1",
      type: "period",
      title: "Period Start Reminder",
      description: "Get notified 2 days before your expected period",
      time: "09:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      enabled: true,
      notificationType: "push"
    },
    {
      id: "2",
      type: "medication",
      title: "Birth Control Pill",
      description: "Daily reminder to take your birth control pill",
      time: "20:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      enabled: true,
      notificationType: "both"
    },
    {
      id: "3",
      type: "ovulation",
      title: "Ovulation Window",
      description: "Get notified when you're entering your fertile window",
      time: "10:00",
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      enabled: true,
      notificationType: "push"
    }
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newReminder, setNewReminder] = useState<Partial<Reminder>>({
    type: "period",
    title: "",
    description: "",
    time: "09:00",
    days: [],
    enabled: true,
    notificationType: "push"
  });

  const handleAddReminder = () => {
    if (!newReminder.title || !newReminder.description) return;

    const reminder: Reminder = {
      id: Math.random().toString(36).substr(2, 9),
      type: newReminder.type || "period",
      title: newReminder.title,
      description: newReminder.description,
      time: newReminder.time || "09:00",
      days: newReminder.days || [],
      enabled: true,
      notificationType: newReminder.notificationType || "push"
    };

    setReminders(prev => [...prev, reminder]);
    setShowAddModal(false);
    setNewReminder({
      type: "period",
      title: "",
      description: "",
      time: "09:00",
      days: [],
      enabled: true,
      notificationType: "push"
    });
  };

  const toggleReminder = (id: string) => {
    setReminders(prev =>
      prev.map(reminder =>
        reminder.id === id
          ? { ...reminder, enabled: !reminder.enabled }
          : reminder
      )
    );
  };

  const deleteReminder = (id: string) => {
    setReminders(prev => prev.filter(reminder => reminder.id !== id));
  };

  const getReminderIcon = (type: string) => {
    switch (type) {
      case "period":
        return <Droplet className="h-5 w-5" />;
      case "medication":
        return <Pill className="h-5 w-5" />;
      case "ovulation":
        return <Heart className="h-5 w-5" />;
      case "symptoms":
        return <Activity className="h-5 w-5" />;
      default:
        return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Reminders</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Set up and manage your cycle-related reminders
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-6 w-6 text-primary" />
                  Your Reminders
                </CardTitle>
                <Button onClick={() => setShowAddModal(true)}>
                  Add Reminder
                </Button>
              </div>
              <CardDescription>Manage your cycle-related notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="active">Active Reminders</TabsTrigger>
                  <TabsTrigger value="settings">Notification Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="active" className="mt-6">
                  <div className="space-y-4">
                    {reminders.map((reminder) => (
                      <Card key={reminder.id} className="relative">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                              <div className="mt-1">
                                {getReminderIcon(reminder.type)}
                              </div>
                              <div>
                                <h3 className="font-semibold">{reminder.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  {reminder.description}
                                </p>
                                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <Clock className="h-4 w-4" />
                                    {reminder.time}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {reminder.days.join(", ")}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                variant={reminder.enabled ? "default" : "outline"}
                                size="sm"
                                onClick={() => toggleReminder(reminder.id)}
                              >
                                {reminder.enabled ? "Enabled" : "Disabled"}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => deleteReminder(reminder.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    {reminders.length === 0 && (
                      <p className="text-center text-muted-foreground">
                        No reminders set up yet
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="settings" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Notification Preferences</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <h4 className="font-medium">Notification Types</h4>
                        <div className="space-y-2">
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span>Push Notifications</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input type="checkbox" defaultChecked />
                            <span>Email Notifications</span>
                          </label>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Quiet Hours</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm">Start Time</label>
                            <input
                              type="time"
                              className="w-full p-2 border rounded-md mt-1"
                              defaultValue="22:00"
                            />
                          </div>
                          <div>
                            <label className="text-sm">End Time</label>
                            <input
                              type="time"
                              className="w-full p-2 border rounded-md mt-1"
                              defaultValue="07:00"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="font-medium">Reminder Sounds</h4>
                        <select className="w-full p-2 border rounded-md">
                          <option>Gentle Chime</option>
                          <option>Soft Bell</option>
                          <option>Vibration Only</option>
                        </select>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start" onClick={() => setShowAddModal(true)}>
                <Bell className="h-4 w-4 mr-2" />
                Add New Reminder
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Settings className="h-4 w-4 mr-2" />
                Notification Settings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Reminder Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-primary" />
                  <span>Period Start/End</span>
                </div>
                <div className="flex items-center gap-2">
                  <Pill className="h-4 w-4 text-primary" />
                  <span>Medication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  <span>Ovulation</span>
                </div>
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span>Symptoms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Reminder Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <Card className="w-[400px]">
            <CardHeader>
              <CardTitle>Add New Reminder</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Reminder Type</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={newReminder.type}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="period">Period</option>
                  <option value="medication">Medication</option>
                  <option value="ovulation">Ovulation</option>
                  <option value="symptoms">Symptoms</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Title</label>
                <input
                  type="text"
                  className="w-full p-2 border rounded-md mt-1"
                  value={newReminder.title}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter reminder title"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full p-2 border rounded-md mt-1"
                  rows={3}
                  value={newReminder.description}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter reminder description"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Time</label>
                <input
                  type="time"
                  className="w-full p-2 border rounded-md mt-1"
                  value={newReminder.time}
                  onChange={(e) => setNewReminder(prev => ({ ...prev, time: e.target.value }))}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Days</label>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                    <label key={day} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newReminder.days?.includes(day)}
                        onChange={(e) => {
                          const days = newReminder.days || [];
                          const newDays = e.target.checked
                            ? [...days, day]
                            : days.filter(d => d !== day);
                          setNewReminder(prev => ({
                            ...prev,
                            days: newDays
                          }));
                        }}
                      />
                      <span className="text-sm">{day.slice(0, 3)}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Notification Type</label>
                <select
                  className="w-full p-2 border rounded-md mt-1"
                  value={newReminder.notificationType}
                  onChange={(e) => setNewReminder(prev => ({
                    ...prev,
                    notificationType: e.target.value as 'push' | 'email' | 'both'
                  }))}
                >
                  <option value="push">Push Notification</option>
                  <option value="email">Email</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddReminder}>
                  Add Reminder
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 