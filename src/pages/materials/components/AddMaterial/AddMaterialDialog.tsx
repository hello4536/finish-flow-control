
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
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Add New Material
          </DialogTitle>
          <DialogDescription>
            Add a new material to your inventory. Fill in the details below.
          </DialogDescription>
        </DialogHeader>

        <MaterialForm onSubmit={handleSubmit} suppliers={suppliers} />

        <DialogFooter className="gap-2">
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
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
          >
            {isSubmitting ? 'Adding...' : 'Add Material'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddMaterialDialog;
