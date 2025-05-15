
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Bookmark, Trash2, Plus, ExternalLink, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useBookmarks } from "@/hooks/useBookmarks";

const bookmarkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Must be a valid URL"),
  notes: z.string().optional(),
});

type BookmarkFormValues = z.infer<typeof bookmarkSchema>;

interface BookmarksSectionProps {
  onCountChange: (count: number) => void;
}

const BookmarksSection: React.FC<BookmarksSectionProps> = ({ onCountChange }) => {
  const { bookmarks, isLoading, addBookmark, deleteBookmark } = useBookmarks();
  
  const form = useForm<BookmarkFormValues>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
      notes: "",
    },
  });

  // Update parent component with count
  React.useEffect(() => {
    onCountChange(bookmarks.length);
  }, [bookmarks.length, onCountChange]);

  // Add a new bookmark
  const onSubmit = (values: BookmarkFormValues) => {
    addBookmark.mutate({
      title: values.title,
      url: values.url,
      notes: values.notes
    });
    form.reset();
  };

  return (
    <div className="space-y-6">
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
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Add any notes about this bookmark" 
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            disabled={addBookmark.isPending}
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

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : bookmarks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="group">
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium">{bookmark.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => deleteBookmark.mutate(bookmark.id)}
                    disabled={deleteBookmark.isPending}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <a 
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mt-1 text-sm text-primary hover:underline"
                >
                  {bookmark.url}
                  <ExternalLink className="ml-1 h-3 w-3" />
                </a>
                
                {bookmark.notes && (
                  <p className="text-sm mt-2 text-muted-foreground">
                    {bookmark.notes}
                  </p>
                )}
                
                <p className="text-xs text-muted-foreground mt-4">
                  Saved on: {new Date(bookmark.created_at).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <Bookmark className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No bookmarks saved yet</p>
          <p className="text-sm">Add your first bookmark using the form above</p>
        </div>
      )}
    </div>
  );
};

export default BookmarksSection;
