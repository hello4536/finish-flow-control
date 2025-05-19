
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import LocationForm from "./LocationForm";

interface AddLocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
  parentId?: string | null;
}

const AddLocationDialog: React.FC<AddLocationDialogProps> = ({ 
  open, 
  onOpenChange,
  onSuccess,
  parentId = null
}) => {
  const { toast } = useToast();
  
  const handleSubmit = async (data: any) => {
    try {
      const locationData = {
        ...data,
        parent_id: data.parent_id || null,
        capacity: parseInt(data.capacity) || 0,
        utilized: parseInt(data.utilized) || 0
      };
      
      const { error } = await supabase.from('locations').insert(locationData);
      
      if (error) throw error;
      
      toast({
        title: "Location added",
        description: "The location has been added successfully."
      });
      
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error('Error adding location:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add location",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="p-1">
            <LocationForm 
              onSubmit={handleSubmit} 
              initialValues={{ parent_id: parentId }}
            />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddLocationDialog;
