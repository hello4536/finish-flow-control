
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, FileText, File, Trash2, Upload, Loader2 } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useResourceDocuments } from '@/hooks/useResourceDocuments';
import { toast } from "@/hooks/use-toast";

interface DocumentsSectionProps {
  onCountChange: (count: number) => void;
}

// Helper function to get the appropriate icon based on file type
const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return FileText;
  if (type.includes('text') || type.includes('doc')) return FileText;
  return File;
};

// Helper function to format file size
const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return bytes + ' bytes';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
};

const DocumentsSection: React.FC<DocumentsSectionProps> = ({ onCountChange }) => {
  const { documents, isLoading, uploadDocument, deleteDocument } = useResourceDocuments();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Update parent component with count
  React.useEffect(() => {
    onCountChange(documents.length);
  }, [documents.length, onCountChange]);
  
  // Handle file change
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        await uploadDocument.mutateAsync(file);
      } catch (error) {
        // Error is handled in the mutation
      }
    }
    
    toast({
      title: "Documents uploaded",
      description: `${files.length} document(s) have been uploaded`,
    });
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete a document
  const handleDeleteDocument = async (doc: any) => {
    try {
      await deleteDocument.mutateAsync(doc);
      
      toast({
        title: "Document removed",
        description: "The document has been removed from your resources",
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };

  // Preview a document
  const previewDocument = (doc: any) => {
    window.open(doc.url, '_blank');
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
      <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-md p-10 border-border">
        <Paperclip className="h-10 w-10 mb-4 text-muted-foreground" />
        <p className="text-center mb-4">
          Drag and drop files here, or click to select files
        </p>
        <Input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          multiple
          accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png,.csv,.xlsx"
          id="file-upload"
        />
        <Button 
          onClick={() => fileInputRef.current?.click()}
          disabled={uploadDocument.isPending}
        >
          {uploadDocument.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Upload className="mr-2 h-4 w-4" />
          )}
          Select Files
        </Button>
      </div>

      {documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => {
            const FileIcon = getFileIcon(doc.type);
            const isPdf = doc.type.includes('pdf');
            const isImage = doc.type.includes('image');
            
            return (
              <Card key={doc.id} className="overflow-hidden group">
                <div
                  className="cursor-pointer"
                  onClick={() => previewDocument(doc)}
                >
                  {isImage ? (
                    <AspectRatio ratio={16/9}>
                      <img
                        src={doc.url}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </AspectRatio>
                  ) : (
                    <div className="bg-muted h-32 flex items-center justify-center">
                      <FileIcon className="h-16 w-16 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-2">
                      <p className="font-medium truncate" title={doc.name}>
                        {doc.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatFileSize(doc.size)} • {new Date(doc.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDocument(doc);
                      }}
                      disabled={deleteDocument.isPending}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-10 text-muted-foreground">
          <Paperclip className="h-10 w-10 mx-auto mb-4 opacity-50" />
          <p>No documents uploaded yet</p>
          <p className="text-sm">Upload your first document using the form above</p>
        </div>
      )}
    </div>
  );
};

export default DocumentsSection;
