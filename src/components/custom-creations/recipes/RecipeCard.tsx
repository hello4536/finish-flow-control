
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Recipe, useRecipes } from "@/hooks/useRecipes";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { deleteRecipe } = useRecipes();
  
  return (
    <Card className="group">
      <CardContent className="p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-lg">{recipe.name}</h3>
            {recipe.is_favorite && (
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                Favorite
              </span>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-0 group-hover:opacity-100"
            onClick={() => deleteRecipe.mutate(recipe.id)}
            disabled={deleteRecipe.isPending}
          >
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
        
        <div className="mt-4 space-y-4">
          {recipe.total_volume && (
            <div>
              <h4 className="font-semibold text-sm">Total Volume:</h4>
              <p className="text-sm mt-1">{recipe.total_volume}</p>
            </div>
          )}
          
          <div>
            <h4 className="font-semibold text-sm">Materials & Quantities:</h4>
            <ul className="list-disc list-inside text-sm mt-1">
              {Array.isArray(recipe.ingredients) ? (
                recipe.ingredients.map((ingredient, idx) => (
                  <li key={ingredient.id || idx}>
                    {ingredient.name}: {ingredient.amount} {ingredient.unit}
                  </li>
                ))
              ) : (
                <li>No ingredients listed</li>
              )}
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-sm">Instructions:</h4>
            <p className="whitespace-pre-line text-sm mt-1">{recipe.instructions}</p>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Created: {new Date(recipe.created_at).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeCard;
