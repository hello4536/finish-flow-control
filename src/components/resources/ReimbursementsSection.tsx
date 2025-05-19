
import React, { useEffect, useState } from 'react';
import { useResourceReimbursements, Reimbursement } from '@/hooks/useResourceReimbursements';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Receipt, DollarSign } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface ReimbursementsSectionProps {
  onCountChange: (count: number) => void;
}

const ReimbursementsSection: React.FC<ReimbursementsSectionProps> = ({ onCountChange }) => {
  const { 
    reimbursements, 
    isLoading, 
    addReimbursement, 
    updateReimbursementStatus, 
    deleteReimbursement,
    getTotalByStatus
  } = useResourceReimbursements();

  const [formData, setFormData] = useState({
    employee_name: '',
    amount: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    description: '',
    status: 'pending' as const
  });
  
  // Update parent component with count
  useEffect(() => {
    onCountChange(reimbursements.length);
  }, [reimbursements.length, onCountChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.employee_name || !formData.amount || !formData.date) {
      toast({
        title: 'Missing information',
        description: 'Please fill out all required fields.',
        variant: 'destructive',
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
        description: 'The reimbursement has been added successfully.',
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

  const handleStatusChange = async (id: string, status: 'pending' | 'approved' | 'paid') => {
    try {
      await updateReimbursementStatus.mutateAsync({ id, status });
      
      toast({
        title: 'Status updated',
        description: `Reimbursement status changed to ${status}.`,
      });
    } catch (error) {
      // Error handled in mutation
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this reimbursement?')) {
      return;
    }
    
    try {
      await deleteReimbursement.mutateAsync(id);
      
      toast({
        title: 'Reimbursement deleted',
        description: 'The reimbursement has been removed successfully.',
      });
    } catch (error) {
      // Error handled in mutation
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-300">Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-300">Approved</Badge>;
      case 'paid':
        return <Badge variant="outline" className="bg-green-50 text-green-800 border-green-300">Paid</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending</p>
                <h3 className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(getTotalByStatus('pending'))}
                </h3>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <CalendarIcon className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <h3 className="text-2xl font-bold text-blue-600">
                  {formatCurrency(getTotalByStatus('approved'))}
                </h3>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <Receipt className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Paid</p>
                <h3 className="text-2xl font-bold text-green-600">
                  {formatCurrency(getTotalByStatus('paid'))}
                </h3>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <DollarSign className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Reimbursement Form */}
      <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded-md bg-white">
        <h3 className="text-lg font-medium">Add New Reimbursement</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employee_name">Employee Name</Label>
            <Input
              id="employee_name"
              name="employee_name"
              value={formData.employee_name}
              onChange={handleInputChange}
              placeholder="Enter employee name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleInputChange}
              placeholder="0.00"
              required
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) => handleSelectChange('status', value)}
            >
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
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Enter expense description"
            rows={3}
          />
        </div>
        
        <Button 
          type="submit" 
          className="w-full"
          disabled={addReimbursement.isPending}
        >
          {addReimbursement.isPending ? 'Adding...' : 'Add Reimbursement'}
        </Button>
      </form>
      
      {/* Reimbursements Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
                  Loading reimbursements...
                </TableCell>
              </TableRow>
            ) : reimbursements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center p-4">
                  No reimbursements found. Add one to get started.
                </TableCell>
              </TableRow>
            ) : (
              reimbursements.map((reimbursement) => (
                <TableRow key={reimbursement.id}>
                  <TableCell className="font-medium">{reimbursement.employee_name}</TableCell>
                  <TableCell>{reimbursement.date}</TableCell>
                  <TableCell>{formatCurrency(reimbursement.amount)}</TableCell>
                  <TableCell className="max-w-[200px] truncate">{reimbursement.description}</TableCell>
                  <TableCell>{getStatusBadge(reimbursement.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {reimbursement.status !== 'approved' && reimbursement.status !== 'paid' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleStatusChange(reimbursement.id, 'approved')}
                        >
                          Approve
                        </Button>
                      )}
                      {reimbursement.status !== 'paid' && reimbursement.status === 'approved' && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="bg-green-50 text-green-700 hover:bg-green-100"
                          onClick={() => handleStatusChange(reimbursement.id, 'paid')}
                        >
                          Mark Paid
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(reimbursement.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ReimbursementsSection;
