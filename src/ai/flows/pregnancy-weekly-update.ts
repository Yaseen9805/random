'use server';
/**
 * @fileOverview Generates weekly pregnancy updates including baby development, mother's changes, and tips.
 *
 * - getPregnancyWeeklyUpdate - A function that provides weekly pregnancy information.
 * - PregnancyWeeklyUpdateInput - The input type for the function.
 * - PregnancyWeeklyUpdateOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PregnancyWeeklyUpdateInputSchema = z.object({
  pregnancyWeek: z.number().min(1).max(42).describe('The current week of pregnancy (1-42).'),
});
export type PregnancyWeeklyUpdateInput = z.infer<typeof PregnancyWeeklyUpdateInputSchema>;

const PregnancyWeeklyUpdateOutputSchema = z.object({
  babyDevelopment: z.string().describe("Detailed information about the baby's development during this week."),
  motherChanges: z.string().describe("Information about common physical and emotional changes the mother might experience this week."),
  babySizeFruit: z.string().describe("A common fruit or vegetable that is comparable in size to the baby this week (e.g., 'a poppy seed', 'a blueberry', 'a lemon', 'an avocado'). Keep it concise."),
  tips: z.array(z.string()).min(2).max(4).describe("A few short, actionable tips relevant to this week of pregnancy. Provide 2 to 4 tips."),
});
export type PregnancyWeeklyUpdateOutput = z.infer<typeof PregnancyWeeklyUpdateOutputSchema>;

export async function getPregnancyWeeklyUpdate(input: PregnancyWeeklyUpdateInput): Promise<PregnancyWeeklyUpdateOutput> {
  return pregnancyWeeklyUpdateFlow(input);
}

const prompt = ai.definePrompt({
  name: 'pregnancyWeeklyUpdatePrompt',
  input: {schema: PregnancyWeeklyUpdateInputSchema},
  output: {schema: PregnancyWeeklyUpdateOutputSchema},
  prompt: `You are a helpful and empathetic AI assistant providing information for pregnant individuals.
Provide a detailed update for week {{{pregnancyWeek}}} of pregnancy.

Focus on:
1.  Baby's Development: Describe key milestones, size, and what the baby might be doing.
2.  Mother's Changes: Discuss common physical symptoms, emotional changes, and what the mother might be feeling.
3.  Baby Size Comparison: Compare the baby's size to a common fruit or vegetable (e.g., "a poppy seed", "a large mango").
4.  Tips: Offer 2-4 concise, actionable, and supportive tips for this specific week.

Ensure the tone is nurturing, informative, and easy to understand. Avoid overly medical jargon unless explained simply.
The information should be generally applicable and supportive.
Week of pregnancy: {{{pregnancyWeek}}}
`,
});

const pregnancyWeeklyUpdateFlow = ai.defineFlow(
  {
    name: 'pregnancyWeeklyUpdateFlow',
    inputSchema: PregnancyWeeklyUpdateInputSchema,
    outputSchema: PregnancyWeeklyUpdateOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
        throw new Error("Failed to generate pregnancy update from AI.");
    }
    return output;
  }
);
