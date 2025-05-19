
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { formSchema, inventoryCategories } from "../schema";
import { supabase } from "@/integrations/supabase/client";
import { Location } from "@/types/inventory";

type FormValues = z.infer<typeof formSchema>;

interface CategoryLocationFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const CategoryLocationFields: React.FC<CategoryLocationFieldsProps> = ({ form }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('location_paths')
          .select('*')
          .order('full_path', { ascending: true });
          
        if (error) throw error;
        
        // Cast the data to match our Location type with optional fields for the view
        setLocations((data || []) as Location[]);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="category" render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {inventoryCategories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="location_id" render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value as string || ""}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="">None</SelectItem>
              {isLoading ? (
                <SelectItem value="" disabled>Loading...</SelectItem>
              ) : (
                locations.map(location => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.full_path || location.name}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
          <FormDescription>Select where this item is stored</FormDescription>
          <FormMessage />
        </FormItem>
      )} />

      <FormField control={form.control} name="location" render={({ field }) => (
        <FormItem>
          <FormLabel>Location Description</FormLabel>
          <FormControl>
            <Input placeholder="Additional location details" {...field} />
          </FormControl>
          <FormDescription>Optional: add more specific location details</FormDescription>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
