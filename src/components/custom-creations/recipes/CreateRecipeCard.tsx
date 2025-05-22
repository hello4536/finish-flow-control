import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import RecipeFormTabs from './RecipeFormTabs';
const CreateRecipeCard: React.FC = () => {
  return <Card>
      <CardHeader>
        <CardTitle className="text-lg text-blue-600">Create New Recipe</CardTitle>
        <CardDescription>
          Add a new recipe to your collection with ingredients, instructions, and properties.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RecipeFormTabs />
      </CardContent>
    </Card>;
};
export default CreateRecipeCard;