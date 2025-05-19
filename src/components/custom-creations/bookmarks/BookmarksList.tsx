
import React, { useState } from 'react';
import { Bookmark, Trash2, Edit2, ExternalLink, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { UseMutationResult } from "@tanstack/react-query";
import { Bookmark as BookmarkType } from "@/hooks/useBookmarks";

interface BookmarksListProps {
  bookmarks: BookmarkType[];
  isLoading: boolean;
  deleteBookmark: UseMutationResult<string, Error, string, unknown>;
}

const BookmarksList: React.FC<BookmarksListProps> = ({ bookmarks, isLoading, deleteBookmark }) => {
  const [selectedBookmark, setSelectedBookmark] = useState<BookmarkType | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }
  
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground border rounded-lg">
        <Bookmark className="h-10 w-10 mx-auto mb-4 opacity-50" />
        <p>No bookmarks saved yet</p>
        <p className="text-sm">Add your first bookmark using the form above</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Saved Bookmarks ({bookmarks.length})</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="group overflow-hidden">
            <CardContent className="p-0">
              <div className="bg-muted p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-lg">{bookmark.title}</h3>
                    <a 
                      href={bookmark.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline flex items-center"
                    >
                      {bookmark.url.length > 30 ? `${bookmark.url.substring(0, 30)}...` : bookmark.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => {
                        setSelectedBookmark(bookmark);
                        setDialogOpen(true);
                      }}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => deleteBookmark.mutate(bookmark.id)}
                      disabled={deleteBookmark.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                
                {bookmark.category && (
                  <Badge className="mt-2" variant="outline">{bookmark.category}</Badge>
                )}
              </div>
              
              <div className="p-4">
                {bookmark.notes ? (
                  <p className="text-sm text-muted-foreground line-clamp-3">{bookmark.notes}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">No additional notes</p>
                )}
                <p className="text-xs text-muted-foreground mt-4">
                  Saved on: {new Date(bookmark.created_at).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedBookmark?.title}</DialogTitle>
          </DialogHeader>
          {selectedBookmark && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">URL</h4>
                <a 
                  href={selectedBookmark.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline flex items-center"
                >
                  {selectedBookmark.url}
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              
              {selectedBookmark.category && (
                <div>
                  <h4 className="text-sm font-medium">Category</h4>
                  <Badge variant="outline">{selectedBookmark.category}</Badge>
                </div>
              )}
              
              {selectedBookmark.notes && (
                <div>
                  <h4 className="text-sm font-medium">Notes</h4>
                  <p className="whitespace-pre-line">{selectedBookmark.notes}</p>
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium">Created</h4>
                <p>{new Date(selectedBookmark.created_at).toLocaleDateString()}</p>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BookmarksList;
