
"use client";

import { useState, useEffect } from "react";
import type { BlogPost } from "@/services/blog";
import { BlogPostCard } from "./blog-post-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileText, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateBlogPostForm } from "./create-blog-post-form";
import { initialSampleBlogPosts } from "@/services/blog"; // Using initial sample data

// Function to get blog posts from localStorage or fallback to initial samples
const getBlogPostsFromStorage = (): BlogPost[] => {
  if (typeof window !== 'undefined') {
    const storedPostsJSON = localStorage.getItem("blogPosts");
    if (storedPostsJSON) {
      try {
        const parsedPosts = JSON.parse(storedPostsJSON) as Array<Partial<BlogPost> & { publicationDate: string | Date }>;
        // Ensure publicationDate is a string and tags is an array
        return parsedPosts.map(post => ({
          id: post.id || crypto.randomUUID(),
          title: post.title || "Untitled",
          content: post.content || "",
          author: post.author || "Unknown Author",
          publicationDate: typeof post.publicationDate === 'string' ? post.publicationDate : new Date(post.publicationDate).toISOString(),
          tags: Array.isArray(post.tags) ? post.tags : [],
          imageUrl: post.imageUrl,
          aiHint: post.aiHint,
        }));
      } catch (error) {
        console.error("Failed to parse blog posts from localStorage", error);
        // Fallback to initial sample posts if parsing fails
        return initialSampleBlogPosts.map(p => ({
            ...p,
            publicationDate: String(p.publicationDate), // Ensure it's a string
            tags: Array.isArray(p.tags) ? p.tags : [],
        }));
      }
    }
  }
  // Fallback for SSR or if nothing in localStorage
  return initialSampleBlogPosts.map(p => ({
      ...p,
      publicationDate: String(p.publicationDate), // Ensure it's a string
      tags: Array.isArray(p.tags) ? p.tags : [],
  }));
};

// Function to save blog posts to localStorage
const saveBlogPostsToStorage = (posts: BlogPost[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }
};

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const loadedPosts = getBlogPostsFromStorage();
    // Sort posts by newest first (publicationDate is a string, convert to Date for sorting)
    setPosts(loadedPosts.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()));
    setIsLoading(false);
  }, []);

  const handleAddPost = (newPostData: Omit<BlogPost, 'id' | 'author' | 'publicationDate' | 'tags' | 'imageUrl'> & { title: string; content: string; tags?: string; imageUrl?: string }) => {
    const newPost: BlogPost = {
      id: crypto.randomUUID(),
      title: newPostData.title,
      content: newPostData.content,
      author: "Current User", // Placeholder, replace with actual user data
      publicationDate: new Date().toISOString(), // This is already a string
      imageUrl: newPostData.imageUrl || `https://placehold.co/600x400.png?text=${encodeURIComponent(newPostData.title)}`, // Default image
      tags: newPostData.tags ? newPostData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    };
    setPosts(prevPosts => {
      const updatedPosts = [newPost, ...prevPosts];
      saveBlogPostsToStorage(updatedPosts);
      return updatedPosts;
    });
    setIsCreateModalOpen(false); // Close modal after adding
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mt-4">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          type="search"
          placeholder="Search articles by title, author, content, or tags..."
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> New Post
        </Button>
      </div>

      {filteredPosts.length === 0 ? (
        <Alert className="mt-4">
          <FileText className="h-5 w-5" />
          <AlertTitle>No Blog Posts Found</AlertTitle>
          <AlertDescription>
            {searchTerm ? "No posts match your search criteria." : "There are no blog posts available yet. Why not create one?"}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      
      {isCreateModalOpen && (
        <CreateBlogPostForm
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAddPost={handleAddPost}
        />
      )}
    </div>
  );
}
