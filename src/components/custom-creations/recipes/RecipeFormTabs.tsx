
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import RecipeForm from './RecipeForm';

const RecipeFormTabs: React.FC = () => {
  return (
    <Tabs defaultValue="basic" className="w-full">
      <TabsList className="mb-4">
        <TabsTrigger value="basic">Basic Info</TabsTrigger>
        <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
        <TabsTrigger value="instructions">Instructions</TabsTrigger>
      </TabsList>
      <RecipeForm />
    </Tabs>
  );
};

export default RecipeFormTabs;
