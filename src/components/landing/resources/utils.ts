
import { articles as woodworkingArticles } from "@/components/woodworking/data/articlesData";
import { videoReviews as woodworkingVideos } from "@/components/woodworking/data/videoReviewsData";
import { autoBodyArticles } from "@/components/autobody/data/articlesData";
import { autoBodyVideoReviews } from "@/components/autobody/data/videoReviewsData";
import { podcastEpisodes } from "./data/podcastData";
import { ContentItem } from "./types";

export const getAllContent = (): ContentItem[] => {
  return [
    ...woodworkingArticles.map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      type: "article" as const,
      industry: "woodworking" as const,
      category: article.category,
      readTime: "5-8 min read" // Default for woodworking articles
    })),
    ...woodworkingVideos.map(video => ({
      id: video.id + 1000,
      title: video.title,
      description: video.description,
      type: "video" as const,
      industry: "woodworking" as const,
      category: video.category,
      videoLength: video.length,
      creator: video.creator
    })),
    ...autoBodyArticles.map(article => ({
      id: article.id + 2000,
      title: article.title,
      description: article.description,
      type: "article" as const,
      industry: "autobody" as const,
      category: article.category,
      difficulty: article.difficulty,
      readTime: article.readTime
    })),
    ...autoBodyVideoReviews.map(video => ({
      id: video.id + 3000,
      title: video.title,
      description: video.description,
      type: "video" as const,
      industry: "autobody" as const,
      category: video.category,
      videoLength: video.length,
      creator: video.creator
    })),
    ...podcastEpisodes
  ];
};

export const getDifficultyColor = (difficulty?: string) => {
  switch (difficulty) {
    case "Beginner": return "bg-green-100 text-green-800";
    case "Intermediate": return "bg-yellow-100 text-yellow-800";
    case "Advanced": return "bg-red-100 text-red-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const getIndustryColor = (industry: string) => {
  switch (industry) {
    case "woodworking": return "bg-amber-100 text-amber-800";
    case "autobody": return "bg-blue-100 text-blue-800";
    case "general": return "bg-purple-100 text-purple-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

export const filterContent = (
  content: ContentItem[],
  searchTerm: string,
  selectedIndustry: "all" | "woodworking" | "autobody" | "general",
  selectedContentType: "all" | "article" | "video" | "podcast",
  selectedDifficulty: "all" | "Beginner" | "Intermediate" | "Advanced"
) => {
  return content.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || item.industry === selectedIndustry;
    const matchesContentType = selectedContentType === "all" || item.type === selectedContentType;
    const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesIndustry && matchesContentType && matchesDifficulty;
  });
};
