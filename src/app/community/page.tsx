import { FaqSection } from "@/components/faq-section"; // Added import
import { ForumList } from "@/components/forum-list";
import { Separator } from "@/components/ui/separator"; // Added import
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Community & FAQs | SwaSakhi",
  description: "Connect with other mothers, share experiences, and find answers to common questions.",
};

export default function CommunityForumPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Community Forum</h1>
      </div>
      <ForumList />
      <Separator className="my-12" /> {/* Added separator for visual distinction */}
      <FaqSection /> {/* Added FAQ section */}
    </div>
  );
}
