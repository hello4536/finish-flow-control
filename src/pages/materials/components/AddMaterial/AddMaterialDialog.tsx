
import React from "react";
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Supplier } from "@/types/materials";
import MaterialForm from "./MaterialForm";
import { useAddMaterial } from "./useAddMaterial";

interface AddMaterialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  suppliers: Supplier[];
  onSuccess: () => void;
}

const AddMaterialDialog: React.FC<AddMaterialDialogProps> = ({ 
  open, 
  onOpenChange,
  suppliers,
  onSuccess
}) => {
  const { handleSubmit, isSubmitting } = useAddMaterial({ onSuccess, onOpenChange });
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Material</DialogTitle>
          <DialogDescription>
            Add a new material to your inventory. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <MaterialForm onSubmit={handleSubmit} suppliers={suppliers} />

        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            onClick={() => document.getElementById('submit-material-form')?.click()}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Material'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMaterialDialog;
