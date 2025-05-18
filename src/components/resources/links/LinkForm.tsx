
import React from 'react';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ResourceLink } from '@/hooks/useResourceLinks';

interface LinkFormProps {
  addLink: {
    mutateAsync: (data: Omit<ResourceLink, 'id' | 'createdAt'>) => Promise<ResourceLink>;
    isPending: boolean;
  };
}

const linkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Please enter a valid URL"),
  description: z.string().optional(),
});

type LinkFormValues = z.infer<typeof linkSchema>;

const LinkForm: React.FC<LinkFormProps> = ({ addLink }) => {
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
      description: "",
    },
  });

  const onSubmit = async (values: LinkFormValues) => {
    try {
      await addLink.mutateAsync({
        title: values.title,
        url: values.url,
        description: values.description,
      });
      
      form.reset();
    } catch (error) {
      // Error handled in mutation
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Resource name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com" {...field} />
                </FormControl>
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
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Add a short description of this resource..." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={addLink.isPending}
          >
            <Link className="mr-2 h-4 w-4" />
            Save Link
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LinkForm;
