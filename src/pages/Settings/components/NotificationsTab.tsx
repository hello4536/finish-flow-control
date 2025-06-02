
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { notificationsFormSchema, NotificationsFormValues } from "../types";

const NotificationsTab: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<NotificationsFormValues>({
    resolver: zodResolver(notificationsFormSchema),
    defaultValues: {
      emailNotifications: true,
      pushNotifications: true,
      jobCompletionAlerts: true,
      materialAlerts: true,
      weeklyReports: true
    }
  });

  function onSubmit(data: NotificationsFormValues) {
    toast({
      title: "Notification preferences updated",
      description: "Your notification settings have been saved."
    });
    console.log(data);
  }

  return (
    <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-white via-green-50/30 to-emerald-100/40 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">Notifications</CardTitle>
        <CardDescription className="text-slate-600 font-medium">
          Configure how you receive notifications and alerts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="emailNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Email Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive notifications via email.
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
                name="pushNotifications"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Push Notifications
                      </FormLabel>
                      <FormDescription>
                        Receive push notifications in your browser.
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
                name="jobCompletionAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Job Completion Alerts
                      </FormLabel>
                      <FormDescription>
                        Get notified when jobs are completed.
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
                name="materialAlerts"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Material Alerts
                      </FormLabel>
                      <FormDescription>
                        Get notified about low inventory and material issues.
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
                name="weeklyReports"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">
                        Weekly Reports
                      </FormLabel>
                      <FormDescription>
                        Receive weekly summary reports.
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
            </div>
            <Button type="submit" className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              Save Notification Settings
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default NotificationsTab;
