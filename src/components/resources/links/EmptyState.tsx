
import React from 'react';
import { Link } from "lucide-react";

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 text-muted-foreground">
      <Link className="h-10 w-10 mx-auto mb-4 opacity-50" />
      <p>No links saved yet</p>
      <p className="text-sm">Add your first link using the form above</p>
    </div>
  );
};

export default EmptyState;
