
import React, { useState } from 'react';
import { Recipe, useRecipes } from "@/hooks/useRecipes";
import RecipeItem from "./RecipeItem";
import RecipesLoading from "./RecipesLoading";
import RecipesEmptyState from "./RecipesEmptyState";
import RecipeViewDialog from "./RecipeViewDialog";
import { UseMutationResult } from "@tanstack/react-query";

interface RecipesListProps {
  recipes: Recipe[];
  isLoading: boolean;
  deleteRecipe: UseMutationResult<string, Error, string, unknown>;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, isLoading, deleteRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleViewRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setDialogOpen(true);
  };
  
  if (isLoading) {
    return <RecipesLoading />;
  }
  
  if (recipes.length === 0) {
    return <RecipesEmptyState />;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Recipes ({recipes.length})</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <RecipeItem 
            key={recipe.id} 
            recipe={recipe} 
            onView={handleViewRecipe}
            deleteRecipe={deleteRecipe}
          />
        ))}
      </div>
      
      <RecipeViewDialog 
        recipe={selectedRecipe} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  );
};

export default RecipesList;
