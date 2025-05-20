
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Article } from "../woodworking/data/articlesData"; // Reuse the same Article type

interface ArticleDialogProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleDialog: React.FC<ArticleDialogProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] h-[85vh] max-h-[85vh]">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              {article.icon}
            </div>
            <DialogTitle className="text-2xl">{article.title}</DialogTitle>
          </div>
          <DialogDescription className="text-base">{article.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-full pr-4 mt-4">
          <div 
            className="prose prose-blue max-w-none" 
            dangerouslySetInnerHTML={{ __html: article.content || "" }}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
