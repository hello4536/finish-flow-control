
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Clock, CheckSquare } from "lucide-react";
import { Article } from "./data/articlesData";

interface ArticleDialogProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleDialog: React.FC<ArticleDialogProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            {article.icon}
            {article.title}
          </DialogTitle>
          <DialogDescription>
            {article.description}
          </DialogDescription>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[60vh] pr-4">
          <div className="prose prose-lg prose-blue max-w-none pb-8">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: article.content
                  .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">$1</h2>')
                  .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-blue-700 mt-6 mb-3">$1</h3>')
                  .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-blue-600 mt-4 mb-2">$1</h4>')
                  .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
                  .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 list-decimal"><strong>$1.</strong> $2</li>')
                  .replace(/^\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                  .replace(/\n\n/gim, '<br/><br/>')
              }} 
            />
          </div>
        </ScrollArea>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" /> 
            <span>10 min read</span>
            <CheckSquare className="h-4 w-4 ml-4" /> 
            <span>Fact checked by professional woodworkers</span>
          </div>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ArticleDialog;
