import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { z } from "zod";
import { formSchema, inventoryCategories } from "../schema";
import { useInventoryData } from "@/hooks/inventory";
import { Location } from "@/types/inventory";

type FormValues = z.infer<typeof formSchema>;

interface CategoryLocationFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const CategoryLocationFields: React.FC<CategoryLocationFieldsProps> = ({ form }) => {
  const { locations, isLoading: locationsLoading } = useInventoryData();
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [isCreateCategoryOpen, setIsCreateCategoryOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  // Combine default categories with custom ones
  const allCategories = [...inventoryCategories, ...customCategories];

  const handleCreateCategory = () => {
    if (newCategoryName.trim() && !allCategories.includes(newCategoryName.trim())) {
      const newCategory = newCategoryName.trim();
      setCustomCategories(prev => [...prev, newCategory]);
      form.setValue("category", newCategory);
      setNewCategoryName("");
      setIsCreateCategoryOpen(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="category" render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <div className="flex gap-2">
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {allCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Dialog open={isCreateCategoryOpen} onOpenChange={setIsCreateCategoryOpen}>
              <DialogTrigger asChild>
                <Button type="button" variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Create New Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <FormLabel>Category Name</FormLabel>
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="Enter category name"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleCreateCategory();
                        }
                      }}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setIsCreateCategoryOpen(false);
                        setNewCategoryName("");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCreateCategory}
                      disabled={!newCategoryName.trim() || allCategories.includes(newCategoryName.trim())}
                    >
                      Create Category
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="location_id" render={({ field }) => (
        <FormItem>
          <FormLabel>Location</FormLabel>
          <Select 
            onValueChange={field.onChange} 
            defaultValue={field.value as string || undefined}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a location" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {locationsLoading ? (
                <SelectItem value="loading" disabled>Loading...</SelectItem>
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
