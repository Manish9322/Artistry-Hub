"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getArtRecommendations } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const artRecommendationsSchema = z.object({
  userPreferences: z.string().min(10, "Please describe your preferences in a bit more detail."),
  browsingHistory: z.string().min(10, "Please describe your browsing history in a bit more detail."),
});

type ArtRecommendationsFormValues = z.infer<typeof artRecommendationsSchema>;

export function ArtRecommendationsForm() {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ArtRecommendationsFormValues>({
    resolver: zodResolver(artRecommendationsSchema),
    defaultValues: {
      userPreferences: "",
      browsingHistory: "",
    },
  });

  async function onSubmit(data: ArtRecommendationsFormValues) {
    setIsLoading(true);
    setRecommendations([]);

    try {
      const result = await getArtRecommendations(data);
      if (result.recommendations && result.recommendations.length > 0) {
        setRecommendations(result.recommendations);
      } else {
        toast({
          variant: "destructive",
          title: "No Recommendations Found",
          description: "We couldn't generate recommendations based on your input. Please try refining your descriptions.",
        });
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "An Error Occurred",
        description: "An unexpected error occurred while fetching recommendations. Please try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-primary/20">
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Personalized Art Recommendations</CardTitle>
        <CardDescription>Tell us about your taste, and our AI will suggest art you'll love.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userPreferences"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Art Preferences</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'I love intricate floral patterns, traditional Indian motifs, and vibrant colors.'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="browsingHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recent Art You've Admired</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., 'I've been looking at a lot of bridal mehndi designs and geometric rangoli.'" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Recommendations...
                </>
              ) : (
                "Get Recommendations"
              )}
            </Button>
          </form>
        </Form>
        
        {recommendations.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2 font-headline">Here are your recommendations:</h3>
            <div className="flex flex-wrap gap-2">
              {recommendations.map((rec, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">{rec}</Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
