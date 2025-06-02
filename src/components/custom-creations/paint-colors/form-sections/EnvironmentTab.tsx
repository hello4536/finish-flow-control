
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PaintColorFormValues } from "../validation/paintColorSchema";

interface EnvironmentTabProps {
  form: UseFormReturn<PaintColorFormValues>;
}

const EnvironmentTab: React.FC<EnvironmentTabProps> = ({ form }) => {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <FormField
          control={form.control}
          name="temperature"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Temperature</FormLabel>
              <FormControl>
                <Input placeholder="72°F" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="humidity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Humidity</FormLabel>
              <FormControl>
                <Input placeholder="45%" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="boothLighting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Booth Lighting</FormLabel>
              <FormControl>
                <Input placeholder="D65" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="environmentalNotes"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Environmental Notes</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Notes about environmental conditions during color creation" 
                className="min-h-[60px]" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default EnvironmentTab;
