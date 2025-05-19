
import React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { formSchema, hazardClasses } from "../schema";

type FormValues = z.infer<typeof formSchema>;

interface HazardExpiryFieldsProps {
  form: UseFormReturn<FormValues>;
}

export const HazardExpiryFields: React.FC<HazardExpiryFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <FormField control={form.control} name="hazard_class" render={({ field }) => (
        <FormItem>
          <FormLabel>Hazard Class</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select hazard class" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {hazardClasses.map(hazard => <SelectItem key={hazard} value={hazard}>{hazard}</SelectItem>)}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )} />
      
      <FormField control={form.control} name="expiration_date" render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>Expiration Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                  {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={field.value || undefined} onSelect={field.onChange} disabled={date => date < new Date()} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )} />
    </div>
  );
};
