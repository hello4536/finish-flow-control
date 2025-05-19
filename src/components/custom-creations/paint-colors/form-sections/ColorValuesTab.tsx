
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PaintColorFormValues } from "../validation/paintColorSchema";

interface ColorValuesTabProps {
  form: UseFormReturn<PaintColorFormValues>;
}

const ColorValuesTab: React.FC<ColorValuesTabProps> = ({ form }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="hexCode"
        render={({ field }) => (
          <FormItem>
            <FormLabel>HEX Code</FormLabel>
            <div className="flex items-center gap-2">
              <FormControl>
                <Input placeholder="#0066CC" {...field} />
              </FormControl>
              <div 
                className="h-10 w-10 rounded-md border border-input" 
                style={{ backgroundColor: field.value }}
              />
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormField
          control={form.control}
          name="rgbValues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>RGB Values</FormLabel>
              <FormControl>
                <Input placeholder="0, 102, 204" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="cmykValues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CMYK Values</FormLabel>
              <FormControl>
                <Input placeholder="100, 50, 0, 20" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="labValues"
          render={({ field }) => (
            <FormItem>
              <FormLabel>L*a*b* Values</FormLabel>
              <FormControl>
                <Input placeholder="32.3, 79.2, -107.9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      
      <FormField
        control={form.control}
        name="deltaE"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Delta E (Spectrophotometer)</FormLabel>
            <FormControl>
              <Input placeholder="1.2" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ColorValuesTab;
