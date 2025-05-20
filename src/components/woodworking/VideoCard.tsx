
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Clock, Play } from "lucide-react";
import { VideoReview } from "./data/videoReviewsData";

interface VideoCardProps {
  video: VideoReview;
  onWatchVideo: (video: VideoReview) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onWatchVideo }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center">
          {video.icon}
        </div>
        <CardTitle className="text-xl">{video.title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="relative mb-4 cursor-pointer" onClick={() => onWatchVideo(video)}>
          <AspectRatio ratio={16/9} className="bg-black">
            <img 
              src={video.thumbnail} 
              alt={video.title}
              className="object-cover w-full h-full rounded-md"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "https://img.youtube.com/vi/" + video.videoId + "/0.jpg";
              }}
            />
          </AspectRatio>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black bg-opacity-70 p-3">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        </div>
        <CardDescription className="text-base">{video.description}</CardDescription>
        <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
          <span>{video.creator}</span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {video.length}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onWatchVideo(video)}
        >
          Watch Review
        </Button>
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
