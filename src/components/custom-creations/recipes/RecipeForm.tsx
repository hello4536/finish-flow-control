
import React, { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from 'uuid';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RecipeFormValues, recipeSchema, unitOptions } from './schema';
import { calculateTotalVolume } from './utils';
import { useRecipes, RecipeMaterial } from "@/hooks/useRecipes";

const RecipeForm: React.FC = () => {
  const { addRecipe } = useRecipes();
  
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
        const totalVolume = calculateTotalVolume(form.getValues('materials'));
        form.setValue('totalVolume', totalVolume);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, form]);

  // Add a new recipe
  const onSubmit = (values: RecipeFormValues) => {
    // Ensure all material entries have the required properties
    const validMaterials: RecipeMaterial[] = values.materials.map(material => ({
      id: material.id || uuidv4(),
      name: material.name,
      quantity: material.quantity,
      unit: material.unit
    }));

    addRecipe.mutate({
      name: values.name,
      materials: validMaterials,
      instructions: values.instructions,
      totalVolume: values.totalVolume,
      isSop: values.isSop
    });
    form.reset();
  };

  return (
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
              
              <FormField
                control={form.control}
                name={`materials.${index}.id`}
                render={({ field }) => (
                  <input type="hidden" {...field} />
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
  );
};

export default RecipeForm;
