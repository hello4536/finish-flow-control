
import React, { useState } from 'react';
import { Utensils, Trash2, Clock, Star, Eye, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRecipes } from "@/hooks/useRecipes";
import { Recipe } from "./schema";
import { UseMutationResult } from "@tanstack/react-query";

interface RecipesListProps {
  recipes: Recipe[];
  isLoading: boolean;
  deleteRecipe: UseMutationResult<string, Error, string, unknown>;
}

const RecipesList: React.FC<RecipesListProps> = ({ recipes, isLoading, deleteRecipe }) => {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (recipes.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground border rounded-lg">
        <Utensils className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>No recipes saved yet</p>
        <p className="text-sm">Add your first recipe using the form above</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Recipes ({recipes.length})</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <Card key={recipe.id} className="group overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-muted p-4">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <h3 className="font-medium text-lg">{recipe.name}</h3>
                    {recipe.isFavorite && (
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    )}
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setSelectedRecipe(recipe);
                        setDialogOpen(true);
                      }}
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
                
                {recipe.cookingTime && (
                  <div className="flex items-center mt-2 text-sm text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {recipe.cookingTime}
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {recipe.description ? (
                  <p className="text-sm text-muted-foreground line-clamp-3">{recipe.description}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No description</p>
                )}
                
                {recipe.ingredients && recipe.ingredients.length > 0 && (
                  <div className="mt-2 text-xs text-muted-foreground">
                    <strong>Ingredients:</strong> {recipe.ingredients.length}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedRecipe?.name}</DialogTitle>
          </DialogHeader>
          {selectedRecipe && (
            <div className="mt-4">
              <Tabs defaultValue="details">
                <TabsList className="mb-4">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                  <TabsTrigger value="instructions">Instructions</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4">
                  {selectedRecipe.description && (
                    <div>
                      <h4 className="text-sm font-medium">Description</h4>
                      <p className="whitespace-pre-line">{selectedRecipe.description}</p>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-2 gap-4">
                    {selectedRecipe.cookingTime && (
                      <div>
                        <h4 className="text-sm font-medium">Preparation Time</h4>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                          {selectedRecipe.cookingTime}
                        </div>
                      </div>
                    )}
                    
                    <div>
                      <h4 className="text-sm font-medium">Favorite</h4>
                      <div className="flex items-center">
                        {selectedRecipe.isFavorite ? (
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
                    <p>{new Date(selectedRecipe.createdAt).toLocaleDateString()}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="ingredients" className="space-y-4">
                  {selectedRecipe.ingredients && selectedRecipe.ingredients.length > 0 ? (
                    <div>
                      <h4 className="text-sm font-medium mb-2">Ingredients</h4>
                      <div className="space-y-2">
                        {selectedRecipe.ingredients.map((ingredient, index) => (
                          <div key={index} className="flex items-center justify-between py-1 border-b">
                            <div>{ingredient.name}</div>
                            <div>{ingredient.amount} {ingredient.unit}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No ingredients listed</p>
                  )}
                </TabsContent>
                
                <TabsContent value="instructions" className="space-y-4">
                  {selectedRecipe.instructions ? (
                    <div>
                      <h4 className="text-sm font-medium">Instructions</h4>
                      <p className="whitespace-pre-line">{selectedRecipe.instructions}</p>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No instructions available</p>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="pt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RecipesList;
