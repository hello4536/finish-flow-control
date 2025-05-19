
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecipes } from "@/hooks/useRecipes";
import { TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { recipeSchema, IngredientInput, RecipeFormValues } from "./schema";

const RecipeForm: React.FC = () => {
  const { addRecipe } = useRecipes();
  const [ingredients, setIngredients] = useState<IngredientInput[]>([
    { name: "", amount: "", unit: "" }
  ]);
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      description: "",
      cookingTime: "",
      ingredients: ingredients,
      instructions: "",
      isFavorite: false
    },
  });

  const addIngredient = () => {
    const newIngredients = [...ingredients, { name: "", amount: "", unit: "" }];
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
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setIngredients(newIngredients);
    form.setValue("ingredients", newIngredients);
  };

  // Add a new recipe
  const onSubmit = (values: RecipeFormValues) => {
    // Convert form data to match the new database structure
    addRecipe.mutate({
      name: values.name,
      description: values.description,
      cookingTime: values.cookingTime,
      ingredients: JSON.stringify(values.ingredients), // Convert to JSON string for JSONB column
      instructions: values.instructions,
      isFavorite: values.isFavorite
    });
    form.reset();
    setIngredients([{ name: "", amount: "", unit: "" }]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <TabsContent value="basic" className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input placeholder="Danish Oil Finish" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="cookingTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preparation Time</FormLabel>
                  <FormControl>
                    <Input placeholder="30 minutes" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isFavorite"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                  <div className="space-y-0.5">
                    <FormLabel>Favorite Recipe</FormLabel>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Brief description of the recipe" 
                    className="min-h-[100px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        
        <TabsContent value="ingredients" className="space-y-4">
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-12 gap-2 items-end">
                <div className="col-span-5">
                  <FormLabel htmlFor={`ingredient-${index}`}>
                    {index === 0 ? "Ingredient" : ""}
                  </FormLabel>
                  <Input
                    id={`ingredient-${index}`}
                    value={ingredient.name}
                    onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                    placeholder="Ingredient name"
                  />
                </div>
                <div className="col-span-3">
                  <FormLabel htmlFor={`amount-${index}`}>
                    {index === 0 ? "Amount" : ""}
                  </FormLabel>
                  <Input
                    id={`amount-${index}`}
                    value={ingredient.amount}
                    onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className="col-span-3">
                  <FormLabel htmlFor={`unit-${index}`}>
                    {index === 0 ? "Unit" : ""}
                  </FormLabel>
                  <Input
                    id={`unit-${index}`}
                    value={ingredient.unit}
                    onChange={(e) => handleIngredientChange(index, "unit", e.target.value)}
                    placeholder="Unit"
                  />
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={() => removeIngredient(index)}
                    disabled={ingredients.length <= 1}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button 
              type="button" 
              variant="outline" 
              onClick={addIngredient}
              className="w-full mt-2"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Ingredient
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="instructions" className="space-y-4">
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Step-by-step instructions for preparing the recipe" 
                    className="min-h-[200px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </TabsContent>
        
        <Separator className="my-4" />
        
        <Button 
          type="submit" 
          disabled={addRecipe.isPending}
          className="w-full sm:w-auto"
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
