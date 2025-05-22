import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, Trash2, PlusCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useResourceVendors } from "@/hooks/useResourceVendors";
interface VendorsSectionProps {
  onCountChange: (count: number) => void;
}
const VendorsSection: React.FC<VendorsSectionProps> = ({
  onCountChange
}) => {
  const {
    vendors,
    isLoading,
    addVendor,
    deleteVendor
  } = useResourceVendors();
  const [newVendor, setNewVendor] = useState({
    name: "",
    contact: "",
    phone: "",
    email: ""
  });

  // Update parent component with count
  React.useEffect(() => {
    onCountChange(vendors.length);
  }, [vendors.length, onCountChange]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof newVendor) => {
    setNewVendor({
      ...newVendor,
      [field]: e.target.value
    });
  };
  const handleAddVendor = async () => {
    // Basic validation
    if (!newVendor.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Vendor name is required",
        variant: "destructive"
      });
      return;
    }
    try {
      await addVendor.mutateAsync(newVendor);
      setNewVendor({
        name: "",
        contact: "",
        phone: "",
        email: ""
      });
      toast({
        title: "Vendor Added",
        description: `${newVendor.name} has been added to your vendors list`
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };
  const handleDeleteVendor = async (id: string) => {
    try {
      await deleteVendor.mutateAsync(id);
      toast({
        title: "Vendor Removed",
        description: "Vendor has been removed from your list"
      });
    } catch (error) {
      // Error is handled in the mutation
    }
  };
  if (isLoading) {
    return <div className="flex justify-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>;
  }
  return <div className="space-y-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="vendorName">Vendor Name</Label>
            <Input id="vendorName" value={newVendor.name} onChange={e => handleInputChange(e, "name")} placeholder="Enter vendor name" />
          </div>
          <div>
            <Label htmlFor="contactPerson">Contact Person</Label>
            <Input id="contactPerson" value={newVendor.contact} onChange={e => handleInputChange(e, "contact")} placeholder="Enter contact person name" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input id="phoneNumber" value={newVendor.phone} onChange={e => handleInputChange(e, "phone")} placeholder="Enter phone number" type="tel" />
          </div>
          <div>
            <Label htmlFor="emailAddress">Email Address</Label>
            <Input id="emailAddress" value={newVendor.email} onChange={e => handleInputChange(e, "email")} placeholder="Enter email address" type="email" />
          </div>
        </div>
        <Button onClick={handleAddVendor} disabled={addVendor.isPending} className="w-full md:w-auto flex items-center gap-2 bg-blue-600 hover:bg-blue-500">
          {addVendor.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <PlusCircle className="h-4 w-4" />}
          Add Vendor
        </Button>
      </div>

      <div className="space-y-4">
        {vendors.length === 0 ? <p className="text-muted-foreground text-center py-6">
            No vendors added yet. Add your first vendor above.
          </p> : vendors.map(vendor => <Card key={vendor.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium">{vendor.name}</h4>
                    {vendor.contact && <p className="text-sm text-muted-foreground">Contact: {vendor.contact}</p>}
                    <div className="flex flex-wrap gap-3 mt-2">
                      {vendor.phone && <div className="flex items-center text-sm">
                          <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{vendor.phone}</span>
                        </div>}
                      {vendor.email && <div className="flex items-center text-sm">
                          <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                          <span>{vendor.email}</span>
                        </div>}
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => handleDeleteVendor(vendor.id)} className="text-muted-foreground hover:text-destructive" disabled={deleteVendor.isPending}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>)}
      </div>
    </div>;
};
export default VendorsSection;