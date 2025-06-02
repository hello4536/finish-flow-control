
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { Plus } from 'lucide-react';

const AddJobDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    name: '',
    job_number: '',
    trade: '',
    assigned_to: '',
    status: 'pending',
    due_date: '',
    current_step: '',
    estimated_total: 0,
    hourly_rate: 50,
    estimated_hours: 0
  });

  const generateJobNumber = () => {
    const timestamp = Date.now().toString().slice(-6);
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
    return `JOB-${timestamp}${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const jobNumber = formData.job_number || generateJobNumber();
      
      const { error } = await supabase
        .from('jobs')
        .insert({
          ...formData,
          job_number: jobNumber
        });

      if (error) throw error;

      toast({
        title: 'Job created successfully',
        description: `Job ${jobNumber} has been created.`
      });

      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      setOpen(false);
      
      // Reset form
      setFormData({
        name: '',
        job_number: '',
        trade: '',
        assigned_to: '',
        status: 'pending',
        due_date: '',
        current_step: '',
        estimated_total: 0,
        hourly_rate: 50,
        estimated_hours: 0
      });
    } catch (error: any) {
      toast({
        title: 'Error creating job',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
          <Plus className="h-4 w-4 mr-2" />
          Add New Job
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Job Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="job_number">Job Number</Label>
              <Input
                id="job_number"
                value={formData.job_number}
                onChange={(e) => setFormData({ ...formData, job_number: e.target.value })}
                placeholder="Auto-generated if empty"
              />
            </div>
            
            <div>
              <Label htmlFor="trade">Trade</Label>
              <Select value={formData.trade} onValueChange={(value) => setFormData({ ...formData, trade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select trade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Auto Body">Auto Body</SelectItem>
                  <SelectItem value="Millwork">Millwork</SelectItem>
                  <SelectItem value="Cabinet Making">Cabinet Making</SelectItem>
                  <SelectItem value="Furniture Finishing">Furniture Finishing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="on hold">On Hold</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="assigned_to">Assigned To</Label>
              <Input
                id="assigned_to"
                value={formData.assigned_to}
                onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="due_date">Due Date</Label>
              <Input
                id="due_date"
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
            </div>
            
            <div>
              <Label htmlFor="estimated_total">Estimated Total ($)</Label>
              <Input
                id="estimated_total"
                type="number"
                step="0.01"
                value={formData.estimated_total}
                onChange={(e) => setFormData({ ...formData, estimated_total: parseFloat(e.target.value) || 0 })}
              />
            </div>
            
            <div>
              <Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
              <Input
                id="hourly_rate"
                type="number"
                step="0.01"
                value={formData.hourly_rate}
                onChange={(e) => setFormData({ ...formData, hourly_rate: parseFloat(e.target.value) || 0 })}
              />
            </div>
            
            <div>
              <Label htmlFor="estimated_hours">Estimated Hours</Label>
              <Input
                id="estimated_hours"
                type="number"
                step="0.25"
                value={formData.estimated_hours}
                onChange={(e) => setFormData({ ...formData, estimated_hours: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="current_step">Current Step</Label>
            <Textarea
              id="current_step"
              value={formData.current_step}
              onChange={(e) => setFormData({ ...formData, current_step: e.target.value })}
              placeholder="Describe the current step or phase"
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Job'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddJobDialog;
