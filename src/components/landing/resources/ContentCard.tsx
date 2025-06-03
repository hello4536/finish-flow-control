
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Video, Play, Clock, User, ArrowRight, Calendar } from "lucide-react";
import { ContentItem } from "./types";
import { getDifficultyColor, getIndustryColor } from "./utils";

interface ContentCardProps {
  item: ContentItem;
}

const ContentCard: React.FC<ContentCardProps> = ({ item }) => {
  const getTypeIcon = () => {
    switch (item.type) {
      case "article":
        return <FileText className="w-5 h-5 text-blue-500" />;
      case "video":
        return <Video className="w-5 h-5 text-red-500" />;
      case "podcast":
        return <Play className="w-5 h-5 text-green-500" />;
      default:
        return <FileText className="w-5 h-5 text-blue-500" />;
    }
  };

  const getIndustryLabel = (industry: string) => {
    switch (industry) {
      case "woodworking": return "Woodworking";
      case "autobody": return "Auto Body";
      case "general": return "General";
      default: return industry;
    }
  };

  const getActionText = () => {
    switch (item.type) {
      case "article":
        return "Read Article";
      case "video":
        return "Watch Video";
      case "podcast":
        return item.status === "published" ? "Listen Now" : "Coming Soon";
      default:
        return "View Content";
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {getTypeIcon()}
            <Badge variant="outline" className={getIndustryColor(item.industry)}>
              {getIndustryLabel(item.industry)}
            </Badge>
          </div>
          {item.difficulty && (
            <Badge className={getDifficultyColor(item.difficulty)}>
              {item.difficulty}
            </Badge>
          )}
          {item.type === "podcast" && item.status && (
            <Badge variant={item.status === "published" ? "default" : "secondary"}>
              {item.status}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
          {item.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {item.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.readTime}
              </div>
            )}
            {item.videoLength && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.videoLength}
              </div>
            )}
            {item.duration && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.duration}
              </div>
            )}
            {item.releaseDate && (
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {new Date(item.releaseDate).toLocaleDateString()}
              </div>
            )}
            {item.creator && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {item.creator}
              </div>
            )}
          </div>
        </div>
        <Button 
          variant="outline" 
          className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
          disabled={item.type === "podcast" && item.status === "upcoming"}
        >
          {getActionText()}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContentCard;
