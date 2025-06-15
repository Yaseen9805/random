"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { periodStore } from "@/lib/period-store";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ClearDataPage() {
  const router = useRouter();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearData = () => {
    setIsClearing(true);
    periodStore.clearAllData();
    setTimeout(() => {
      setIsClearing(false);
      router.push('/periods');
    }, 1000);
  };

  return (
    <div className="container mx-auto py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Clear All Data</CardTitle>
          <CardDescription>
            This will permanently delete all your stored period tracking data, including:
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
            <li>Period entries</li>
            <li>Flow tracking data</li>
            <li>Temperature readings</li>
            <li>Medication records</li>
            <li>Reminders</li>
            <li>Analytics data</li>
          </ul>
          <div className="pt-4">
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={handleClearData}
              disabled={isClearing}
            >
              {isClearing ? 'Clearing Data...' : 'Clear All Data'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 