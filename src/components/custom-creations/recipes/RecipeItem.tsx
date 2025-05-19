
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, Clock } from "lucide-react";
import { Recipe } from "@/hooks/useRecipes";
import { UseMutationResult } from "@tanstack/react-query";

interface RecipeItemProps {
  recipe: Recipe;
  onView: (recipe: Recipe) => void;
  deleteRecipe: UseMutationResult<string, Error, string, unknown>;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ recipe, onView, deleteRecipe }) => {
  return (
    <Card className="group overflow-hidden">
      <CardContent className="p-0">
        <div className="bg-muted p-4">
          <div className="flex justify-between items-start">
            <div className="flex items-start gap-2">
              <h3 className="font-medium text-lg">{recipe.name}</h3>
              {recipe.is_favorite && (
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                  Favorite
                </span>
              )}
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => onView(recipe)}
              >
                <Eye className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => deleteRecipe.mutate(recipe.id)}
                disabled={deleteRecipe.isPending}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
          
          {recipe.cooking_time && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {recipe.cooking_time}
            </div>
          )}
          
          {recipe.total_volume && (
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <Clock className="h-3 w-3 mr-1" />
              {recipe.total_volume}
            </div>
          )}
        </div>
        
        <div className="p-4">
          {recipe.description ? (
            <p className="text-sm text-muted-foreground line-clamp-3">{recipe.description}</p>
          ) : (
            <p className="text-sm text-muted-foreground italic">No description</p>
          )}
          
          {recipe.ingredients && Array.isArray(recipe.ingredients) && (
            <div className="mt-2 text-xs text-muted-foreground">
              <strong>Ingredients:</strong> {recipe.ingredients.length}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecipeItem;
