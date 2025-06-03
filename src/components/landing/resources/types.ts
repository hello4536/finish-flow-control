
export interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: "article" | "video";
  industry: "woodworking" | "autobody";
  category: string;
  difficulty?: string;
  readTime?: string;
  videoLength?: string;
  creator?: string;
}
