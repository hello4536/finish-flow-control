import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
interface SearchAndFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}
const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  onSearchChange
}) => {
  return <div className="flex gap-4 w-full md:w-auto">
      <div className="relative w-full md:w-64">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search materials..." className="pl-9" value={searchTerm} onChange={e => onSearchChange(e.target.value)} />
      </div>
      <Button variant="outline" className="bg-blue-600 hover:bg-blue-500 text-white">Filters</Button>
    </div>;
};
export default SearchAndFilter;