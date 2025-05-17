import React, { useState, useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Step, Workflow } from "../utils/types";

interface EditWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  workflow: Workflow;
  onSubmit: (data: { name: string; description: string | null; steps: Step[] }) => void;
}

const EditWorkflowDialog: React.FC<EditWorkflowDialogProps> = ({
  open,
  onOpenChange,
  workflow,
  onSubmit
}) => {
  const [name, setName] = useState(workflow.name);
  const [description, setDescription] = useState(workflow.description || "");
  const [steps, setSteps] = useState<Step[]>(workflow.steps);
  const [newStep, setNewStep] = useState("");

  useEffect(() => {
    if (open) {
      setName(workflow.name);
      setDescription(workflow.description || "");
      setSteps(workflow.steps);
    }
  }, [open, workflow]);

  const addStep = () => {
    if (!newStep.trim()) return;
    
    const nextId = steps.length > 0 ? Math.max(...steps.map(step => step.id)) + 1 : 1;
    setSteps([...steps, { id: nextId, name: newStep.trim() }]);
    setNewStep("");
  };

  const removeStep = (id: number) => {
    setSteps(steps.filter(step => step.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      description: description || null,
      steps
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Edit Workflow</DialogTitle>
          <DialogDescription>
            Make changes to your workflow details and steps.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="edit-name">Workflow Name</Label>
            <Input
              id="edit-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="edit-description">Description</Label>
            <Textarea
              id="edit-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label>Workflow Steps</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a step"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
              />
              <Button type="button" onClick={addStep} variant="secondary">
                Add
              </Button>
            </div>
            
            {steps.length > 0 ? (
              <div className="mt-2 space-y-2">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center justify-between bg-secondary/20 p-2 rounded-md">
                    <div className="flex items-center">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground mr-2">
                        {step.id}
                      </div>
                      {step.name}
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeStep(step.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-muted-foreground mt-2">
                No steps defined. Add steps to define the workflow process.
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!name || steps.length === 0}>
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWorkflowDialog;
