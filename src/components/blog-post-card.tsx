
"use client";

import type { BlogPost } from "@/services/blog";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { summarizeExpertContent, type SummarizeExpertContentInput, type SummarizeExpertContentOutput } from "@/ai/flows/expert-blog-summary";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { BookText, Loader2, CalendarDays, UserCircle } from "lucide-react";
import { format } from "date-fns";

interface BlogPostCardProps {
  post: BlogPost;
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [showFullPost, setShowFullPost] = useState(false); 
  const { toast } = useToast();

  const handleSummarize = async () => {
    if (summary && showFullPost) { 
      setShowFullPost(false); 
      return;
    }
    if (summary && !showFullPost) { 
        setShowFullPost(true); 
        return;
    }

    setIsSummarizing(true);
    try {
      const contentForAI = { // Renamed from blogPostForAI for clarity
        title: post.title,
        content: post.content,
        author: post.author,
        publicationDate: typeof post.publicationDate === 'string' ? post.publicationDate : new Date(post.publicationDate).toISOString(),
      };
      const input: SummarizeExpertContentInput = { expertContent: contentForAI }; // Changed from blogPost to expertContent
      const result: SummarizeExpertContentOutput = await summarizeExpertContent(input); // Changed function name
      setSummary(result.summary);
      setShowFullPost(true); 
      toast({
        title: "Summary Ready",
        description: `Summary for "${post.title}" is available.`,
      });
    } catch (error) {
      console.error("Error summarizing blog post:", error);
      toast({
        title: "Error",
        description: "Could not summarize the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSummarizing(false);
    }
  };

  const displayContent = showFullPost && summary ? summary : `${post.content.substring(0, 200)}...`;
  const buttonText = showFullPost && summary ? "Hide Summary" : (summary ? "Show Summary" : "Summarize with AI");
  
  return (
    <Card className="shadow-lg transition-all hover:shadow-xl flex flex-col">
      <CardHeader>
        <CardTitle className="text-2xl">{post.title}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
            <div className="flex items-center gap-1">
                <UserCircle className="h-4 w-4" />
                <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                <span>{format(new Date(post.publicationDate), "MMMM d, yyyy")}</span>
            </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-foreground/80 whitespace-pre-line leading-relaxed">
          {displayContent}
        </p>
        {post.content.length > 200 && !(showFullPost && summary) && (
           <Button variant="link" className="p-0 h-auto text-primary hover:text-primary/80 mt-2" onClick={() => { setSummary(null); setShowFullPost(true); /* This logic might need review for full post display without summary */}}>
            Read More
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row gap-2 items-stretch">
        <Button 
          onClick={handleSummarize} 
          disabled={isSummarizing} 
          variant="outline"
          className="flex-1"
        >
          {isSummarizing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <BookText className="mr-2 h-4 w-4" />
          )}
          {isSummarizing ? "Summarizing..." : buttonText}
        </Button>
         {showFullPost && summary && (
           <Button onClick={() => {setShowFullPost(false); /* This should ideally show the full post content, not hide summary */}} className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
            Read Full Article
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
