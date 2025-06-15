
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp, Share2 } from "lucide-react";
import { formatDistanceToNow } from 'date-fns';
import Image from "next/image"; // Import next/image

export interface ForumPost {
  id: string;
  author: {
    name: string;
    avatarUrl?: string;
  };
  timestamp: Date;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

interface ForumPostCardProps {
  post: ForumPost;
}

export function ForumPostCard({ post }: ForumPostCardProps) {
  return (
    <Card className="shadow-md hover:shadow-lg hover:-translate-y-1 transform transition-all duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-start gap-3 space-y-0 pb-3">
        <Avatar className="h-10 w-10 border">
          {post.author.avatarUrl ? (
            <Image 
              src={post.author.avatarUrl} 
              alt={post.author.name} 
              width={40} 
              height={40} 
              className="rounded-full object-cover"
              data-ai-hint="profile avatar" 
            />
          ) : (
            <AvatarFallback>{post.author.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          )}
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-lg">{post.title}</CardTitle>
          <CardDescription className="text-xs">
            By {post.author.name} &bull; {formatDistanceToNow(post.timestamp, { addSuffix: true })}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-foreground/90 line-clamp-4">{post.content}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-3 border-t">
        <div className="flex gap-4 text-sm text-muted-foreground">
          <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-primary">
            <ThumbsUp className="h-4 w-4" /> {post.likes}
          </Button>
          <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-primary">
            <MessageSquare className="h-4 w-4" /> {post.comments}
          </Button>
        </div>
        <Button variant="ghost" size="sm" className="flex items-center gap-1 hover:text-primary">
          <Share2 className="h-4 w-4" /> Share
        </Button>
      </CardFooter>
    </Card>
  );
}
