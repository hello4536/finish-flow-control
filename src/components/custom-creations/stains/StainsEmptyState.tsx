
import React from 'react';
import { SwatchBook } from "lucide-react";

const StainsEmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 text-muted-foreground border rounded-lg">
      <SwatchBook className="h-10 w-10 mx-auto mb-4 opacity-50" />
      <p>No stains saved yet</p>
      <p className="text-sm">Create your first stain using the form above</p>
    </div>
  );
};

export default StainsEmptyState;
