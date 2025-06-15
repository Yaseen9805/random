"use client";

import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addDays, subMonths, addYears, format, isValid, parseISO } from "date-fns";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const calculationMethods = ["lmp", "conceptionDate"] as const;

const lmpSchema = z.object({
  calculationMethod: z.literal(calculationMethods[0]),
  lmpDate: z.date({ required_error: "Please select your Last Menstrual Period date." }),
});

const conceptionDateSchema = z.object({
  calculationMethod: z.literal(calculationMethods[1]),
  conceptionDate: z.date({ required_error: "Please select your estimated conception date." }),
});

const dueDateSchema = z.discriminatedUnion("calculationMethod", [lmpSchema, conceptionDateSchema]);

type DueDateFormValues = z.infer<typeof dueDateSchema>;

export function DueDateCalculatorForm() {
  const [calculatedDueDate, setCalculatedDueDate] = useState<Date | null>(null);
  const [calculationMethod, setCalculationMethod] = useState<typeof calculationMethods[number]>("lmp");
  const { toast } = useToast();

  const form = useForm<DueDateFormValues>({
    resolver: zodResolver(dueDateSchema),
    defaultValues: {
      calculationMethod: "lmp",
    },
  });

  const onSubmit: SubmitHandler<DueDateFormValues> = (data) => {
    let dueDate: Date;
    if (data.calculationMethod === "lmp") {
      // Naegele's rule: LMP date + 280 days (or LMP - 3 months + 7 days + 1 year)
      dueDate = addDays(data.lmpDate, 280);
    } else {
      // Conception date + 266 days
      dueDate = addDays(data.conceptionDate, 266);
    }

    if (isValid(dueDate)) {
      setCalculatedDueDate(dueDate);
      toast({
        title: "Due Date Calculated!",
        description: `Your estimated due date is ${format(dueDate, "MMMM d, yyyy")}.`,
      });
    } else {
      toast({
        title: "Error",
        description: "Could not calculate due date. Please check your input.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle>Estimate Your Due Date</CardTitle>
        <CardDescription>
          Choose your calculation method and enter the relevant date.
        </CardDescription>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Calculation Method</Label>
            <Controller
              name="calculationMethod"
              control={form.control}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={(value) => {
                    field.onChange(value as typeof calculationMethods[number]);
                    setCalculationMethod(value as typeof calculationMethods[number]);
                    setCalculatedDueDate(null); // Reset due date on method change
                    form.reset({ // Reset form specific fields
                        calculationMethod: value as typeof calculationMethods[number],
                        lmpDate: undefined,
                        conceptionDate: undefined
                    });
                  }}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lmp" id="lmp" />
                    <Label htmlFor="lmp">Last Menstrual Period (LMP)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="conceptionDate" id="conceptionDate" />
                    <Label htmlFor="conceptionDate">Conception Date</Label>
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {calculationMethod === "lmp" && (
            <div className="space-y-2">
              <Label htmlFor="lmpDate">Last Menstrual Period Date</Label>
              <Controller
                name="lmpDate"
                control={form.control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(date) => field.onChange(date)}
                        initialFocus
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {form.formState.errors.lmpDate && (
                <p className="text-sm text-destructive">{form.formState.errors.lmpDate.message}</p>
              )}
            </div>
          )}

          {calculationMethod === "conceptionDate" && (
            <div className="space-y-2">
              <Label htmlFor="conceptionDate">Estimated Conception Date</Label>
              <Controller
                name="conceptionDate"
                control={form.control}
                render={({ field }) => (
                   <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {form.formState.errors.conceptionDate && (
                <p className="text-sm text-destructive">{form.formState.errors.conceptionDate.message}</p>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            Calculate Due Date
          </Button>
        </CardFooter>
      </form>

      {calculatedDueDate && (
        <CardContent className="mt-6 border-t pt-6 text-center">
          <h3 className="text-lg font-semibold mb-2">Your Estimated Due Date:</h3>
          <p className="text-2xl font-bold text-primary">
            {format(calculatedDueDate, "MMMM d, yyyy")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            ({format(calculatedDueDate, "EEEE")})
          </p>
        </CardContent>
      )}
    </Card>
  );
}
