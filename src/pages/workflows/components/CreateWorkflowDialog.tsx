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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Step, TRADE_CATEGORIES } from "../utils/types";

interface WorkflowFormData {
  name: string;
  description: string | null;
  steps: Step[];
  trade: string;
}

interface CreateWorkflowDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: WorkflowFormData) => void;
}

const CreateWorkflowDialog: React.FC<CreateWorkflowDialogProps> = ({ 
  open, 
  onOpenChange,
  onSubmit 
}) => {
  const [formData, setFormData] = useState<WorkflowFormData>({
    name: "",
    description: "",
    steps: [],
    trade: "Wood Finishing"
  });
  
  const [newStep, setNewStep] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTradeChange = (value: string) => {
    setFormData(prev => ({ ...prev, trade: value }));
  };

  const addStep = () => {
    if (!newStep.trim()) return;
    
    const nextId = formData.steps.length > 0 
      ? Math.max(...formData.steps.map(step => step.id)) + 1 
      : 1;
    
    setFormData(prev => ({
      ...prev,
      steps: [...prev.steps, { id: nextId, name: newStep.trim() }]
    }));
    
    setNewStep("");
  };

  const removeStep = (id: number) => {
    setFormData(prev => ({
      ...prev,
      steps: prev.steps.filter(step => step.id !== id)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Workflow</DialogTitle>
          <DialogDescription>
            Define the steps and details for your new workflow.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Workflow Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter workflow name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe this workflow"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="trade">Trade Category</Label>
            <Select value={formData.trade} onValueChange={handleTradeChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select trade" />
              </SelectTrigger>
              <SelectContent>
                {TRADE_CATEGORIES.map(trade => (
                  <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            
            {formData.steps.length > 0 ? (
              <div className="mt-2 space-y-2">
                {formData.steps.map((step) => (
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
                No steps added yet. Add steps to define your workflow process.
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!formData.name || formData.steps.length === 0}>
              Create Workflow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
