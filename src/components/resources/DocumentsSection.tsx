
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Paperclip, FileText, FilePdf, Trash2, Upload, File } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export interface ResourceDocument {
  id: string;
  name: string;
  type: string;
  size: number;
  createdAt: Date;
  url: string; // This would be a blob URL in a real app
}

interface DocumentsSectionProps {
  onCountChange: (count: number) => void;
}

// Helper function to get the appropriate icon based on file type
const getFileIcon = (type: string) => {
  if (type.includes('pdf')) return FilePdf;
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
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
  // Mock file upload (in a real app, this would handle actual file uploads)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newDocuments: ResourceDocument[] = [];
    
    Array.from(files).forEach(file => {
      // Create a blob URL (in a real app, this would be an actual storage URL)
      const url = URL.createObjectURL(file);
      
      newDocuments.push({
        id: crypto.randomUUID(),
        name: file.name,
        type: file.type,
        size: file.size,
        createdAt: new Date(),
        url
      });
    });
    
    const updatedDocs = [...documents, ...newDocuments];
    setDocuments(updatedDocs);
    onCountChange(updatedDocs.length);
    
    toast({
      title: "Documents uploaded",
      description: `${newDocuments.length} document(s) have been uploaded`,
    });
    
    // Reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Delete a document
  const deleteDocument = (id: string) => {
    const doc = documents.find(d => d.id === id);
    if (doc?.url) {
      // Revoke the blob URL to free up memory
      URL.revokeObjectURL(doc.url);
    }
    
    const updatedDocs = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocs);
    onCountChange(updatedDocs.length);
    
    toast({
      title: "Document removed",
      description: "The document has been removed from your resources",
    });
  };

  // Preview a document
  const previewDocument = (doc: ResourceDocument) => {
    window.open(doc.url, '_blank');
  };

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
        <Button onClick={() => fileInputRef.current?.click()}>
          <Upload className="mr-2 h-4 w-4" />
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
                        deleteDocument(doc.id);
                      }}
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
