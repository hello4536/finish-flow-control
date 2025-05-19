
import React from 'react';
import { Loader2, Utensils } from "lucide-react";
import { useRecipes } from "@/hooks/useRecipes";
import RecipeCard from './RecipeCard';

const RecipesList: React.FC = () => {
  const { recipes, isLoading } = useRecipes();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <Utensils className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>No recipes saved yet</p>
        <p className="text-sm">Add your first recipe using the form above</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  );
};

export default RecipesList;
