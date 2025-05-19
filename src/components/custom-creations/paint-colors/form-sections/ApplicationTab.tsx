
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PaintColorFormValues } from "../validation/paintColorSchema";
import { substrates, applicationMethods } from "../validation/paintColorData";

interface ApplicationTabProps {
  form: UseFormReturn<PaintColorFormValues>;
  swatchImage: File | null;
  onImageChange: (file: File | null) => void;
}

const ApplicationTab: React.FC<ApplicationTabProps> = ({ form, swatchImage, onImageChange }) => {
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onImageChange(file);
  };

  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel>Color Swatch Image</FormLabel>
        <div className="flex items-center gap-2">
          <Input type="file" accept="image/png, image/jpeg" onChange={handleImageChange} />
          {swatchImage && (
            <div className="h-10 w-10 rounded border border-input overflow-hidden">
              <img 
                src={URL.createObjectURL(swatchImage)} 
                alt="Color swatch preview" 
                className="h-full w-full object-cover" 
              />
            </div>
          )}
        </div>
      </FormItem>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="substrateType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Substrate Type</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select substrate" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {substrates.map(substrate => (
                    <SelectItem key={substrate} value={substrate}>{substrate}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="applicationMethod"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Application Method</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {applicationMethods.map(method => (
                    <SelectItem key={method} value={method}>{method}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ApplicationTab;
