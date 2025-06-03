
export interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: "article" | "video" | "podcast";
  industry: "woodworking" | "autobody" | "general";
  category: string;
  difficulty?: string;
  readTime?: string;
  videoLength?: string;
  creator?: string;
  duration?: string;
  releaseDate?: string;
  status?: "published" | "upcoming";
  guests?: string[];
  audioUrl?: string;
}

export interface PodcastEpisode extends ContentItem {
  type: "podcast";
  duration: string;
  releaseDate: string;
  status: "published" | "upcoming";
  guests?: string[];
  audioUrl?: string;
}
