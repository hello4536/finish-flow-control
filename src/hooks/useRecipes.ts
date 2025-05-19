
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';

export interface RecipeMaterial {
  id?: string;
  name: string;
  quantity?: string;
  amount?: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  description?: string;
  cooking_time?: string;
  ingredients: any;
  instructions: string;
  is_favorite: boolean;
  total_volume?: string;
  created_at: string;
  updated_at: string;
}

export const useRecipes = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Fetch all recipes
  const fetchRecipes = async (): Promise<Recipe[]> => {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching recipes:', error);
      throw new Error(error.message);
    }
    
    // Transform the data to parse the ingredients JSON
    return (data || []).map(recipe => ({
      ...recipe,
      ingredients: typeof recipe.ingredients === 'string' 
        ? JSON.parse(recipe.ingredients)
        : recipe.ingredients
    }));
  };
  
  // Query to fetch recipes
  const { 
    data: recipes = [], 
    isLoading,
    error,
    refetch 
  } = useQuery({
    queryKey: ['recipes'],
    queryFn: fetchRecipes,
  });
  
  // Add a new recipe
  const addRecipe = useMutation({
    mutationFn: async ({ 
      name, 
      description,
      cookingTime,
      ingredients,
      instructions,
      isFavorite
    }: { 
      name: string;
      description?: string;
      cookingTime?: string;
      ingredients: string;
      instructions: string;
      isFavorite?: boolean;
    }) => {
      const newRecipe = {
        name,
        description,
        cooking_time: cookingTime,
        ingredients,
        instructions,
        is_favorite: isFavorite || false
      };
      
      const { data, error } = await supabase
        .from('recipes')
        .insert(newRecipe)
        .select()
        .single();
      
      if (error) throw error;
      
      // Parse ingredients back to array/object
      return {
        ...data,
        ingredients: typeof data.ingredients === 'string' 
          ? JSON.parse(data.ingredients)
          : data.ingredients
      };
    },
    onSuccess: () => {
      toast({
        title: 'Recipe added',
        description: 'The recipe has been added to your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add recipe: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Delete a recipe
  const deleteRecipe = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('recipes')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      return id;
    },
    onSuccess: () => {
      toast({
        title: 'Recipe removed',
        description: 'The recipe has been removed from your collection.',
      });
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to remove recipe: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Set up realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('recipes_changes')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'recipes' },
        () => {
          refetch();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [refetch]);

  return {
    recipes,
    isLoading,
    error,
    addRecipe,
    deleteRecipe
  };
};
