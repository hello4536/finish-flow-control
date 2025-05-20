
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

export const videoReviews: VideoReview[] = [
  {
    id: 101,
    title: "Top 5 Wood Stains Comparison",
    description: "A detailed comparison of the most popular wood stains on the market, with real wood samples and durability tests.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "product-reviews",
    videoId: "NnM0w-gdm3k",
    creator: "Wood Whisperer",
    thumbnail: "https://img.youtube.com/vi/NnM0w-gdm3k/maxresdefault.jpg",
    length: "18:42"
  },
  {
    id: 102,
    title: "Best Clear Finishes for Woodworking",
    description: "An in-depth review of the top clear finishes, comparing durability, ease of application, and appearance.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "product-reviews",
    videoId: "Iq2WJ9C30SU",
    creator: "Bourbon Moth Woodworking",
    thumbnail: "https://img.youtube.com/vi/Iq2WJ9C30SU/maxresdefault.jpg",
    length: "24:15"
  },
  {
    id: 103,
    title: "Beginner's Guide to Spray Equipment",
    description: "Review of entry-level spray equipment for finishing, perfect for beginners looking to achieve professional results.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "product-reviews",
    videoId: "K49xOV0B4Eo",
    creator: "Finish Carpenter",
    thumbnail: "https://img.youtube.com/vi/K49xOV0B4Eo/maxresdefault.jpg",
    length: "15:22"
  },
  {
    id: 104,
    title: "Finishing Oils Comparison Test",
    description: "Side-by-side comparison of popular finishing oils, showing application methods and finished results.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "product-reviews",
    videoId: "-jus5Hdo8tE",
    creator: "Crafted Workshop",
    thumbnail: "https://img.youtube.com/vi/-jus5Hdo8tE/maxresdefault.jpg",
    length: "21:37"
  },
  {
    id: 105,
    title: "French Polishing Supplies Review",
    description: "Review of the best shellac flakes, applicators, and oils for achieving a perfect French polish finish.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "product-reviews",
    videoId: "711rKNR9s_M",
    creator: "Fine Woodworking",
    thumbnail: "https://img.youtube.com/vi/711rKNR9s_M/maxresdefault.jpg",
    length: "16:48"
  },
  {
    id: 106,
    title: "Outdoor Finishes Durability Test",
    description: "One-year weather test comparing the most popular outdoor wood finishes and their performance.",
    icon: React.createElement(Youtube, { className: "h-6 w-6 text-red-500" }),
    category: "product-reviews",
    videoId: "Gp4aDyTIXWc",
    creator: "Homestead Craftsman",
    thumbnail: "https://img.youtube.com/vi/Gp4aDyTIXWc/maxresdefault.jpg",
    length: "19:53"
  }
];
