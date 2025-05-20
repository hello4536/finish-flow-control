
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { Article } from "../woodworking/data/articlesData"; // Reuse the same Article type

interface ArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onReadArticle }) => {
  // Estimate reading time based on word count (average reading speed: 200 words per minute)
  const wordCount = article.content ? article.content.split(/\s+/).length : 0;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <CardHeader className="pb-2 space-y-0">
        <div className="flex justify-between items-start">
          <Badge 
            variant="outline" 
            className="mb-2 text-xs font-medium text-blue-700 border-blue-200 bg-blue-50"
          >
            {article.category.charAt(0).toUpperCase() + article.category.slice(1).replace("-", " ")}
          </Badge>
          <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
            {article.icon}
          </div>
        </div>
        <CardTitle className="text-xl line-clamp-2 h-[3.6rem]">{article.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base line-clamp-3">{article.description}</CardDescription>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="mr-1 h-4 w-4" />
          <span>{readingTimeMinutes} min read</span>
        </div>
        <Button 
          variant="ghost" 
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 p-2"
          onClick={() => onReadArticle(article)}
        >
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
