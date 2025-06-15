
"use client";

import { useState, useEffect } from "react";
import type { ForumPost } from "./forum-post-card"; 
import { ForumPostCard } from "./forum-post-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, MessageCircleQuestion, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CreateForumPostForm } from "./create-forum-post-form"; // Import the new form

// Sample data for demonstration
const initialSampleForumPosts: ForumPost[] = [
  {
    id: "1",
    author: { name: "NewMom23", avatarUrl: "https://placehold.co/40x40.png?text=NM" },
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    title: "Sleep deprivation is real! Any tips?",
    content: "My little one is 2 weeks old and I'm barely sleeping. How did you all cope with this phase? Any advice would be amazing!",
    likes: 15,
    comments: 7,
  },
  {
    id: "2",
    author: { name: "MamaBear88", avatarUrl: "https://placehold.co/40x40.png?text=MB" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3), // 3 hours ago
    title: "Feeling overwhelmed with breastfeeding",
    content: "Breastfeeding has been tougher than I expected. Sometimes I feel like giving up. Has anyone else felt this way? What helped you push through?",
    likes: 22,
    comments: 12,
  },
  {
    id: "3",
    author: { name: "SoonToBeParent", avatarUrl: "https://placehold.co/40x40.png?text=SP" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    title: "What are your hospital bag essentials?",
    content: "I'm in my third trimester and starting to pack my hospital bag. What are some must-have items that I might not be thinking of?",
    likes: 30,
    comments: 18,
  },
   {
    id: "4",
    author: { name: "SupportivePartner", avatarUrl: "https://placehold.co/40x40.png?text=P" },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
    title: "How can I best support my partner postpartum?",
    content: "My partner just gave birth, and I want to be as supportive as possible. Any advice from moms or other partners on what was most helpful?",
    likes: 45,
    comments: 25,
  }
];

const getForumPostsFromStorage = (): ForumPost[] => {
  if (typeof window !== 'undefined') {
    const storedPosts = localStorage.getItem("forumPosts");
    if (storedPosts) {
      try {
        return JSON.parse(storedPosts).map((post: any) => ({
          ...post,
          timestamp: new Date(post.timestamp), // Ensure date object
        }));
      } catch (error) {
        console.error("Failed to parse forum posts from localStorage", error);
        return initialSampleForumPosts.map(p => ({...p, timestamp: new Date(p.timestamp)}));
      }
    }
  }
  return initialSampleForumPosts.map(p => ({...p, timestamp: new Date(p.timestamp)}));
};

const saveForumPostsToStorage = (posts: ForumPost[]) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem("forumPosts", JSON.stringify(posts));
  }
};

export function ForumList() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "popular">("newest");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const loadedPosts = getForumPostsFromStorage();
    setPosts(loadedPosts.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()));
    setIsLoading(false);
  }, []);

  const handleAddPost = (newPostData: { title: string; content: string }) => {
    const newPost: ForumPost = {
      id: crypto.randomUUID(),
      title: newPostData.title,
      content: newPostData.content,
      author: { name: "Current User", avatarUrl: "https://placehold.co/40x40.png?text=CU" }, // Placeholder
      timestamp: new Date(),
      likes: 0,
      comments: 0,
    };
    setPosts(prevPosts => {
      const updatedPosts = [newPost, ...prevPosts]; // Add new post to the beginning
      saveForumPostsToStorage(updatedPosts);
      return updatedPosts;
    });
    setIsCreateModalOpen(false); 
  };

  const filteredAndSortedPosts = posts
    .filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popular") {
        // A more robust popularity score could be sum of likes and comments
        return (b.likes + b.comments) - (a.likes + a.comments);
      }
      // Default to newest
      return b.timestamp.getTime() - a.timestamp.getTime();
    });

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
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Input
          type="search"
          placeholder="Search forum posts..."
          className="flex-grow"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as "newest" | "popular")}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Sort by Newest</SelectItem>
            <SelectItem value="popular">Sort by Popular</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={() => setIsCreateModalOpen(true)} // Open the modal
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <PlusCircle className="mr-2 h-5 w-5" /> New Post
        </Button>
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <Alert className="mt-4">
          <MessageCircleQuestion className="h-5 w-5" />
          <AlertTitle>No Posts Found</AlertTitle>
          <AlertDescription>
            {searchTerm ? "No posts match your search." : "The forum is quiet right now. Be the first to start a discussion!"}
          </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-6">
          {filteredAndSortedPosts.map((post) => (
            <ForumPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
      {isCreateModalOpen && (
        <CreateForumPostForm
          open={isCreateModalOpen}
          onOpenChange={setIsCreateModalOpen}
          onAddPost={handleAddPost}
        />
      )}
    </div>
  );
}
