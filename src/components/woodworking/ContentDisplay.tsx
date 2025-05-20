
import React from "react";
import ArticleCard from "./ArticleCard";
import { Article } from "./data/articlesData";

interface ContentDisplayProps {
  category: string;
  articles: Article[];
  onReadArticle: (article: Article) => void;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ 
  category, 
  articles, 
  onReadArticle
}) => {
  const filteredArticles = category === "all" 
    ? articles 
    : articles.filter(article => article.category === category);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {filteredArticles.map(article => (
        <ArticleCard 
          key={article.id} 
          article={article} 
          onReadArticle={onReadArticle} 
        />
      ))}
    </div>
  );
};

export default ContentDisplay;
