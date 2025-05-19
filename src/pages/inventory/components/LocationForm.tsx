
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { Location } from "@/types/inventory";

const locationTypes = [
  "Warehouse",
  "Department",
  "Section",
  "Rack",
  "Cabinet",
  "Shelf",
  "Bin",
  "Locker",
  "Other"
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  type: z.string().min(1, "Type is required"),
  parent_id: z.string().nullable(),
  description: z.string().optional(),
  capacity: z.coerce.number().min(0, "Capacity must be a positive number"),
  utilized: z.coerce.number().min(0, "Utilized must be a positive number")
});

type FormValues = z.infer<typeof formSchema>;

interface LocationFormProps {
  onSubmit: (data: FormValues) => void;
  initialValues?: Partial<FormValues>;
  submitLabel?: string;
}

const LocationForm: React.FC<LocationFormProps> = ({
  onSubmit,
  initialValues = {},
  submitLabel = "Add Location"
}) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "Warehouse",
      parent_id: null,
      description: "",
      capacity: 0,
      utilized: 0,
      ...initialValues
    }
  });
  
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('locations')
          .select('*');
          
        if (error) throw error;
        
        setLocations(data || []);
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchLocations();
  }, []);
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Location name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {locationTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="parent_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parent Location</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value || undefined}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="None (Top Level)" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="null">None (Top Level)</SelectItem>
                    {isLoading ? (
                      <SelectItem value="loading" disabled>Loading...</SelectItem>
                    ) : (
                      locations.map(location => (
                        <SelectItem key={location.id} value={location.id}>
                          {location.name} ({location.type})
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Optional: make this a sub-location of another location
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Description or notes about this location" 
                  rows={3}
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="capacity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Capacity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={0} />
                </FormControl>
                <FormDescription>
                  Maximum storage capacity (units)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="utilized"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Currently Utilized</FormLabel>
                <FormControl>
                  <Input type="number" {...field} min={0} />
                </FormControl>
                <FormDescription>
                  Space currently in use (units)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="w-full">
          {submitLabel}
        </Button>
      </form>
    </Form>
  );
};

export default LocationForm;
