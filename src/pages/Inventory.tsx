
import React, { useState } from "react";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger, 
  TabsContent 
} from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, Search, PlusCircle, Package, PackageOpen, Warehouse, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data for inventory items
const mockInventoryItems = [
  { id: 1, name: "Finished Cabinet A", sku: "CAB-001", category: "Furniture", inStock: 24, allocated: 8, available: 16, location: "Warehouse A" },
  { id: 2, name: "Office Desk B", sku: "DESK-002", category: "Furniture", inStock: 15, allocated: 5, available: 10, location: "Warehouse B" },
  { id: 3, name: "Kitchen Counter C", sku: "COUNT-003", category: "Kitchen", inStock: 8, allocated: 2, available: 6, location: "Warehouse A" },
  { id: 4, name: "Bookshelf D", sku: "SHELF-004", category: "Furniture", inStock: 12, allocated: 0, available: 12, location: "Warehouse C" },
  { id: 5, name: "TV Stand E", sku: "STAND-005", category: "Entertainment", inStock: 6, allocated: 3, available: 3, location: "Warehouse B" },
  { id: 6, name: "Coffee Table F", sku: "TABLE-006", category: "Furniture", inStock: 20, allocated: 5, available: 15, location: "Warehouse A" },
  { id: 7, name: "Dining Set G", sku: "DINING-007", category: "Kitchen", inStock: 4, allocated: 1, available: 3, location: "Warehouse C" },
  { id: 8, name: "Sofa H", sku: "SOFA-008", category: "Furniture", inStock: 7, allocated: 2, available: 5, location: "Warehouse B" },
  { id: 9, name: "Chair I", sku: "CHAIR-009", category: "Furniture", inStock: 30, allocated: 10, available: 20, location: "Warehouse A" },
  { id: 10, name: "Bed Frame J", sku: "BED-010", category: "Bedroom", inStock: 5, allocated: 0, available: 5, location: "Warehouse C" },
];

// Mock data for warehouses
const mockWarehouses = [
  { id: 1, name: "Warehouse A", location: "123 Main St, City A", capacity: 1000, utilized: 650 },
  { id: 2, name: "Warehouse B", location: "456 Oak Ave, City B", capacity: 800, utilized: 520 },
  { id: 3, name: "Warehouse C", location: "789 Pine Rd, City C", capacity: 1200, utilized: 900 },
];

const InventoryPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const { toast } = useToast();

  // Filter inventory items based on search term and active tab
  const filteredItems = mockInventoryItems.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "all") return matchesSearch;
    if (activeTab === "furniture") return matchesSearch && item.category === "Furniture";
    if (activeTab === "kitchen") return matchesSearch && item.category === "Kitchen";
    if (activeTab === "low") return matchesSearch && item.available < 10;
    
    return matchesSearch;
  });

  const handleSelectItem = (id: number) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedItems.length === filteredItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(filteredItems.map(item => item.id));
    }
  };

  const handleDeleteSelected = () => {
    if (selectedItems.length === 0) return;
    
    toast({
      title: "Items deleted",
      description: `${selectedItems.length} items have been removed from inventory.`,
    });
    
    setSelectedItems([]);
  };

  return (
    <div className="container mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Add New Item
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card className="card-hover">
          <CardHeader className="bg-blue-50 pb-2">
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5 text-blue-600" />
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{mockInventoryItems.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Across {new Set(mockInventoryItems.map(m => m.category)).size} categories</p>
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
            <p className="text-3xl font-bold">{mockInventoryItems.filter(m => m.available < 10).length}</p>
            <p className="text-sm text-muted-foreground mt-1">Items requiring restock soon</p>
          </CardContent>
        </Card>
        
        <Card className="card-hover">
          <CardHeader className="bg-green-50 pb-2">
            <CardTitle className="flex items-center">
              <Warehouse className="mr-2 h-5 w-5 text-green-600" />
              Warehouses
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="text-3xl font-bold">{mockWarehouses.length}</p>
            <p className="text-sm text-muted-foreground mt-1">Storage locations</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-xl font-semibold">Inventory Items</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search inventory..." 
                className="pl-9" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline">Filters</Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Items</TabsTrigger>
            <TabsTrigger value="furniture">Furniture</TabsTrigger>
            <TabsTrigger value="kitchen">Kitchen</TabsTrigger>
            <TabsTrigger value="low">Low Stock</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-4">
            <div className="flex justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="select-all" 
                  checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                  onCheckedChange={handleSelectAll}
                />
                <label htmlFor="select-all" className="text-sm font-medium">
                  Select All
                </label>
              </div>
              {selectedItems.length > 0 && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleDeleteSelected}
                >
                  Delete Selected
                </Button>
              )}
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">In Stock</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/20" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.inStock}</TableCell>
                    <TableCell className="text-right">{item.allocated}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.available < 5 ? "bg-finish-red-100 text-finish-red-800" :
                        item.available < 10 ? "bg-finish-amber-100 text-finish-amber-800" :
                        "bg-finish-green-100 text-finish-green-800"
                      }`}>
                        {item.available}
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="furniture" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">In Stock</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.filter(item => item.category === "Furniture").map((item) => (
                  <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/20" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.inStock}</TableCell>
                    <TableCell className="text-right">{item.allocated}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.available < 5 ? "bg-finish-red-100 text-finish-red-800" :
                        item.available < 10 ? "bg-finish-amber-100 text-finish-amber-800" :
                        "bg-finish-green-100 text-finish-green-800"
                      }`}>
                        {item.available}
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="kitchen" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">In Stock</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.filter(item => item.category === "Kitchen").map((item) => (
                  <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/20" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.inStock}</TableCell>
                    <TableCell className="text-right">{item.allocated}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.available < 5 ? "bg-finish-red-100 text-finish-red-800" :
                        item.available < 10 ? "bg-finish-amber-100 text-finish-amber-800" :
                        "bg-finish-green-100 text-finish-green-800"
                      }`}>
                        {item.available}
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          
          <TabsContent value="low" className="mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Product Name</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">In Stock</TableHead>
                  <TableHead className="text-right">Allocated</TableHead>
                  <TableHead className="text-right">Available</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredItems.filter(item => item.available < 10).map((item) => (
                  <TableRow key={item.id} className={selectedItems.includes(item.id) ? "bg-muted/20" : ""}>
                    <TableCell>
                      <Checkbox 
                        checked={selectedItems.includes(item.id)}
                        onCheckedChange={() => handleSelectItem(item.id)}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell className="text-right">{item.inStock}</TableCell>
                    <TableCell className="text-right">{item.allocated}</TableCell>
                    <TableCell className="text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.available < 5 ? "bg-finish-red-100 text-finish-red-800" :
                        item.available < 10 ? "bg-finish-amber-100 text-finish-amber-800" :
                        "bg-finish-green-100 text-finish-green-800"
                      }`}>
                        {item.available}
                      </span>
                    </TableCell>
                    <TableCell>{item.location}</TableCell>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Warehouse Locations</CardTitle>
          <CardDescription>Current storage facilities and capacity utilization</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="text-right">Capacity</TableHead>
                <TableHead className="text-right">Utilized</TableHead>
                <TableHead className="text-right">Utilization</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWarehouses.map((warehouse) => {
                const utilization = Math.round((warehouse.utilized / warehouse.capacity) * 100);
                return (
                  <TableRow key={warehouse.id}>
                    <TableCell className="font-medium">{warehouse.name}</TableCell>
                    <TableCell>{warehouse.location}</TableCell>
                    <TableCell className="text-right">{warehouse.capacity.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{warehouse.utilized.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${
                              utilization > 90 ? "bg-red-500" : 
                              utilization > 75 ? "bg-amber-500" : 
                              "bg-green-500"
                            }`}
                            style={{ width: `${utilization}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium">{utilization}%</span>
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
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryPage;
