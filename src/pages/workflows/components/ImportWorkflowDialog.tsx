
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ImportWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (workflows: any[]) => void;
}

const ImportWorkflowDialog: React.FC<ImportWorkflowDialogProps> = ({
  open,
  onOpenChange,
  onImport
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a JSON file to import workflows.",
        variant: "destructive",
      });
      return;
    }

    if (!file.name.endsWith('.json')) {
      toast({
        title: "Invalid file format",
        description: "Please select a JSON file.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const content = await file.text();
      const workflows = JSON.parse(content);
      
      if (!Array.isArray(workflows)) {
        throw new Error('File does not contain a valid workflow array');
      }
      
      onImport(workflows);
    } catch (error) {
      console.error("Error parsing workflow file:", error);
      toast({
        title: "Invalid file format",
        description: "The selected file is not a valid workflow JSON file.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Workflows</DialogTitle>
          <DialogDescription>
            Import workflows from a JSON file.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-6 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="workflow-file">Select File</Label>
            <Input
              id="workflow-file"
              type="file"
              accept=".json"
              onChange={handleFileChange}
            />
          </div>
          
          {file && (
            <div className="bg-secondary/20 p-3 rounded-md">
              <p className="text-sm font-medium">Selected file:</p>
              <p className="text-sm">{file.name}</p>
            </div>
          )}
          
          <div className="text-sm text-muted-foreground">
            <p>The file should contain a JSON array of workflow objects.</p>
            <p>Each workflow must include at minimum a name and trade category.</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={!file || isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                Importing...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Import
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImportWorkflowDialog;
