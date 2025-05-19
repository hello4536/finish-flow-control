
import React, { useEffect } from 'react';
import { useRecipes } from "@/hooks/useRecipes";
import RecipeForm from './recipes/RecipeForm';
import RecipesList from './recipes/RecipesList';

interface RecipesSectionProps {
  onCountChange: (count: number) => void;
}

const RecipesSection: React.FC<RecipesSectionProps> = ({ onCountChange }) => {
  const { recipes } = useRecipes();
  
  // Update parent component with count
  useEffect(() => {
    onCountChange(recipes.length);
  }, [recipes.length, onCountChange]);

  return (
    <div className="space-y-6">
      <RecipeForm />
      <RecipesList />
    </div>
  );
};

export default RecipesSection;
