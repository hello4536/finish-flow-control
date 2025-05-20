
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
import { Clock, CheckSquare, Heart } from "lucide-react";
import { Article } from "./data/articlesData";

interface ArticleDialogProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

// Function to parse markdown into HTML with improved formatting
const parseMarkdown = (content: string): string => {
  return content
    // Headers
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">$1</h2>')
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-blue-700 mt-6 mb-3">$1</h3>')
    .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-blue-600 mt-4 mb-2">$1</h4>')
    
    // Lists
    .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc my-1">$1</li>')
    .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 list-decimal my-1"><span class="font-medium">$1.</span> $2</li>')
    
    // Wrap lists in ul/ol tags
    .replace(/((<li class="ml-6 list-disc.*<\/li>\n)+)/gim, '<ul class="my-4">$1</ul>')
    .replace(/((<li class="ml-6 list-decimal.*<\/li>\n)+)/gim, '<ol class="my-4">$1</ol>')
    
    // Text formatting
    .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-bold">$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
    
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener">$1</a>')
    
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-blue-200 pl-4 py-1 my-4 italic bg-blue-50 text-gray-700">$1</blockquote>')
    
    // Code blocks
    .replace(/`([^`]+)`/gim, '<code class="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm">$1</code>')
    
    // Paragraphs
    .replace(/\n\n/gim, '</p><p class="my-4">')
    
    // Wrap everything in paragraphs if not already wrapped
    .replace(/^([^<].*)/gim, '<p class="my-4">$1</p>');
};

const ArticleDialog: React.FC<ArticleDialogProps> = ({ article, isOpen, onClose }) => {
  if (!article) return null;
  
  // Estimate reading time based on word count (average reading speed: 200 words per minute)
  const wordCount = article.content.split(/\s+/).length;
  const readingTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex items-start">
            <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center mr-4 mt-1">
              {article.icon}
            </div>
            <div>
              <DialogTitle className="text-2xl">{article.title}</DialogTitle>
              <DialogDescription className="text-base mt-2">
                {article.description}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <ScrollArea className="mt-4 max-h-[60vh] pr-4">
          <div className="prose prose-lg prose-blue max-w-none pb-8">
            <div 
              className="article-content"
              dangerouslySetInnerHTML={{ __html: parseMarkdown(article.content) }} 
            />
          </div>
        </ScrollArea>
        
        <DialogFooter className="gap-2 sm:gap-0">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" /> 
              <span>{readingTimeMinutes} min read</span>
            </span>
            <span className="flex items-center gap-1">
              <CheckSquare className="h-4 w-4" /> 
              <span>Fact checked by experts</span>
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center gap-1 text-muted-foreground hover:text-red-500 p-0"
            >
              <Heart className="h-4 w-4" />
              <span>Save</span>
            </Button>
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
