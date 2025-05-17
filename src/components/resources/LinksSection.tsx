
import React, { useEffect } from 'react';
import { useResourceLinks } from '@/hooks/useResourceLinks';
import LinkForm from './links/LinkForm';
import LinksList from './links/LinksList';
import { toast } from "@/hooks/use-toast";

interface LinksSectionProps {
  onCountChange: (count: number) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ onCountChange }) => {
  const { links, isLoading, addLink, deleteLink } = useResourceLinks();
  
  // Update parent component with count
  useEffect(() => {
    onCountChange(links.length);
  }, [links.length, onCountChange]);

  return (
    <div className="space-y-6">
      <LinkForm addLink={addLink} />
      <LinksList 
        links={links}
        isLoading={isLoading}
        deleteLink={deleteLink}
      />
    </div>
  );
};

export default LinksSection;
