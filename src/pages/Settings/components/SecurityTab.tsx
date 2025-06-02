
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Mail } from "lucide-react";
import { securityFormSchema, SecurityFormValues } from "../types";

const SecurityTab: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      twoFactorAuth: false,
      loginMethod: "password",
      sessionTimeout: "1hour"
    }
  });

  function onSubmit(data: SecurityFormValues) {
    toast({
      title: "Security settings updated",
      description: "Your security preferences have been saved."
    });
    console.log(data);
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-red-50/30 to-rose-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-rose-600 bg-clip-text text-transparent">Security</CardTitle>
        <CardDescription className="text-slate-600 font-medium">
          Manage your security settings and preferences.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="twoFactorAuth"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">
                        Two-Factor Authentication
                      </FormLabel>
                      <Badge variant="outline" className="bg-orange-100 text-orange-600 hover:bg-orange-100">
                        Recommended
                      </Badge>
                    </div>
                    <FormDescription>
                      Add an extra layer of security to your account.
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

            <FormField
              control={form.control}
              name="loginMethod"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Login Method</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="password" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Password
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="sso" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Single Sign-On (SSO)
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
              name="sessionTimeout"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Session Timeout</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="30min" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          30 minutes
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="1hour" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          1 hour
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="4hours" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          4 hours
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="always" />
                        </FormControl>
                        <FormLabel className="font-normal">
                          Keep me logged in
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <ShieldCheck className="h-4 w-4" />
              Save Security Settings
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact <a href="#" className="text-primary underline">support@finishflow.com</a> if you need help with your security settings.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SecurityTab;
