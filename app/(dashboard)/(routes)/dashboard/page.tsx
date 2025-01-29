// Protected
"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Code,
  ImageIcon,
  MessageSquare,
  Music,
  VideoIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    href: "/conversation",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    href: "/image_generation",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    href: "/video_generation",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
  },
  {
    label: "Music Generation",
    icon: Music,
    href: "/music_generation",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    href: "/code_generation",
    color: "text-gray-600",
    bgColor: "bg-gray-500/10",
  },
];

const DashboardPage = () => {
  const router = useRouter();

  return (
    <>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          Unlock the potential of AI
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Unleash innovation and push boundaries with the power of AI.
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {tools.map((tool) => (
          <Card
            onClick={() => router.push(tool.href)}
            key={tool.href}
            className="p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                <tool.icon className={cn("w-8 h-8", tool.color)} />
              </div>
              <div className="font-semibold">{tool.label}</div>
            </div>
            <ArrowRight className="w-6 h-6" />
          </Card>
        ))}
      </div>
    </>
  );
};
export default DashboardPage;
