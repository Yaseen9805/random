"use client";

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EducatePost } from '@/services/educate';
import { initialSampleEducatePosts } from '@/services/educate';
import { format } from 'date-fns';
import { ArrowLeft, CalendarDays, Loader2, Tag, UserCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Function to get a single post, simulating fetching from storage/API
const getEducatePostById = (id: string): EducatePost | undefined => {
  if (typeof window !== 'undefined') {
    const storedPostsJSON = localStorage.getItem("educatePosts");
    let allPosts: EducatePost[] = initialSampleEducatePosts;
    if (storedPostsJSON) {
      try {
        const parsedPosts = JSON.parse(storedPostsJSON) as Array<Partial<EducatePost> & { publicationDate: string | Date }>;
         allPosts = parsedPosts.map(post => ({
          id: post.id || crypto.randomUUID(),
          title: post.title || "Untitled",
          content: post.content || "",
          author: post.author || "Unknown Author",
          publicationDate: typeof post.publicationDate === 'string' ? post.publicationDate : new Date(post.publicationDate).toISOString(),
          category: post.category || "Nutrition", // Default category if missing
          tags: Array.isArray(post.tags) ? post.tags : [],
          imageUrl: post.imageUrl,
          aiHint: post.aiHint,
        }));
      } catch (error) {
        console.error("Failed to parse posts from localStorage for single post fetch", error);
      }
    }
    return allPosts.find(post => post.id === id);
  }
  return initialSampleEducatePosts.find(post => post.id === id);
};


export default function EducatePostPage() {
  const params = useParams();
  const id = typeof params.id === 'string' ? params.id : undefined;
  const [post, setPost] = useState<EducatePost | null | undefined>(undefined); // undefined for loading, null for not found

  useEffect(() => {
    if (id) {
      const fetchedPost = getEducatePostById(id);
      setPost(fetchedPost);
      if (fetchedPost) {
        document.title = `${fetchedPost.title} | SwaSakhi Educate`;
      } else {
        document.title = "Post Not Found | SwaSakhi Educate";
      }
    }
  }, [id]);

  if (post === undefined) { // Loading state
    return (
      <div className="container mx-auto py-8 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-6">The article you are looking for does not exist or may have been moved.</p>
        <Button asChild variant="outline">
          <Link href="/educate">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Educate Section
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <Card className="shadow-xl overflow-hidden">
        {post.imageUrl && (
          <div className="w-full h-64 sm:h-80 md:h-96 relative">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              data-ai-hint={post.aiHint || "educational content detail"}
              priority
            />
          </div>
        )}
        <CardHeader className="p-6">
          <CardTitle className="text-3xl md:text-4xl mb-3">{post.title}</CardTitle>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground mb-4">
            <div className="flex items-center gap-2">
              <UserCircle className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              <span>{format(new Date(post.publicationDate), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <Badge variant="default">{post.category}</Badge>
            </div>
          </div>
           {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
              ))}
            </div>
          )}
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <article className="prose prose-sm sm:prose-base lg:prose-lg dark:prose-invert max-w-none whitespace-pre-line leading-relaxed text-foreground/90">
            {post.content}
          </article>
        </CardContent>
      </Card>
      <div className="mt-8 text-center">
        <Button asChild variant="outline">
          <Link href="/educate">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Educate Section
          </Link>
        </Button>
      </div>
    </div>
  );
}
