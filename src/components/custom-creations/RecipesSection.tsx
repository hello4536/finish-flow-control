
import React, { useEffect } from 'react';
import { useRecipes } from "@/hooks/useRecipes";
import RecipeForm from './recipes/RecipeForm';
import RecipesList from './recipes/RecipesList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
          <CardTitle className="text-lg">Create New Recipe</CardTitle>
          <CardDescription>
            Add a new recipe to your collection with ingredients, instructions, and properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            <RecipeForm />
          </Tabs>
        </CardContent>
      </Card>
      
      <RecipesList recipes={recipes} isLoading={isLoading} deleteRecipe={deleteRecipe} />
    </div>
  );
};

export default RecipesSection;
