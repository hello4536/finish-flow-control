
import React from 'react';
import { Loader2 } from "lucide-react";

const RecipesLoading: React.FC = () => {
  return (
    <div className="flex justify-center py-10">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
};

export default RecipesLoading;
