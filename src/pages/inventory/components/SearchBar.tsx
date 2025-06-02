import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useCustomCategories } from "@/hooks/useCustomCategories";
import { inventoryCategories } from "../components/AddInventoryForm/schema";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filters?: {
    category?: string;
    productType?: string;
    brand?: string;
    hazardClass?: string;
    minVoc?: number;
    maxVoc?: number;
    isConsumable?: boolean | null;
  };
  setFilters?: (filters: any) => void;
}

const productTypes = ["All", "Paint", "Primer", "Abrasive", "Clear Coat", "Filler", "Tape", "Sandpaper", "Respirator", "Tool"];
const hazardClasses = ["All", "None", "Flammable", "Toxic", "Corrosive", "Oxidizing", "Compressed Gas", "Harmful", "Irritant"];
const brands = ["All", "3M", "PPG", "Sherwin-Williams", "SATA", "DeVilbiss", "Norton", "Mirka"];

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  setSearchTerm,
  filters = {},
  setFilters = () => {}
}) => {
  const { customCategories } = useCustomCategories();
  const [activeFilters, setActiveFilters] = React.useState(0);

  // Combine default categories with custom ones for the filter dropdown
  const allCategories = ["All", ...inventoryCategories, ...customCategories];

  React.useEffect(() => {
    let count = 0;
    if (filters.category && filters.category !== "All") count++;
    if (filters.productType && filters.productType !== "All") count++;
    if (filters.brand && filters.brand !== "All") count++;
    if (filters.hazardClass && filters.hazardClass !== "All") count++;
    if (filters.minVoc !== undefined || filters.maxVoc !== undefined) count++;
    if (filters.isConsumable !== undefined && filters.isConsumable !== null) count++;
    setActiveFilters(count);
  }, [filters]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters({
      ...filters,
      [key]: value
    });
  };

  const clearFilters = () => {
    setFilters({
      category: "All",
      productType: "All",
      brand: "All",
      hazardClass: "All",
      minVoc: undefined,
      maxVoc: undefined,
      isConsumable: null
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="relative w-full">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search inventory..."
          className="pl-9"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="flex gap-2 bg-blue-600 hover:bg-blue-500 text-white">
            <Filter className="h-4 w-4" />
            Filters
            {activeFilters > 0 && (
              <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                {activeFilters}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Filter Inventory</h4>
              <p className="text-sm text-muted-foreground">
                Narrow down items by specific attributes
              </p>
            </div>
            
            <div className="grid gap-2">
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={filters.category || "All"}
                    onValueChange={(value) => handleFilterChange("category", value)}
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {allCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="productType">Product Type</Label>
                  <Select value={filters.productType || "All"} onValueChange={value => handleFilterChange("productType", value)}>
                    <SelectTrigger id="productType">
                      <SelectValue placeholder="Product Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {productTypes.map(type => <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label htmlFor="brand">Brand</Label>
                  <Select value={filters.brand || "All"} onValueChange={value => handleFilterChange("brand", value)}>
                    <SelectTrigger id="brand">
                      <SelectValue placeholder="Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-1">
                  <Label htmlFor="hazardClass">Hazard Class</Label>
                  <Select value={filters.hazardClass || "All"} onValueChange={value => handleFilterChange("hazardClass", value)}>
                    <SelectTrigger id="hazardClass">
                      <SelectValue placeholder="Hazard Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {hazardClasses.map(hazard => <SelectItem key={hazard} value={hazard}>
                          {hazard}
                        </SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex justify-between">
                  <Label htmlFor="vocContent">VOC Content (g/L)</Label>
                  <span className="text-xs text-muted-foreground">
                    {filters.minVoc || 0} - {filters.maxVoc || 1000}
                  </span>
                </div>
                <Slider id="vocContent" defaultValue={[filters.minVoc || 0, filters.maxVoc || 1000]} min={0} max={1000} step={10} onValueChange={value => {
                handleFilterChange("minVoc", value[0]);
                handleFilterChange("maxVoc", value[1]);
              }} />
              </div>
              
              <div className="space-y-1">
                <Label htmlFor="itemType">Item Type</Label>
                <Select value={filters.isConsumable === null ? "all" : filters.isConsumable ? "consumable" : "durable"} onValueChange={value => {
                handleFilterChange("isConsumable", value === "all" ? null : value === "consumable");
              }}>
                  <SelectTrigger id="itemType">
                    <SelectValue placeholder="Item Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Items</SelectItem>
                    <SelectItem value="consumable">Consumables</SelectItem>
                    <SelectItem value="durable">Durable Goods</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SearchBar;
