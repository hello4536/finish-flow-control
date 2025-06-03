
import React from "react";
import { Youtube } from "lucide-react";

export interface VideoReview {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  videoId: string;
  creator: string;
  thumbnail: string;
  length: string;
}

export const autoBodyVideoReviews: VideoReview[] = [
  {
    id: 201,
    title: "Best Automotive Paint Guns Comparison",
    description: "Professional review of top-tier automotive spray guns, comparing HVLP, LVLP, and conventional systems.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "equipment-reviews",
    videoId: "dQw4w9WgXcQ",
    creator: "Auto Body Pros",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    length: "22:15"
  },
  {
    id: 202,
    title: "Color Matching Techniques Masterclass",
    description: "Advanced color matching techniques using spectrophotometer technology and traditional methods.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "techniques",
    videoId: "dQw4w9WgXcQ",
    creator: "Paint Tech Academy",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    length: "28:43"
  },
  {
    id: 203,
    title: "Spray Booth Setup and Maintenance",
    description: "Complete guide to setting up and maintaining automotive spray booths for optimal performance.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "equipment-reviews",
    videoId: "dQw4w9WgXcQ",
    creator: "Booth Master",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    length: "19:27"
  },
  {
    id: 204,
    title: "Automotive Paint System Chemistry",
    description: "Understanding the chemistry behind modern automotive paints, primers, and clear coats.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "education",
    videoId: "dQw4w9WgXcQ",
    creator: "Chemical Coating Science",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    length: "31:12"
  },
  {
    id: 205,
    title: "Surface Preparation Tools Review",
    description: "Testing and reviewing the latest surface preparation tools and sanders for automotive applications.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "equipment-reviews",
    videoId: "dQw4w9WgXcQ",
    creator: "Tool Test Garage",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    length: "16:54"
  },
  {
    id: 206,
    title: "Troubleshooting Paint Defects",
    description: "Real-world examples of paint defects, their causes, and step-by-step correction procedures.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "troubleshooting",
    videoId: "dQw4w9WgXcQ",
    creator: "Defect Detective",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    length: "25:38"
  }
];
