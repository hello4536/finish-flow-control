
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StainFormValues, applicationMethods, substrates } from "../validation/stainSchema";

interface ApplicationTabProps {
  form: UseFormReturn<StainFormValues>;
  selectedSubstrates: string[];
  setSelectedSubstrates: React.Dispatch<React.SetStateAction<string[]>>;
}

const ApplicationTab: React.FC<ApplicationTabProps> = ({ 
  form, 
  selectedSubstrates, 
  setSelectedSubstrates 
}) => {
  // Toggle substrate selection
  const toggleSubstrate = (substrate: string) => {
    if (selectedSubstrates.includes(substrate)) {
      setSelectedSubstrates(selectedSubstrates.filter(s => s !== substrate));
    } else {
      setSelectedSubstrates([...selectedSubstrates, substrate]);
    }
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="applicationMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Application Method</FormLabel>
            <Select 
              onValueChange={field.onChange}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select application method" />
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
      
      <div>
        <FormLabel>Substrate Compatibility</FormLabel>
        <div className="mt-1 grid grid-cols-2 md:grid-cols-3 gap-2">
          {substrates.map(substrate => (
            <div key={substrate} className="flex items-center">
              <Button
                type="button"
                variant={selectedSubstrates.includes(substrate) ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => toggleSubstrate(substrate)}
              >
                {substrate}
              </Button>
            </div>
          ))}
        </div>
        {form.formState.errors.substrateCompatibility && (
          <p className="text-sm font-medium text-destructive mt-2">
            {form.formState.errors.substrateCompatibility.message}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="dryingTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Drying Time</FormLabel>
              <FormControl>
                <Input placeholder="2-4 hours" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="coatsRecommended"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recommended Coats</FormLabel>
              <FormControl>
                <Input placeholder="1-2 coats" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ApplicationTab;
