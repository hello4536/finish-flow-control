
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookmarks } from "@/hooks/useBookmarks";
import { Separator } from "@/components/ui/separator";
import { bookmarkSchema } from "./validation/bookmarkSchema";

type BookmarkFormValues = z.infer<typeof bookmarkSchema>;

const BookmarkForm: React.FC = () => {
  const { addBookmark } = useBookmarks();

  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
      category: "general",
      notes: ""
    }
  });

  // Add a new bookmark
  const onSubmit = (values: BookmarkFormValues) => {
    // Pass only the parameters that are expected by the mutation function
    addBookmark.mutate({
      title: values.title,
      url: values.url,
      notes: values.notes
      // Removed category as it's not expected in the mutation function
    });
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Basic Information Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Basic Information</h3>
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Woodworking Tutorial" {...field} />
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
                      <Input placeholder="https://example.com/tutorial" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="Reference, Tutorial, etc." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <Separator className="my-3" />
        
        {/* Additional Details Section */}
        <div>
          <h3 className="text-base font-semibold text-blue-600 mb-3">Additional Details</h3>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any notes about this bookmark" 
                    className="min-h-[80px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Separator className="my-4" />
        
        <Button 
          type="submit" 
          disabled={addBookmark.isPending} 
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500"
        >
          {addBookmark.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Save Bookmark
            </>
          )}
        </Button>
      </form>
    </Form>
  );
};

export default BookmarkForm;
