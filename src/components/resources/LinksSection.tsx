
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Trash2, ExternalLink, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useResourceLinks } from '@/hooks/useResourceLinks';

const linkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Please enter a valid URL"),
});

type LinkFormValues = z.infer<typeof linkSchema>;

interface LinksSectionProps {
  onCountChange: (count: number) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ onCountChange }) => {
  const { links, isLoading, addLink, deleteLink } = useResourceLinks();
  
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  // Update parent component with count
  React.useEffect(() => {
    onCountChange(links.length);
  }, [links.length, onCountChange]);

  // Add a new link
  const onSubmit = async (values: LinkFormValues) => {
    try {
      await addLink.mutateAsync(values);
      form.reset();
      
      toast({
        title: "Link saved",
        description: `"${values.title}" has been added to your resources`,
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  // Delete a link
  const handleDeleteLink = async (id: string) => {
    try {
      await deleteLink.mutateAsync(id);
      
      toast({
        title: "Link removed",
        description: "The link has been removed from your resources",
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                      <Input placeholder="https://example.com" {...field} />
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

      {links.length > 0 ? (
        <div className="space-y-3">
          {links.map((link) => (
            <Card key={link.id} className="relative group">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <h3 className="font-medium">{link.title}</h3>
                  <a 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-muted-foreground text-sm flex items-center hover:text-primary"
                  >
                    {link.url}
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="opacity-0 group-hover:opacity-100"
                  onClick={() => handleDeleteLink(link.id)}
                  disabled={deleteLink.isPending}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <Link className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No links saved yet</p>
          <p className="text-sm">Add your first link using the form above</p>
        </div>
      )}
    </div>
  );
};

export default LinksSection;
