
'use server';

/**
 * @fileOverview Summarizes long expert content for quick understanding.
 *
 * - summarizeExpertContent - A function that summarizes expert content.
 * - SummarizeExpertContentInput - The input type for the summarizeExpertContent function.
 * - SummarizeExpertContentOutput - The return type for the summarizeExpertContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeExpertContentInputSchema = z.object({
  expertContent: z.object({ // Renamed from blogPost
    title: z.string(),
    content: z.string(),
    author: z.string(),
    publicationDate: z.string().describe("The publication date of the content, as an ISO string."),
  }).describe('The expert content to summarize.'),
});
export type SummarizeExpertContentInput = z.infer<typeof SummarizeExpertContentInputSchema>;

const SummarizeExpertContentOutputSchema = z.object({
  summary: z.string().describe('A short summary of the expert content.'),
});
export type SummarizeExpertContentOutput = z.infer<typeof SummarizeExpertContentOutputSchema>;

export async function summarizeExpertContent(input: SummarizeExpertContentInput): Promise<SummarizeExpertContentOutput> {
  return summarizeExpertContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeExpertContentPrompt', // Kept prompt name similar for consistency
  input: {schema: SummarizeExpertContentInputSchema},
  output: {schema: SummarizeExpertContentOutputSchema},
  prompt: `Summarize the following expert content in a concise paragraph:\n\nTitle: {{{expertContent.title}}}\nContent: {{{expertContent.content}}}\nAuthor: {{{expertContent.author}}}\nPublication Date: {{{expertContent.publicationDate}}}`,
});

const summarizeExpertContentFlow = ai.defineFlow(
  {
    name: 'summarizeExpertContentFlow', // Kept flow name similar
    inputSchema: SummarizeExpertContentInputSchema,
    outputSchema: SummarizeExpertContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
