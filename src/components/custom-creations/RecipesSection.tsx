
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Utensils, Trash2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  materials: z.string().min(1, "Materials are required"),
  instructions: z.string().min(1, "Instructions are required"),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

export interface Recipe {
  id: string;
  name: string;
  materials: string;
  instructions: string;
  createdAt: Date;
}

interface RecipesSectionProps {
  onCountChange: (count: number) => void;
}

const RecipesSection: React.FC<RecipesSectionProps> = ({ onCountChange }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      materials: "",
      instructions: "",
    },
  });

  // Add a new recipe
  const onSubmit = (values: RecipeFormValues) => {
    const newRecipe: Recipe = {
      id: crypto.randomUUID(),
      name: values.name,
      materials: values.materials,
      instructions: values.instructions,
      createdAt: new Date(),
    };
    
    const updatedRecipes = [...recipes, newRecipe];
    setRecipes(updatedRecipes);
    onCountChange(updatedRecipes.length);
    form.reset();
    
    toast({
      title: "Recipe saved",
      description: `"${values.name}" has been added to your collection`,
    });
  };

  // Delete a recipe
  const deleteRecipe = (id: string) => {
    const updatedRecipes = recipes.filter(recipe => recipe.id !== id);
    setRecipes(updatedRecipes);
    onCountChange(updatedRecipes.length);
    
    toast({
      title: "Recipe removed",
      description: "The recipe has been removed from your collection",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recipe Name</FormLabel>
                <FormControl>
                  <Input placeholder="Custom Finish Mix" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="materials"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materials & Quantities</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="List all materials and quantities needed" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="instructions"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Instructions</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Step by step instructions" 
                    className="min-h-[150px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit">
            <Plus className="mr-2 h-4 w-4" />
            Save Recipe
          </Button>
        </form>
      </Form>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="group">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-lg">{recipe.name}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => deleteRecipe(recipe.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <div className="mt-4 space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm">Materials & Quantities:</h4>
                    <p className="whitespace-pre-line text-sm mt-1">{recipe.materials}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-sm">Instructions:</h4>
                    <p className="whitespace-pre-line text-sm mt-1">{recipe.instructions}</p>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(recipe.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <Utensils className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No recipes saved yet</p>
          <p className="text-sm">Add your first recipe using the form above</p>
        </div>
      )}
    </div>
  );
};

export default RecipesSection;
