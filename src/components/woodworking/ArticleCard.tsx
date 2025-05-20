
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Article } from "./data/articlesData";

interface ArticleCardProps {
  article: Article;
  onReadArticle: (article: Article) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onReadArticle }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
          {article.icon}
        </div>
        <CardTitle className="text-xl">{article.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">{article.description}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onReadArticle(article)}
        >
          Read Article
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
