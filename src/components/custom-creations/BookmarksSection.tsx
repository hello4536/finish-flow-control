import React, { useEffect } from 'react';
import { useBookmarks } from "@/hooks/useBookmarks";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookmarkForm from './bookmarks/BookmarkForm';
import BookmarksList from './bookmarks/BookmarksList';
interface BookmarksSectionProps {
  onCountChange: (count: number) => void;
}
const BookmarksSection: React.FC<BookmarksSectionProps> = ({
  onCountChange
}) => {
  const {
    bookmarks,
    isLoading,
    addBookmark,
    deleteBookmark
  } = useBookmarks();

  // Update parent component with count
  useEffect(() => {
    if (bookmarks) {
      onCountChange(bookmarks.length || 0);
    }
  }, [bookmarks, onCountChange]);
  return <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg text-blue-600">Create New Bookmark</CardTitle>
          <CardDescription>
            Add a new bookmark to your collection with detailed information and notes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
            </TabsList>
            <BookmarkForm />
          </Tabs>
        </CardContent>
      </Card>
      
      <BookmarksList bookmarks={bookmarks} isLoading={isLoading} deleteBookmark={deleteBookmark} />
    </div>;
};
export default BookmarksSection;