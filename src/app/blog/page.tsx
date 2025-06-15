import { BlogList } from "@/components/blog-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expert Blog | SwaSakhi",
  description: "Read articles, experiences, and tips from experts and fellow users.",
};

export default function BlogPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">SwaSakhi Blog</h1>
      </div>
      <BlogList />
    </div>
  );
}
