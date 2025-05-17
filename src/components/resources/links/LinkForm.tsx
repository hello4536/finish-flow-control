
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Link, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseResourceLinksReturn } from '@/hooks/useResourceLinks';

// Function to normalize URL (add http/https if missing)
export const normalizeUrl = (url: string) => {
  let normalizedUrl = url.trim();
  if (normalizedUrl && !normalizedUrl.match(/^https?:\/\//i)) {
    normalizedUrl = `https://${normalizedUrl}`;
  }
  return normalizedUrl;
};

// Less strict URL validation
export const linkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string()
    .min(1, "URL is required")
    .transform(normalizeUrl)
    // Only validate after normalization
    .refine(
      (val) => {
        try {
          new URL(val);
          return true;
        } catch (e) {
          return false;
        }
      }, 
      "Please enter a valid URL"
    )
});

export type LinkFormValues = z.infer<typeof linkSchema>;

interface LinkFormProps {
  addLink: UseResourceLinksReturn['addLink'];
}

const LinkForm: React.FC<LinkFormProps> = ({ addLink }) => {
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const onSubmit = async (values: LinkFormValues) => {
    try {
      // URL is already normalized by schema transform
      const linkData = {
        title: values.title,
        url: values.url
      };
      
      await addLink.mutateAsync(linkData);
      form.reset();
      
      toast({
        title: "Link saved",
        description: `"${values.title}" has been added to your resources`,
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Product Documentation" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex-1">
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder="example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="self-end">
            <Button 
              type="submit" 
              className="w-full md:w-auto"
              disabled={addLink.isPending}
            >
              {addLink.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Link className="mr-2 h-4 w-4" />
              )}
              Save Link
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default LinkForm;
