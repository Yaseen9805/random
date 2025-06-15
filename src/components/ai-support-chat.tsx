"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { analyzeMoodAndProvideSupport, type MoodAnalysisInput, type MoodAnalysisOutput } from "@/ai/flows/mood-analysis-and-support";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2, User, Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
}

export function AiSupportChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if (scrollViewport) {
        requestAnimationFrame(() => {
          setTimeout(() => { // Defer to ensure scrollHeight is fully updated
            scrollViewport.scrollTop = scrollViewport.scrollHeight;
          }, 0);
        });
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initial AI greeting
    setMessages([
      {
        id: crypto.randomUUID(),
        text: "Hello! I'm your AI Companion. How are you feeling today? Feel free to share anything on your mind.",
        sender: "ai",
        timestamp: new Date(),
      },
    ]);
  }, []);


  const handleSendMessage = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      text: inputMessage,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const moodInput: MoodAnalysisInput = {
        mood: "User input",
        symptoms: userMessage.text,
        additionalContext: "User is interacting via chat.",
      };

      const aiResponse: MoodAnalysisOutput = await analyzeMoodAndProvideSupport(moodInput);

      const aiMessage: Message = {
        id: crypto.randomUUID(),
        text: aiResponse.supportSuggestions,
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error("Error getting AI response:", error);
      toast({
        title: "Error",
        description: "Could not get a response from your AI Companion. Please try again.",
        variant: "destructive",
      });
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        text: "I'm having a little trouble connecting right now. Please try sending your message again in a moment.",
        sender: "ai",
        timestamp: new Date(),
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl flex flex-col h-full">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-7 w-7 text-primary" /> AI Companion
        </CardTitle>
        <CardDescription>Your AI friend for mental wellness. Chat about your feelings and get support.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-end gap-2 ${
                  message.sender === "user" ? "justify-end" : ""
                }`}
              >
                {message.sender === "ai" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[75%] rounded-lg p-3 shadow ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-primary-foreground/70 text-right' : 'text-muted-foreground/70'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                {message.sender === "user" && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-secondary text-secondary-foreground">
                      <User size={18} />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-card">
        <div className="flex items-center gap-2">
          <Textarea
            placeholder="Type your message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            rows={1}
            className="flex-1 resize-none min-h-[40px]"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isLoading || !inputMessage.trim()} className="bg-primary hover:bg-primary/90 text-primary-foreground">
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </Card>
  );
}
