
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
import type { ForumPost } from "./forum-post-card"; // Assuming ForumPost type is exported here or from a types file

const createForumPostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(150),
  content: z.string().min(10, "Content must be at least 10 characters long.").max(5000),
});

type CreateForumPostFormValues = z.infer<typeof createForumPostSchema>;

interface CreateForumPostFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPost: (postData: { title: string; content: string }) => void;
}

export function CreateForumPostForm({ open, onOpenChange, onAddPost }: CreateForumPostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateForumPostFormValues>({
    resolver: zodResolver(createForumPostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const onSubmit: SubmitHandler<CreateForumPostFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      // Simulate API call or pass data to parent
      await new Promise(resolve => setTimeout(resolve, 600)); 
      
      onAddPost(data);

      toast({
        title: "Forum Post Published!",
        description: `Your post "${data.title}" is now live.`,
      });
      form.reset();
      onOpenChange(false); // Close the dialog
    } catch (error) {
      console.error("Error creating forum post:", error);
      toast({
        title: "Error",
        description: "Could not publish the forum post. Please try again.",
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
          <DialogTitle>Create New Forum Post</DialogTitle>
          <DialogDescription>
            Share your questions, thoughts, or experiences with the community.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="e.g., Questions about first trimester symptoms"
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
              placeholder="Write your post here..."
              rows={8}
              className={form.formState.errors.content ? "border-destructive" : ""}
            />
            {form.formState.errors.content && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.content.message}</p>
            )}
          </div>

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
