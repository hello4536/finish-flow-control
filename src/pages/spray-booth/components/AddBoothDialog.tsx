
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { SprayBooth } from "../types";
import { useCreateBooth, useUpdateBooth } from "../hooks/useSprayBooths";
import { toast } from "sonner";

interface AddBoothDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editingBooth?: SprayBooth | null;
}

interface BoothForm {
  name: string;
  booth_number: string;
  location?: string;
  capacity: number;
  status: "active" | "maintenance" | "offline";
  notes?: string;
}

export const AddBoothDialog: React.FC<AddBoothDialogProps> = ({
  open,
  onOpenChange,
  editingBooth
}) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<BoothForm>();
  const createBooth = useCreateBooth();
  const updateBooth = useUpdateBooth();

  const isEditing = !!editingBooth;

  React.useEffect(() => {
    if (editingBooth) {
      setValue("name", editingBooth.name);
      setValue("booth_number", editingBooth.booth_number);
      setValue("location", editingBooth.location || "");
      setValue("capacity", editingBooth.capacity || 1);
      setValue("status", editingBooth.status);
      setValue("notes", editingBooth.notes || "");
    } else {
      reset();
      setValue("capacity", 1);
      setValue("status", "active");
    }
  }, [editingBooth, setValue, reset]);

  const onSubmit = async (data: BoothForm) => {
    try {
      if (isEditing && editingBooth) {
        await updateBooth.mutateAsync({
          id: editingBooth.id,
          ...data
        });
        toast.success("Booth updated successfully");
      } else {
        await createBooth.mutateAsync(data);
        toast.success("Booth created successfully");
      }
      
      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error(isEditing ? "Failed to update booth" : "Failed to create booth");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit Spray Booth" : "Add New Spray Booth"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Booth Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                placeholder="Main Spray Booth"
              />
            </div>
            <div>
              <Label htmlFor="booth_number">Booth Number</Label>
              <Input
                id="booth_number"
                {...register("booth_number", { required: true })}
                placeholder="001"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...register("location")}
              placeholder="Building A, Floor 1 (optional)"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                {...register("capacity", { required: true, valueAsNumber: true })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select onValueChange={(value) => setValue("status", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional information about this booth (optional)"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={createBooth.isPending || updateBooth.isPending}
            >
              {(createBooth.isPending || updateBooth.isPending) 
                ? (isEditing ? "Updating..." : "Creating...") 
                : (isEditing ? "Update Booth" : "Create Booth")
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
