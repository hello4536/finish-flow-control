
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LinksSection from '@/components/resources/LinksSection';
import DocumentsSection from '@/components/resources/DocumentsSection';
import NotesSection from '@/components/resources/NotesSection';
import { toast } from "@/hooks/use-toast";

const Resources = () => {
  // Resource counts for badges
  const [counts, setCounts] = useState({
    links: 0,
    documents: 0,
    notes: 0
  });

  // Update counts when resources change
  const updateCounts = (type: 'links' | 'documents' | 'notes', count: number) => {
    setCounts(prev => ({
      ...prev,
      [type]: count
    }));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        <p className="text-muted-foreground mt-1">
          Save and organize your important resources in one place
        </p>
      </div>

      <Tabs defaultValue="links" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="links" className="relative">
            Links
            {counts.links > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.links}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="documents" className="relative">
            Documents
            {counts.documents > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.documents}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger value="notes" className="relative">
            Notes
            {counts.notes > 0 && (
              <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {counts.notes}
              </span>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="links" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Links</CardTitle>
              <CardDescription>Save important URLs and website links</CardDescription>
            </CardHeader>
            <CardContent>
              <LinksSection onCountChange={(count) => updateCounts('links', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
              <CardDescription>Upload and organize important files</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentsSection onCountChange={(count) => updateCounts('documents', count)} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="notes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
              <CardDescription>Keep track of important information</CardDescription>
            </CardHeader>
            <CardContent>
              <NotesSection onCountChange={(count) => updateCounts('notes', count)} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Resources;
