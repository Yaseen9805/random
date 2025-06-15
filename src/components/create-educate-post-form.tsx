
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
import type { EducatePost, EducateCategory } from "@/services/educate";
import { educateCategories } from "@/services/educate";

const createEducatePostSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long.").max(100),
  content: z.string().min(20, "Content must be at least 20 characters long.").max(10000),
  category: z.enum(educateCategories, { required_error: "Please select a category." }),
  tags: z.string().optional(), // Comma-separated tags
  // imageUrl: z.string().url("Please enter a valid image URL.").optional(), // Future use
});

type CreateEducatePostFormValues = z.infer<typeof createEducatePostSchema>;

interface CreateEducatePostFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddPost: (postData: Omit<EducatePost, 'id' | 'author' | 'publicationDate' | 'imageUrl'> & { title: string; content: string; category: EducateCategory; tags?: string; imageUrl?: string }) => void;
}

export function CreateEducatePostForm({ open, onOpenChange, onAddPost }: CreateEducatePostFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<CreateEducatePostFormValues>({
    resolver: zodResolver(createEducatePostSchema),
    defaultValues: {
      title: "",
      content: "",
      tags: "",
      category: undefined,
    },
  });

  const onSubmit: SubmitHandler<CreateEducatePostFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 700)); 
      
      onAddPost({
        title: data.title,
        content: data.content,
        category: data.category,
        tags: data.tags,
      });

      toast({
        title: "Post Published!",
        description: `"${data.title}" is now live in the Educate section.`,
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating post:", error);
      toast({
        title: "Error",
        description: "Could not publish the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      if (!isOpen) form.reset(); // Reset form if dialog is closed externally
      onOpenChange(isOpen);
    }}>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Educate Post</DialogTitle>
          <DialogDescription>
            Share valuable information with the community. Fill in the details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <Label htmlFor="title">Post Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="e.g., Understanding Your First Trimester"
              className={form.formState.errors.title ? "border-destructive" : ""}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Controller
              name="category"
              control={form.control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value || ""}>
                  <SelectTrigger id="category" className={form.formState.errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {educateCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.category && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...form.register("content")}
              placeholder="Write your educational content here..."
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
              placeholder="e.g., pregnancy, nutrition, newborn"
            />
             {form.formState.errors.tags && (
              <p className="text-sm text-destructive mt-1">{form.formState.errors.tags.message}</p>
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
