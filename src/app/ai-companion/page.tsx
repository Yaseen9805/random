import { AiSupportChat } from "@/components/ai-support-chat";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Companion | SwaSakhi",
  description: "Chat with our AI for mental health support and guidance.",
};

export default function AiCompanionPage() {
  return (
    <div className="container mx-auto flex justify-center items-start h-full py-2 md:py-4">
      <AiSupportChat />
    </div>
  );
}
