import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { useResourceReimbursements } from '@/hooks/useResourceReimbursements';
const ReimbursementForm = () => {
  const {
    addReimbursement
  } = useResourceReimbursements();
  const [formData, setFormData] = useState({
    employee_name: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    status: 'pending' as const
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.employee_name || !formData.amount || !formData.date) {
      toast({
        title: 'Missing information',
        description: 'Please fill out all required fields.',
        variant: 'destructive'
      });
      return;
    }
    try {
      await addReimbursement.mutateAsync({
        employee_name: formData.employee_name,
        amount: parseFloat(formData.amount),
        date: formData.date,
        description: formData.description,
        status: formData.status
      });
      toast({
        title: 'Reimbursement added',
        description: 'The reimbursement has been added successfully.'
      });

      // Reset form
      setFormData({
        employee_name: '',
        amount: '',
        date: format(new Date(), 'yyyy-MM-dd'),
        description: '',
        status: 'pending'
      });
    } catch (error) {
      // Error handled in mutation
    }
  };
  return <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-white">
      <h3 className="text-lg font-medium text-blue-600">Add New Reimbursement</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="employee_name">Employee Name</Label>
          <Input id="employee_name" name="employee_name" value={formData.employee_name} onChange={handleInputChange} placeholder="Enter employee name" required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="amount">Amount ($)</Label>
          <Input id="amount" name="amount" type="number" step="0.01" value={formData.amount} onChange={handleInputChange} placeholder="0.00" required />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={value => handleSelectChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} placeholder="Enter expense description" rows={3} />
      </div>
      
      <Button type="submit" disabled={addReimbursement.isPending} className="w-full bg-blue-600 hover:bg-blue-500">
        {addReimbursement.isPending ? 'Adding...' : 'Add Reimbursement'}
      </Button>
    </form>;
};
export default ReimbursementForm;