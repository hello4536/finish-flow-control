
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { SprayBooth } from "../types";
import { useCreateReservation } from "../hooks/useBoothReservations";
import { toast } from "sonner";

interface ReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedSlot: {
    boothId: string;
    date: Date;
    startTime: string;
  } | null;
  booths: SprayBooth[];
}

interface ReservationForm {
  reserved_by: string;
  start_time: string;
  end_time: string;
  job_reference?: string;
  priority: "low" | "medium" | "high" | "urgent";
  notes?: string;
}

export const ReservationDialog: React.FC<ReservationDialogProps> = ({
  open,
  onOpenChange,
  selectedSlot,
  booths
}) => {
  const { register, handleSubmit, reset, setValue, watch } = useForm<ReservationForm>();
  const createReservation = useCreateReservation();

  const selectedBooth = selectedSlot ? booths.find(b => b.id === selectedSlot.boothId) : null;

  const onSubmit = async (data: ReservationForm) => {
    if (!selectedSlot) return;

    try {
      await createReservation.mutateAsync({
        booth_id: selectedSlot.boothId,
        date: format(selectedSlot.date, "yyyy-MM-dd"),
        ...data
      });
      
      toast.success("Reservation created successfully");
      onOpenChange(false);
      reset();
    } catch (error) {
      toast.error("Failed to create reservation");
    }
  };

  React.useEffect(() => {
    if (selectedSlot) {
      setValue("start_time", selectedSlot.startTime);
      setValue("priority", "medium");
    }
  }, [selectedSlot, setValue]);

  if (!selectedSlot || !selectedBooth) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Booth Reservation</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Booth</Label>
              <Input value={selectedBooth.name} disabled />
            </div>
            <div>
              <Label>Date</Label>
              <Input value={format(selectedSlot.date, "MMM d, yyyy")} disabled />
            </div>
          </div>

          <div>
            <Label htmlFor="reserved_by">Reserved By</Label>
            <Input
              id="reserved_by"
              {...register("reserved_by", { required: true })}
              placeholder="Employee name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start_time">Start Time</Label>
              <Input
                id="start_time"
                type="time"
                {...register("start_time", { required: true })}
              />
            </div>
            <div>
              <Label htmlFor="end_time">End Time</Label>
              <Input
                id="end_time"
                type="time"
                {...register("end_time", { required: true })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="job_reference">Job Reference</Label>
            <Input
              id="job_reference"
              {...register("job_reference")}
              placeholder="Job number or reference (optional)"
            />
          </div>

          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select onValueChange={(value) => setValue("priority", value as any)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional notes (optional)"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createReservation.isPending}>
              {createReservation.isPending ? "Creating..." : "Create Reservation"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
