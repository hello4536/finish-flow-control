
import React, { useEffect } from 'react';
import { useRecipes } from "@/hooks/useRecipes";
import CreateRecipeCard from './recipes/CreateRecipeCard';
import RecipesList from './recipes/RecipesList';

interface RecipesSectionProps {
  onCountChange: (count: number) => void;
}

const RecipesSection: React.FC<RecipesSectionProps> = ({ onCountChange }) => {
  const { recipes, isLoading, addRecipe, deleteRecipe } = useRecipes();
  
  // Update parent component with count
  useEffect(() => {
    if (recipes) {
      onCountChange(recipes.length || 0);
    }
  }, [recipes, onCountChange]);

  return (
    <div className="space-y-6">
      <CreateRecipeCard />
      <RecipesList recipes={recipes} isLoading={isLoading} deleteRecipe={deleteRecipe} />
    </div>
  );
};

export default RecipesSection;
