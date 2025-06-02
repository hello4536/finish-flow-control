
import React, { useEffect } from 'react';
import { useRecipes } from "@/hooks/useRecipes";
import RecipeForm from './recipes/RecipeForm';
import RecipesList from './recipes/RecipesList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">Create New Recipe</CardTitle>
          <CardDescription>
            Add a new recipe to your collection with ingredients, instructions, and properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RecipeForm />
        </CardContent>
      </Card>
      
      <RecipesList recipes={recipes} isLoading={isLoading} deleteRecipe={deleteRecipe} />
    </div>
  );
};

export default RecipesSection;
