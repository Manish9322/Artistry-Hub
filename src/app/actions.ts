"use server";

import { artRecommendations, type ArtRecommendationsInput, type ArtRecommendationsOutput } from "@/ai/flows/art-recommendations";

export async function getArtRecommendations(input: ArtRecommendationsInput): Promise<ArtRecommendationsOutput> {
    try {
        const output = await artRecommendations(input);
        return output;
    } catch (error) {
        console.error("Error getting art recommendations:", error);
        // In a real app, you might want to handle different error types
        // and return a more specific error message.
        return { recommendations: [] };
    }
}
