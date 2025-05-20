
import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "../woodworking/data/articlesData"; // Reuse the same Article type

interface ContentDisplayProps {
  category: string;
  articles: Article[];
  title: string;
  description: string;
  onReadArticle: (article: Article) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ 
  category, 
  articles,
  title,
  description, 
  onReadArticle
}) => {
  const filteredArticles = category === "all" 
    ? articles 
    : articles.filter(article => article.category === category);

  return (
    <div>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-blue-900">{title}</h3>
        <p className="text-blue-700 mt-1">{description}</p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredArticles.map(article => (
          <ArticleCard 
            key={article.id || article.title} 
            article={article} 
            onReadArticle={onReadArticle} 
          />
        ))}
      </div>
    </div>
  );
};

export default ContentDisplay;
