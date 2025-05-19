
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Utensils, Trash2, Plus, Loader2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRecipes, RecipeMaterial } from "@/hooks/useRecipes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { v4 as uuidv4 } from 'uuid';

const materialSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Material name is required"),
  quantity: z.string().min(1, "Quantity is required"),
  unit: z.string().min(1, "Unit is required"),
});

const recipeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  materials: z.array(materialSchema).min(1, "At least one material is required"),
  instructions: z.string().min(1, "Instructions are required"),
  totalVolume: z.string().optional(),
  isSop: z.boolean().default(false),
});

type RecipeFormValues = z.infer<typeof recipeSchema>;

interface RecipesSectionProps {
  onCountChange: (count: number) => void;
}

const unitOptions = ["oz", "ml", "cups", "tbsp", "tsp", "parts", "grams", "liters", "%"];

const RecipesSection: React.FC<RecipesSectionProps> = ({ onCountChange }) => {
  const { recipes, isLoading, addRecipe, deleteRecipe } = useRecipes();
  
  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeSchema),
    defaultValues: {
      name: "",
      materials: [{ id: uuidv4(), name: "", quantity: "", unit: "" }],
      instructions: "",
      totalVolume: "",
      isSop: false,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "materials",
  });

  // Calculate total volume when materials change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name?.startsWith('materials')) {
        calculateTotalVolume();
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  // Calculate total volume based on material quantities
  const calculateTotalVolume = () => {
    const materials = form.getValues('materials');
    let total = 0;
    let commonUnit = '';
    
    // Find the most common unit
    const unitCounts: Record<string, number> = {};
    materials.forEach(material => {
      if (material.unit) {
        unitCounts[material.unit] = (unitCounts[material.unit] || 0) + 1;
      }
    });
    
    let maxCount = 0;
    Object.entries(unitCounts).forEach(([unit, count]) => {
      if (count > maxCount) {
        maxCount = count;
        commonUnit = unit;
      }
    });
    
    // Sum quantities with the same unit
    materials.forEach(material => {
      if (material.unit === commonUnit && material.quantity) {
        const qty = parseFloat(material.quantity);
        if (!isNaN(qty)) {
          total += qty;
        }
      }
    });
    
    if (total > 0 && commonUnit) {
      form.setValue('totalVolume', `${total} ${commonUnit}`);
    } else {
      form.setValue('totalVolume', '');
    }
  };

  // Update parent component with count
  useEffect(() => {
    onCountChange(recipes.length);
  }, [recipes.length, onCountChange]);

  // Add a new recipe
  const onSubmit = (values: RecipeFormValues) => {
    addRecipe.mutate({
      name: values.name,
      materials: values.materials,
      instructions: values.instructions,
      totalVolume: values.totalVolume,
      isSop: values.isSop
    });
    form.reset();
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
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <FormLabel>Materials & Quantities</FormLabel>
              <Button 
                type="button" 
                variant="outline" 
                size="sm"
                onClick={() => append({ id: uuidv4(), name: "", quantity: "", unit: "" })}
              >
                <Plus className="mr-1 h-4 w-4" /> Add Material
              </Button>
            </div>

            {fields.map((field, index) => (
              <div key={field.id} className="flex items-end gap-2">
                <FormField
                  control={form.control}
                  name={`materials.${index}.name`}
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Material name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`materials.${index}.quantity`}
                  render={({ field }) => (
                    <FormItem className="w-20">
                      <FormControl>
                        <Input placeholder="Qty" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name={`materials.${index}.unit`}
                  render={({ field }) => (
                    <FormItem className="w-24">
                      <Select 
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitOptions.map(unit => (
                            <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                )}
              </div>
            ))}

            <FormField
              control={form.control}
              name="totalVolume"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Batch Volume</FormLabel>
                  <FormControl>
                    <Input placeholder="Calculated automatically" readOnly {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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

          <FormField
            control={form.control}
            name="isSop"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Standard Operating Procedure (SOP)</FormLabel>
                  <p className="text-sm text-muted-foreground">
                    Mark this recipe as an official procedure for your organization
                  </p>
                </div>
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={addRecipe.isPending}
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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="group">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-lg">{recipe.name}</h3>
                    {recipe.is_sop && (
                      <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                        SOP
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
                      {Array.isArray(recipe.materials) ? (
                        recipe.materials.map((material, idx) => (
                          <li key={material.id || idx}>
                            {material.name}: {material.quantity} {material.unit}
                          </li>
                        ))
                      ) : (
                        <li>{recipe.materials}</li>
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
