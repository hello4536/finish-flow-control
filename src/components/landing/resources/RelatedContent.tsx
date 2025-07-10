import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, FileText, Video, Play, Clock, TrendingUp } from "lucide-react";
import { ContentItem } from "./types";

interface RelatedContentProps {
  currentItem: ContentItem;
  relatedItems: ContentItem[];
  title?: string;
}

const RelatedContent: React.FC<RelatedContentProps> = ({
  currentItem,
  relatedItems,
  title = "Related Content"
}) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article": return <FileText className="w-4 h-4 text-blue-500" />;
      case "video": return <Video className="w-4 h-4 text-red-500" />;
      case "podcast": return <Play className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "woodworking": return "bg-amber-100 text-amber-800";
      case "autobody": return "bg-blue-100 text-blue-800";
      case "general": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  // Filter and sort related content
  const filteredRelated = relatedItems
    .filter(item => item.id !== currentItem.id)
    .filter(item => 
      item.industry === currentItem.industry || 
      item.category === currentItem.category ||
      item.difficulty === currentItem.difficulty
    )
    .slice(0, 4);

  if (filteredRelated.length === 0) {
    return null;
  }

  return (
    <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          {filteredRelated.map((item) => (
            <div
              key={item.id}
              className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <div className="flex-shrink-0 mt-1">
                {getTypeIcon(item.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h4>
                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                  {item.description}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge className={getIndustryColor(item.industry)}>
                    {item.industry === "woodworking" ? "Woodworking" : 
                     item.industry === "autobody" ? "Auto Body" : "General"}
                  </Badge>
                  {(item.readTime || item.videoLength || item.duration) && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="w-3 h-3 mr-1" />
                      {item.readTime || item.videoLength || item.duration}
                    </div>
                  )}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0 mt-1" />
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Button variant="outline" className="w-full" size="sm">
            Browse All {currentItem.industry === "woodworking" ? "Woodworking" : 
                      currentItem.industry === "autobody" ? "Auto Body" : "General"} Content
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedContent;