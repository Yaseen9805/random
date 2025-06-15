
"use client";

import type { EducatePost } from "@/services/educate";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { summarizeExpertContent, type SummarizeExpertContentInput, type SummarizeExpertContentOutput } from "@/ai/flows/expert-blog-summary";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BookText, Loader2, CalendarDays, UserCircle, Tag, GraduationCap } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface EducatePostCardProps {
  post: EducatePost;
}

export function EducatePostCard({ post }: EducatePostCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showFullContentPreview, setShowFullContentPreview] = useState(false);
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (summary && !showFullContentPreview) {
      setShowFullContentPreview(true);
      return;
    }
    if (showFullContentPreview && summary) {
      setShowFullContentPreview(false);
      return;
    }

    setIsSummarizing(true);
    try {
      const contentForAI = {
        title: post.title,
        content: post.content,
        author: post.author,
        publicationDate: typeof post.publicationDate === 'string' ? post.publicationDate : new Date(post.publicationDate).toISOString(),
      };
      const input: SummarizeExpertContentInput = { expertContent: contentForAI };
      const result: SummarizeExpertContentOutput = await summarizeExpertContent(input);
      setSummary(result.summary);
      setShowFullContentPreview(true);
      toast({
        title: "Summary Ready",
        description: `Summary for "${post.title}" is available.`,
      });
    } catch (error) {
      console.error("Error summarizing content:", error);
      toast({
        title: "Error",
        description: "Could not summarize the content. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const summarizeButtonText = showFullContentPreview && summary ? "Hide Summary" : (summary ? "Show Summary" : "Summarize with AI");

  return (
    <Card className="shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out transform flex flex-col h-full">
      {post.imageUrl ? (
        <Link href={`/educate/${post.id}`} className="block">
          <Image
            src={post.imageUrl}
            alt={post.title}
            width={600}
            height={300}
            className="rounded-t-lg object-cover w-full aspect-[2/1]"
            data-ai-hint={post.aiHint || "educational content"}
          />
        </Link>
      ) : (
        <Link href={`/educate/${post.id}`} className="block rounded-t-lg">
          <div className="w-full aspect-[2/1] rounded-t-lg bg-muted flex flex-col items-center justify-center p-4 text-center">
            <GraduationCap className="h-12 w-12 text-primary mb-2" />
            <p className="text-sm font-semibold text-primary">{post.category}</p>
            {/* Removed "Visual representation for this article category." text */}
          </div>
        </Link>
      )}
      <CardHeader className="pb-3 pt-4 px-4 sm:px-6">
        <Link href={`/educate/${post.id}`}>
          <CardTitle className="text-lg sm:text-xl hover:text-primary transition-colors line-clamp-2">{post.title}</CardTitle>
        </Link>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
                <UserCircle className="h-3 w-3" />
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
                <CalendarDays className="h-3 w-3" />
                <span>{format(new Date(post.publicationDate), "MMM d, yyyy")}</span>
            </div>
             <div className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                <Badge variant="secondary" className="text-xs">{post.category}</Badge>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-4 sm:px-6 py-0">
        <p className="text-sm text-foreground/80 whitespace-pre-line leading-relaxed line-clamp-3 sm:line-clamp-4">
          {showFullContentPreview && summary ? summary : post.content}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row sm:flex-wrap gap-2 items-stretch pt-3 pb-4 px-4 sm:px-6 border-t mt-auto">
        <Button
          onClick={handleSummarize}
          disabled={isSummarizing}
          variant="outline"
          className="flex-1 text-xs sm:text-sm h-auto min-h-[2.5rem] whitespace-normal text-center"
        >
          {isSummarizing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BookText className="mr-2 h-4 w-4" />
          )}
          {isSummarizing ? "Summarizing..." : summarizeButtonText}
        </Button>
        <Button asChild className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm h-auto min-h-[2.5rem] whitespace-normal text-center">
           <Link href={`/educate/${post.id}`}>Read Full Article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
