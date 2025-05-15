
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import { Link, Trash2, ExternalLink } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const linkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Please enter a valid URL"),
});

type LinkFormValues = z.infer<typeof linkSchema>;

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  createdAt: Date;
}

interface LinksSectionProps {
  onCountChange: (count: number) => void;
}

const LinksSection: React.FC<LinksSectionProps> = ({ onCountChange }) => {
  const [links, setLinks] = useState<ResourceLink[]>([]);
  
  const form = useForm<LinkFormValues>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  // Add a new link
  const onSubmit = (values: LinkFormValues) => {
    const newLink: ResourceLink = {
      id: crypto.randomUUID(),
      title: values.title,
      url: values.url,
      createdAt: new Date(),
    };
    
    const updatedLinks = [...links, newLink];
    setLinks(updatedLinks);
    onCountChange(updatedLinks.length);
    form.reset();
    
    toast({
      title: "Link saved",
      description: `"${values.title}" has been added to your resources`,
    });
  };

  // Delete a link
  const deleteLink = (id: string) => {
    const updatedLinks = links.filter(link => link.id !== id);
    setLinks(updatedLinks);
    onCountChange(updatedLinks.length);
    
    toast({
      title: "Link removed",
      description: "The link has been removed from your resources",
    });
  };

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
              <Button type="submit" className="w-full md:w-auto">
                <Link className="mr-2 h-4 w-4" />
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
                  onClick={() => deleteLink(link.id)}
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
