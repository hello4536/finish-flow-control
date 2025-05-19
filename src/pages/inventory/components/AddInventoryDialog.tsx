
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import AddInventoryForm from "./AddInventoryForm";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AddInventoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const AddInventoryDialog: React.FC<AddInventoryDialogProps> = ({ 
  open, 
  onOpenChange,
  onSuccess
}) => {
  const { toast } = useToast();
  
  const handleSubmit = async (data: any) => {
    try {
      // Format date for Supabase
      const formattedData = {
        ...data,
        expiration_date: data.expiration_date ? data.expiration_date.toISOString().split('T')[0] : null,
      };
      
      const { error } = await supabase.from('inventory_items').insert(formattedData);
      
      if (error) throw error;
      
      toast({
        title: "Item added",
        description: "The inventory item has been added successfully."
      });
      
      onOpenChange(false);
      onSuccess();
    } catch (error: any) {
      console.error('Error adding inventory item:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to add inventory item",
        variant: "destructive"
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Add Inventory Item</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-8rem)]">
          <div className="p-1">
            <AddInventoryForm onSubmit={handleSubmit} />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default AddInventoryDialog;
