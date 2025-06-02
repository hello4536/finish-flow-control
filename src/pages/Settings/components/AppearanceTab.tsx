
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { appearanceFormSchema, AppearanceFormValues } from "../types";

const AppearanceTab: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues: {
      language: "en",
      compactMode: false
    }
  });

  function onSubmit(data: AppearanceFormValues) {
    toast({
      title: "Appearance settings updated",
      description: "Your display preferences have been saved."
    });
    console.log(data);
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-purple-50/30 to-violet-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">Appearance</CardTitle>
        <CardDescription className="text-slate-600 font-medium">
          Customize how FinishFlow looks and feels.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-row space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="en" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          English
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="es" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Español
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="fr" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Français
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="compactMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">
                      Compact Mode
                    </FormLabel>
                    <FormDescription>
                      Use a more compact layout to fit more content on screen.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="bg-blue-600 hover:bg-blue-500"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Save Appearance Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AppearanceTab;
