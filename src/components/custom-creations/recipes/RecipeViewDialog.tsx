
import React from 'react';
import { Clock, Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Recipe } from "@/hooks/useRecipes";

interface RecipeViewDialogProps {
  recipe: Recipe | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RecipeViewDialog: React.FC<RecipeViewDialogProps> = ({ 
  recipe, 
  open, 
  onOpenChange 
}) => {
  if (!recipe) return null;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{recipe.name}</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="details">
            <TabsList className="mb-4">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-4">
              {recipe.description && (
                <div>
                  <h4 className="text-sm font-medium">Description</h4>
                  <p className="whitespace-pre-line">{recipe.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                {recipe.total_volume && (
                  <div>
                    <h4 className="text-sm font-medium">Total Volume</h4>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                      {recipe.total_volume}
                    </div>
                  </div>
                )}
                
                <div>
                  <h4 className="text-sm font-medium">Favorite</h4>
                  <div className="flex items-center">
                    {recipe.is_favorite ? (
                      <>
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        Yes
                      </>
                    ) : (
                      "No"
                    )}
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium">Created</h4>
                <p>{new Date(recipe.created_at).toLocaleDateString()}</p>
              </div>
            </TabsContent>
            
            <TabsContent value="ingredients" className="space-y-4">
              {recipe.ingredients && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Ingredients</h4>
                  <div className="space-y-2">
                    {Array.isArray(recipe.ingredients) && recipe.ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-center justify-between py-1 border-b">
                        <div>{ingredient.name}</div>
                        <div>{ingredient.amount} {ingredient.unit}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="instructions" className="space-y-4">
              {recipe.instructions ? (
                <div>
                  <h4 className="text-sm font-medium">Instructions</h4>
                  <p className="whitespace-pre-line">{recipe.instructions}</p>
                </div>
              ) : (
                <p className="text-muted-foreground">No instructions available</p>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="pt-4 flex justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeViewDialog;
