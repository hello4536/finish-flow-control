
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
import { Plus, X, Workflow } from "lucide-react";

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
      steps: [...prev.steps, { 
        id: nextId, 
        name: newStep.trim(),
        required: true
      }]
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newStep.trim()) {
      e.preventDefault();
      addStep();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-white border-2 border-gray-100 shadow-2xl">
        {/* Header with gradient background */}
        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 rounded-t-lg"></div>
        
        <DialogHeader className="relative z-10 pt-8 pb-4">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Workflow className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-white">
            Create New Workflow
          </DialogTitle>
          <DialogDescription className="text-center text-blue-100 text-lg">
            Define the steps and details for your new workflow process.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-gray-700 font-medium">Workflow Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter workflow name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="description" className="text-gray-700 font-medium">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe this workflow"
              value={formData.description || ""}
              onChange={handleChange}
              rows={3}
              className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200 resize-none"
            />
          </div>
          
          <div className="grid gap-3">
            <Label htmlFor="trade" className="text-gray-700 font-medium">Trade Category</Label>
            <Select value={formData.trade} onValueChange={handleTradeChange}>
              <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200">
                <SelectValue placeholder="Select trade" />
              </SelectTrigger>
              <SelectContent className="bg-white border-2 border-gray-100 shadow-xl">
                {TRADE_CATEGORIES.map(trade => (
                  <SelectItem key={trade} value={trade} className="hover:bg-blue-50 focus:bg-blue-50">
                    {trade}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-3">
            <Label className="text-gray-700 font-medium">Workflow Steps</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a step"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
                onKeyPress={handleKeyPress}
                className="border-2 border-gray-200 focus:border-blue-500 focus:ring-blue-500/20 transition-all duration-200"
              />
              <Button 
                type="button" 
                onClick={addStep} 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add
              </Button>
            </div>
            
            {formData.steps.length > 0 ? (
              <div className="mt-4 space-y-3 max-h-40 overflow-y-auto">
                {formData.steps.map((step) => (
                  <div key={step.id} className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-xl border border-blue-200 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-xs text-white font-bold mr-3 shadow-lg">
                        {step.id}
                      </div>
                      <span className="font-medium text-gray-700">{step.name}</span>
                    </div>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="sm"
                      onClick={() => removeStep(step.id)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-2 transition-all duration-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                <Workflow className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No steps added yet</p>
                <p className="text-gray-400 text-sm">Add steps to define your workflow process</p>
              </div>
            )}
          </div>
          
          <DialogFooter className="pt-6 border-t border-gray-100">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-200"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={!formData.name || formData.steps.length === 0}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed px-8"
            >
              Create Workflow
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkflowDialog;
