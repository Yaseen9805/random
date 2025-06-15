
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import type { BlogPost } from "@/services/blog";

const createBlogPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(100),
  content: z.string().min(20, "Content must be at least 20 characters long.").max(5000),
  tags: z.string().optional(), // Comma-separated tags
  // imageUrl: z.string().url("Please enter a valid image URL.").optional(), // Future use
});

type CreateBlogPostFormValues = z.infer<typeof createBlogPostSchema>;

interface CreateBlogPostFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPost: (postData: Omit<BlogPost, 'id' | 'author' | 'publicationDate' | 'tags' | 'imageUrl'> & { title: string; content: string; tags?: string; imageUrl?: string }) => void;
}

export function CreateBlogPostForm({ open, onOpenChange, onAddPost }: CreateBlogPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateBlogPostFormValues>({
    resolver: zodResolver(createBlogPostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
    },
  });

  const onSubmit: SubmitHandler<CreateBlogPostFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // In a real app, this would be an API call
      // For now, we simulate it and pass data to the parent
      await new Promise(resolve => setTimeout(resolve, 700)); 
      
      onAddPost({
        title: data.title,
        content: data.content,
        tags: data.tags,
        // imageUrl: data.imageUrl, // For future image upload feature
      });

      toast({
        title: "Blog Post Published!",
        description: `"${data.title}" is now live.`,
      });
      form.reset();
      onOpenChange(false); // Close the dialog
    } catch (error) {
      console.error("Error creating blog post:", error);
      toast({
        title: "Error",
        description: "Could not publish the blog post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>
            Share your thoughts and experiences with the community. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="title">Blog Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="e.g., My Journey Through the First Trimester"
              className={form.formState.errors.title ? "border-destructive" : ""}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...form.register("content")}
              placeholder="Write your blog post here..."
              rows={10}
              className={form.formState.errors.content ? "border-destructive" : ""}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.content.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="tags">Tags (Optional, comma-separated)</Label>
            <Input
              id="tags"
              {...form.register("tags")}
              placeholder="e.g., pregnancy, mental health, tips"
            />
             {form.formState.errors.tags && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.tags.message}</p>
            )}
          </div>

          {/* Placeholder for Image Upload - Future Feature
          <div>
            <Label htmlFor="imageUrl">Image URL (Optional)</Label>
            <Input
              id="imageUrl"
              {...form.register("imageUrl")}
              placeholder="https://example.com/your-image.png"
            />
            {form.formState.errors.imageUrl && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.imageUrl.message}</p>
            )}
          </div>
          */}

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => { form.reset(); onOpenChange(false); }}>Cancel</Button>
            <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground">
              {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Publish Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

