
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FileText, Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const noteSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Note content is required"),
});

type NoteFormValues = z.infer<typeof noteSchema>;

export interface ResourceNote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

interface NotesSectionProps {
  onCountChange: (count: number) => void;
}

const NotesSection: React.FC<NotesSectionProps> = ({ onCountChange }) => {
  const [notes, setNotes] = useState<ResourceNote[]>([]);
  
  const form = useForm<NoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  // Add a new note
  const onSubmit = (values: NoteFormValues) => {
    const newNote: ResourceNote = {
      id: crypto.randomUUID(),
      title: values.title,
      content: values.content,
      createdAt: new Date(),
    };
    
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    onCountChange(updatedNotes.length);
    form.reset();
    
    toast({
      title: "Note saved",
      description: `"${values.title}" has been added to your notes`,
    });
  };

  // Delete a note
  const deleteNote = (id: string) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    onCountChange(updatedNotes.length);
    
    toast({
      title: "Note removed",
      description: "The note has been removed from your resources",
    });
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Note Title</FormLabel>
                <FormControl>
                  <Input placeholder="Meeting Summary" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Write your note here..." 
                    className="min-h-[150px]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" className="w-full md:w-auto">
            <FileText className="mr-2 h-4 w-4" />
            Save Note
          </Button>
        </form>
      </Form>

      {notes.length > 0 ? (
        <div className="space-y-4">
          {notes.map((note) => (
            <Card key={note.id} className="group">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{note.title}</h3>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="opacity-0 group-hover:opacity-100"
                    onClick={() => deleteNote(note.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                <p className="whitespace-pre-wrap text-muted-foreground">
                  {note.content}
                </p>
              </CardContent>
              <CardFooter className="px-4 py-2 text-xs text-muted-foreground border-t">
                Created on {new Date(note.createdAt).toLocaleString()}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <FileText className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No notes created yet</p>
          <p className="text-sm">Add your first note using the form above</p>
        </div>
      )}
    </div>
  );
};

export default NotesSection;
