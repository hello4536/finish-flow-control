import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Box, PackageOpen, Search, PlusCircle, Edit, Trash2 } from "lucide-react";

// Mock data for materials
const mockMaterials = [{
  id: 1,
  name: "Raw Aluminum Sheet",
  type: "Metal",
  quantity: 120,
  unit: "sheets",
  status: "In Stock"
}, {
  id: 2,
  name: "Stainless Steel Plate",
  type: "Metal",
  quantity: 85,
  unit: "plates",
  status: "Low Stock"
}, {
  id: 3,
  name: "Oak Wood Panel",
  type: "Wood",
  quantity: 45,
  unit: "panels",
  status: "In Stock"
}, {
  id: 4,
  name: "Epoxy Resin",
  type: "Chemical",
  quantity: 12,
  unit: "gallons",
  status: "Critical Low"
}, {
  id: 5,
  name: "Maple Veneer",
  type: "Wood",
  quantity: 200,
  unit: "sq ft",
  status: "In Stock"
}, {
  id: 6,
  name: "Chrome Plating Solution",
  type: "Chemical",
  quantity: 7,
  unit: "gallons",
  status: "Low Stock"
}, {
  id: 7,
  name: "Cast Iron Block",
  type: "Metal",
  quantity: 30,
  unit: "blocks",
  status: "In Stock"
}, {
  id: 8,
  name: "Fiberglass Sheet",
  type: "Composite",
  quantity: 60,
  unit: "sheets",
  status: "In Stock"
}, {
  id: 9,
  name: "Ceramic Powder",
  type: "Ceramic",
  quantity: 5,
  unit: "kg",
  status: "Critical Low"
}, {
  id: 10,
  name: "Birch Plywood",
  type: "Wood",
  quantity: 40,
  unit: "sheets",
  status: "In Stock"
}];

// Mock data for suppliers
const mockSuppliers = [{
  id: 1,
  name: "MetalWorks Inc.",
  contact: "John Smith",
  phone: "555-1234",
  materials: ["Raw Aluminum Sheet", "Stainless Steel Plate"]
}, {
  id: 2,
  name: "Forest Products Co.",
  contact: "Sarah Johnson",
  phone: "555-5678",
  materials: ["Oak Wood Panel", "Maple Veneer", "Birch Plywood"]
}, {
  id: 3,
  name: "ChemSolutions Ltd.",
  contact: "Michael Brown",
  phone: "555-9012",
  materials: ["Epoxy Resin", "Chrome Plating Solution"]
}, {
  id: 4,
  name: "Advanced Materials Group",
  contact: "Lisa Chen",
  phone: "555-3456",
  materials: ["Fiberglass Sheet", "Ceramic Powder"]
}, {
  id: 5,
  name: "Forge Metals",
  contact: "David Wilson",
  phone: "555-7890",
  materials: ["Cast Iron Block"]
}];
const MaterialsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter materials based on search term and active tab
  const filteredMaterials = mockMaterials.filter(material => {
    const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || material.type.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "low") return matchesSearch && (material.status === "Low Stock" || material.status === "Critical Low");
    if (activeTab === "type") return matchesSearch && material.type.toLowerCase() === activeTab.toLowerCase();
    return matchesSearch;
  });
  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Stock":
        return "bg-finish-green-100 text-finish-green-800";
      case "Low Stock":
        return "bg-finish-amber-100 text-finish-amber-800";
      case "Critical Low":
        return "bg-finish-red-100 text-finish-red-800";
      default:
        return "bg-finish-gray-100 text-finish-gray-800";
    }
  };
  return <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Materials Management</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add New Material
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="card-hover rounded">
          <CardHeader className="bg-blue-50 pb-2">
            <CardTitle className="flex items-center">
              <Box className="mr-2 h-5 w-5 text-blue-600" />
              Total Materials
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{mockMaterials.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Across {new Set(mockMaterials.map(m => m.type)).size} categories</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="bg-amber-50 pb-2">
            <CardTitle className="flex items-center">
              <PackageOpen className="mr-2 h-5 w-5 text-amber-600" />
              Low Stock Items
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{mockMaterials.filter(m => m.status === "Low Stock" || m.status === "Critical Low").length}</p>
            <p className="text-sm text-muted-foreground mt-1">Requiring reorder soon</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="bg-green-50 pb-2">
            <CardTitle className="flex items-center">
              <Box className="mr-2 h-5 w-5 text-green-600" />
              Suppliers
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{mockSuppliers.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Active material providers</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Materials Inventory</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search materials..." className="pl-9" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Materials</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
            <TabsTrigger value="metal">Metals</TabsTrigger>
            <TabsTrigger value="wood">Wood</TabsTrigger>
            <TabsTrigger value="chemical">Chemicals</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map(material => <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                        {material.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="low" className="mt-4">
            {/* Same table structure but filtered to low stock items */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.filter(m => m.status === "Low Stock" || m.status === "Critical Low").map(material => <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                        {material.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="metal" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.filter(m => m.type === "Metal").map(material => <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                        {material.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="wood" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.filter(m => m.type === "Wood").map(material => <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                        {material.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="chemical" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.filter(m => m.type === "Chemical").map(material => <TableRow key={material.id}>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>{material.type}</TableCell>
                    <TableCell>{`${material.quantity} ${material.unit}`}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(material.status)}`}>
                        {material.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="ghost">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>)}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Material Suppliers</CardTitle>
          <CardDescription>Current active suppliers providing materials to your facility</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Supplier</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Materials Supplied</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockSuppliers.map(supplier => <TableRow key={supplier.id}>
                  <TableCell className="font-medium">{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>{supplier.phone}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {supplier.materials.slice(0, 2).map((material, i) => <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                          {material}
                        </span>)}
                      {supplier.materials.length > 2 && <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          +{supplier.materials.length - 2} more
                        </span>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="icon" variant="ghost">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>;
};
export default MaterialsPage;