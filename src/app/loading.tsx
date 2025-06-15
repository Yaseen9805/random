import { HeartPulse } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-pink-100 to-purple-100 text-gray-800">
      <HeartPulse className="h-24 w-24 text-pink-500 mb-6" />
      <h1 className="text-5xl font-extrabold text-pink-600 mb-2">SwaSakhi</h1>
      <p className="text-lg text-gray-600">Empowering Your Wellness Journey.</p>
    </div>
  );
} 