
import React from 'react';
import { Utensils } from "lucide-react";

const RecipesEmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 text-muted-foreground border rounded-lg">
      <Utensils className="h-10 w-10 mx-auto mb-4 opacity-50" />
      <p>No recipes saved yet</p>
      <p className="text-sm">Add your first recipe using the form above</p>
    </div>
  );
};

export default RecipesEmptyState;
