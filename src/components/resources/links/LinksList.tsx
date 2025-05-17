
import React from 'react';
import { Loader2 } from "lucide-react";
import LinkCard from './LinkCard';
import EmptyState from './EmptyState';
import { ResourceLink } from '@/hooks/useResourceLinks';

interface LinksListProps {
  links: ResourceLink[];
  isLoading: boolean;
  deleteLink: {
    mutateAsync: (id: string) => Promise<string>;
    isPending: boolean;
  };
}

const LinksList: React.FC<LinksListProps> = ({ links, isLoading, deleteLink }) => {
  // Delete a link
  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink.mutateAsync(id);
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (links.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-3">
      {links.map((link) => (
        <LinkCard 
          key={link.id} 
          link={link} 
          onDelete={handleDeleteLink}
          isDeleting={deleteLink.isPending} 
        />
      ))}
    </div>
  );
};

export default LinksList;
