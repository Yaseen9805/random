
"use client";

import { useState, useEffect, useMemo } from "react";
import type { EducatePost, EducateCategory } from "@/services/educate";
import { EducatePostCard } from "./educate-post-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, FileText, PlusCircle, GraduationCap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CreateEducatePostForm } from "./create-educate-post-form";
import { initialSampleEducatePosts, educateCategories } from "@/services/educate"; 

const getEducatePostsFromStorage = (): EducatePost[] => {
  if (typeof window !== 'undefined') {
    const storedPostsJSON = localStorage.getItem("educatePosts");
    if (storedPostsJSON) {
      try {
        const parsedPosts = JSON.parse(storedPostsJSON) as Array<Partial<EducatePost> & { publicationDate: string | Date }>;
        return parsedPosts.map(post => ({
          id: post.id || crypto.randomUUID(),
          title: post.title || "Untitled",
          content: post.content || "",
          author: post.author || "Unknown Author",
          publicationDate: typeof post.publicationDate === 'string' ? post.publicationDate : new Date(post.publicationDate).toISOString(),
          category: post.category || educateCategories[0], // Default category if missing
          tags: Array.isArray(post.tags) ? post.tags : [],
          imageUrl: post.imageUrl,
          aiHint: post.aiHint,
        }));
      } catch (error) {
        console.error("Failed to parse posts from localStorage", error);
        return initialSampleEducatePosts.map(p => ({
            ...p,
            publicationDate: String(p.publicationDate),
            tags: Array.isArray(p.tags) ? p.tags : [],
        }));
      }
    }
  }
  return initialSampleEducatePosts.map(p => ({
      ...p,
      publicationDate: String(p.publicationDate),
      tags: Array.isArray(p.tags) ? p.tags : [],
  }));
};

const saveEducatePostsToStorage = (posts: EducatePost[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("educatePosts", JSON.stringify(posts));
  }
};

export function EducateList() {
  const [posts, setPosts] = useState<EducatePost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const loadedPosts = getEducatePostsFromStorage();
    setPosts(loadedPosts.sort((a, b) => new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()));
    setIsLoading(false);
  }, []);

  const handleAddPost = (newPostData: Omit<EducatePost, 'id' | 'author' | 'publicationDate' | 'imageUrl'> & { title: string; content: string; category: EducateCategory; tags?: string; imageUrl?: string }) => {
    const newPost: EducatePost = {
      id: crypto.randomUUID(),
      title: newPostData.title,
      content: newPostData.content,
      author: "Current User", 
      publicationDate: new Date().toISOString(),
      category: newPostData.category,
      imageUrl: newPostData.imageUrl || `https://placehold.co/600x300.png?text=${encodeURIComponent(newPostData.title)}`,
      aiHint: `article ${newPostData.category.toLowerCase().replace(/\s+/g, '')}`,
      tags: newPostData.tags ? newPostData.tags.split(',').map(tag => tag.trim()).filter(tag => tag) : [],
    };
    setPosts(prevPosts => {
      const updatedPosts = [newPost, ...prevPosts];
      saveEducatePostsToStorage(updatedPosts);
      return updatedPosts;
    });
    setIsCreateModalOpen(false);
  };

  const filteredPosts = useMemo(() => posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
  ), [posts, searchTerm]);

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
          placeholder="Search articles by title, author, category, or tags..."
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

      {educateCategories.map(category => {
        const postsInCategory = filteredPosts.filter(post => post.category === category);
        if (postsInCategory.length === 0 && searchTerm) return null; // Don't show empty categories when searching
        
        return (
          <section key={category} className="space-y-6">
            <h2 className="text-2xl font-semibold border-b-2 border-primary/30 pb-2 mb-4 flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              {category}
            </h2>
            {postsInCategory.length === 0 ? (
              <p className="text-muted-foreground">No articles found in this category{searchTerm ? " matching your search" : ""}.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {postsInCategory.map((post) => (
                  <EducatePostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </section>
        );
      })}

      {filteredPosts.length === 0 && !searchTerm && (
         <Alert className="mt-4">
          <FileText className="h-5 w-5" />
          <AlertTitle>No Articles Found</AlertTitle>
          <AlertDescription>
            There are no educational articles available yet. Why not create one?
          </AlertDescription>
        </Alert>
      )}
      
      {isCreateModalOpen && (
        <CreateEducatePostForm
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAddPost={handleAddPost}
        />
      )}
    </div>
  );
}
