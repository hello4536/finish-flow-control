
import React from "react";
import ArticleCard from "./ArticleCard";
import VideoCard from "./VideoCard";
import { Article } from "./data/articlesData";
import { VideoReview } from "./data/videoReviewsData";

interface ContentDisplayProps {
  category: string;
  articles: Article[];
  videos: VideoReview[];
  onReadArticle: (article: Article) => void;
  onWatchVideo: (video: VideoReview) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ 
  category, 
  articles, 
  videos, 
  onReadArticle, 
  onWatchVideo 
}) => {
  const filteredArticles = category === "all" 
    ? articles 
    : articles.filter(article => article.category === category);
  
  const filteredVideos = category === "all" || category === "product-reviews"
    ? videos
    : [];

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredArticles.map(article => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          onReadArticle={onReadArticle} 
        />
      ))}
      
      {filteredVideos.map(video => (
        <VideoCard 
          key={video.id} 
          video={video} 
          onWatchVideo={onWatchVideo} 
        />
      ))}
    </div>
  );
};

export default ContentDisplay;
