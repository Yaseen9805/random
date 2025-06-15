"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, Filter, Flag, MessageCircle, Share2, ThumbsUp, Users } from "lucide-react";
import { useState } from "react";

interface Post {
  id: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  content: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  tags: string[];
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: number;
  image: string;
  tags: string[];
}

export default function CommunityPage() {
  const [selectedTab, setSelectedTab] = useState("discussions");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        avatar: "https://placehold.co/100x100.png",
        role: "Community Member"
      },
      content: "Just wanted to share my experience with managing period pain naturally. I've found that regular exercise and a balanced diet have made a huge difference. What works for you?",
      likes: 45,
      comments: 12,
      shares: 5,
      timestamp: "2 hours ago",
      tags: ["period pain", "natural remedies", "wellness"]
    },
    {
      id: "2",
      author: {
        name: "Dr. Emily Chen",
        avatar: "https://placehold.co/100x100.png",
        role: "Medical Expert"
      },
      content: "As a gynecologist, I often get questions about cycle tracking. Here are some key points to remember: 1) Track your symptoms 2) Note any changes 3) Consult a doctor for significant changes. Feel free to ask questions!",
      likes: 78,
      comments: 23,
      shares: 15,
      timestamp: "5 hours ago",
      tags: ["medical advice", "cycle tracking", "expert tips"]
    }
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostTags, setNewPostTags] = useState("");

  const groups: Group[] = [
    {
      id: "1",
      name: "Natural Period Care",
      description: "A supportive community focused on natural approaches to menstrual health.",
      members: 1234,
      image: "https://placehold.co/400x200.png",
      tags: ["natural remedies", "holistic health", "wellness"]
    },
    {
      id: "2",
      name: "PCOS Support Group",
      description: "Connect with others managing PCOS and share experiences and tips.",
      members: 856,
      image: "https://placehold.co/400x200.png",
      tags: ["PCOS", "support", "health"]
    }
  ];

  return (
    <div className="container mx-auto py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold">Community</h1>
        <p className="text-lg text-foreground/80 mt-2">
          Connect, share, and support each other
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-primary" />
                  Community Hub
                </CardTitle>
                <Button onClick={() => setShowCreateModal(true)}>Create Post</Button>
              </div>
              <CardDescription>Join the conversation and share your experiences</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="discussions">Discussions</TabsTrigger>
                  <TabsTrigger value="groups">Groups</TabsTrigger>
                  <TabsTrigger value="resources">Resources</TabsTrigger>
                </TabsList>

                <TabsContent value="discussions" className="mt-6">
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <Input
                        placeholder="Search discussions..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1"
                      />
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        Filter
                      </Button>
                    </div>

                    {posts.map((post) => (
                      <Card key={post.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <Avatar>
                              <AvatarImage src={post.author.avatar} />
                              <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold">{post.author.name}</h3>
                                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                                </div>
                                <span className="text-sm text-muted-foreground">{post.timestamp}</span>
                              </div>
                              <p className="mt-2">{post.content}</p>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {post.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-1 bg-primary/10 rounded-full text-xs"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                              <div className="flex items-center gap-4 mt-4">
                                <Button variant="ghost" size="sm">
                                  <ThumbsUp className="h-4 w-4 mr-2" />
                                  {post.likes}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MessageCircle className="h-4 w-4 mr-2" />
                                  {post.comments}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  {post.shares}
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <Flag className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="groups" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {groups.map((group) => (
                      <Card key={group.id}>
                        <CardContent className="p-0">
                          <div className="relative">
                            <img
                              src={group.image}
                              alt={group.name}
                              className="w-full h-32 object-cover rounded-t-lg"
                            />
                            <div className="absolute top-2 right-2">
                              <Button variant="secondary" size="sm">
                                Join Group
                              </Button>
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold">{group.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              {group.description}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <Users className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm text-muted-foreground">
                                {group.members} members
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {group.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-primary/10 rounded-full text-xs"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="resources" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Educational Articles</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Understanding Your Cycle</h4>
                          <p className="text-sm text-muted-foreground">
                            Learn about the different phases of your menstrual cycle and what to expect.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Managing Period Pain</h4>
                          <p className="text-sm text-muted-foreground">
                            Tips and strategies for managing menstrual discomfort.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Nutrition and Your Cycle</h4>
                          <p className="text-sm text-muted-foreground">
                            How to support your body through different cycle phases with proper nutrition.
                          </p>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Expert Q&A</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <h4 className="font-medium">Ask a Doctor</h4>
                          <p className="text-sm text-muted-foreground">
                            Get answers to your medical questions from qualified healthcare professionals.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Nutritionist Corner</h4>
                          <p className="text-sm text-muted-foreground">
                            Expert advice on diet and nutrition for menstrual health.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Mental Health Support</h4>
                          <p className="text-sm text-muted-foreground">
                            Professional guidance on managing emotional well-being during your cycle.
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Side Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Community Guidelines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Be Respectful</h4>
                <p className="text-sm text-muted-foreground">
                  Treat all community members with respect and kindness.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Share Responsibly</h4>
                <p className="text-sm text-muted-foreground">
                  Share accurate information and cite sources when possible.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Privacy First</h4>
                <p className="text-sm text-muted-foreground">
                  Respect others' privacy and don't share personal information.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trending Topics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">#NaturalRemedies</span>
                <span className="text-sm text-muted-foreground">245 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">#CycleTracking</span>
                <span className="text-sm text-muted-foreground">189 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">#PCOSSupport</span>
                <span className="text-sm text-muted-foreground">156 posts</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">#MentalHealth</span>
                <span className="text-sm text-muted-foreground">132 posts</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Community Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium">Virtual Support Group</h4>
                <p className="text-sm text-muted-foreground">
                  Weekly meetup for sharing experiences and support.
                </p>
                <p className="text-sm text-primary">Every Wednesday, 7 PM</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Expert Q&A Session</h4>
                <p className="text-sm text-muted-foreground">
                  Live session with Dr. Emily Chen on cycle health.
                </p>
                <p className="text-sm text-primary">Next Saturday, 2 PM</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Create Post Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a New Post</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="What's on your mind?"
              value={newPostContent}
              onChange={e => setNewPostContent(e.target.value)}
              rows={4}
            />
            <Input
              placeholder="Tags (comma separated)"
              value={newPostTags}
              onChange={e => setNewPostTags(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button
              onClick={() => {
                if (!newPostContent.trim()) return;
                setPosts([
                  {
                    id: Math.random().toString(36).substr(2, 9),
                    author: {
                      name: "You",
                      avatar: "https://placehold.co/100x100.png",
                      role: "Community Member"
                    },
                    content: newPostContent,
                    likes: 0,
                    comments: 0,
                    shares: 0,
                    timestamp: "Just now",
                    tags: newPostTags.split(",").map(t => t.trim()).filter(Boolean)
                  },
                  ...posts
                ]);
                setNewPostContent("");
                setNewPostTags("");
                setShowCreateModal(false);
              }}
              disabled={!newPostContent.trim()}
            >
              Post
            </Button>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 