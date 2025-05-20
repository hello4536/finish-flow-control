
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Youtube } from "lucide-react";
import { VideoReview } from "./data/videoReviewsData";

interface VideoDialogProps {
  video: VideoReview | null;
  isOpen: boolean;
  onClose: () => void;
}

const VideoDialog: React.FC<VideoDialogProps> = ({ video, isOpen, onClose }) => {
  if (!video) return null;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Youtube className="h-6 w-6 text-red-500" />
            {video.title}
          </DialogTitle>
          <DialogDescription>
            {video.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <AspectRatio ratio={16/9} className="bg-black rounded-md overflow-hidden">
            <iframe
              src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </AspectRatio>
        </div>
        
        <div className="mt-4">
          <h3 className="font-medium">About this review:</h3>
          <p className="text-sm text-muted-foreground mt-2">
            This product review video is created by {video.creator}. The content is educational and provides honest opinions about woodworking finishing products. All recommendations are based on real testing and practical experience.
          </p>
        </div>
        
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VideoDialog;
