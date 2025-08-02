'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing personalized art recommendations.
 *
 * - artRecommendations - A function that generates art recommendations based on user preferences and browsing history.
 * - ArtRecommendationsInput - The input type for the artRecommendations function.
 * - ArtRecommendationsOutput - The return type for the artRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArtRecommendationsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('A description of the user art preferences.'),
  browsingHistory: z
    .string()
    .describe('A description of the users browsing history.'),
});
export type ArtRecommendationsInput = z.infer<typeof ArtRecommendationsInputSchema>;

const ArtRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('A list of recommended art pieces.'),
});
export type ArtRecommendationsOutput = z.infer<typeof ArtRecommendationsOutputSchema>;

export async function artRecommendations(input: ArtRecommendationsInput): Promise<ArtRecommendationsOutput> {
  return artRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'artRecommendationsPrompt',
  input: {schema: ArtRecommendationsInputSchema},
  output: {schema: ArtRecommendationsOutputSchema},
  prompt: `You are an expert art recommender.

  Based on the user's preferences and browsing history, recommend art pieces that the user might enjoy.

  User Preferences: {{{userPreferences}}}
  Browsing History: {{{browsingHistory}}}

  Return a list of art pieces names.`,
});

const artRecommendationsFlow = ai.defineFlow(
  {
    name: 'artRecommendationsFlow',
    inputSchema: ArtRecommendationsInputSchema,
    outputSchema: ArtRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
