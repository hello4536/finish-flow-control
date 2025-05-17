
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink } from "lucide-react";
import { ResourceLink } from '@/hooks/useResourceLinks';

interface LinkCardProps {
  link: ResourceLink;
  onDelete: (id: string) => Promise<void>;
  isDeleting: boolean;
}

const LinkCard: React.FC<LinkCardProps> = ({ link, onDelete, isDeleting }) => {
  return (
    <Card key={link.id} className="relative group">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex-1">
          <h3 className="font-medium">{link.title}</h3>
          <a 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-muted-foreground text-sm flex items-center hover:text-primary"
          >
            {link.url}
            <ExternalLink className="ml-1 h-3 w-3" />
          </a>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="opacity-0 group-hover:opacity-100"
          onClick={() => onDelete(link.id)}
          disabled={isDeleting}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </CardContent>
    </Card>
  );
};

export default LinkCard;
