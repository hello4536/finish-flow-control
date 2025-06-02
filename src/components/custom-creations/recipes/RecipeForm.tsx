
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecipes } from "@/hooks/useRecipes";
import { Separator } from "@/components/ui/separator";
import { recipeSchema, IngredientInput, RecipeFormValues } from "./schema";
import BasicInfoTab from "./form-sections/BasicInfoTab";
import IngredientsTab from "./form-sections/IngredientsTab";
import InstructionsTab from "./form-sections/InstructionsTab";

const RecipeForm: React.FC = () => {
  const { addRecipe } = useRecipes();
  const [ingredients, setIngredients] = useState<IngredientInput[]>([{
    name: "",
    amount: "",
    unit: ""
  }]);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      cookingTime: "",
      ingredients: ingredients,
      instructions: "",
      isFavorite: false
    }
  });

  const addIngredient = () => {
    const newIngredients = [...ingredients, {
      name: "",
      amount: "",
      unit: ""
    }];
    setIngredients(newIngredients);
    form.setValue("ingredients", newIngredients);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
      form.setValue("ingredients", newIngredients);
    }
  };

  const handleIngredientChange = (index: number, field: keyof IngredientInput, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: value
    };
    setIngredients(newIngredients);
    form.setValue("ingredients", newIngredients);
  };

  // Add a new recipe
  const onSubmit = (values: RecipeFormValues) => {
    // Convert form data to match the database structure
    addRecipe.mutate({
      name: values.name,
      description: values.description,
      cookingTime: values.cookingTime,
      // Change here: store as "materials" in DB but named "ingredients" in UI
      ingredients: JSON.stringify(values.ingredients),
      instructions: values.instructions,
      isFavorite: values.isFavorite
    });
    form.reset();
    setIngredients([{
      name: "",
      amount: "",
      unit: ""
    }]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Basic Information Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Basic Information</h3>
          <BasicInfoTab form={form} />
        </div>
        
        <Separator className="my-3" />
        
        {/* Ingredients Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Ingredients</h3>
          <IngredientsTab 
            ingredients={ingredients} 
            onAddIngredient={addIngredient} 
            onRemoveIngredient={removeIngredient} 
            onIngredientChange={handleIngredientChange} 
          />
        </div>
        
        <Separator className="my-3" />
        
        {/* Instructions Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Instructions</h3>
          <InstructionsTab form={form} />
        </div>
        
        <Separator className="my-4" />
        
        <Button 
          type="submit" 
          disabled={addRecipe.isPending} 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500"
        >
          {addRecipe.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Save Recipe
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default RecipeForm;
