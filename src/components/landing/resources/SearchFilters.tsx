
import React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedIndustry: "all" | "woodworking" | "autobody" | "general";
  setSelectedIndustry: (value: "all" | "woodworking" | "autobody" | "general") => void;
  selectedContentType: "all" | "article" | "video" | "podcast";
  setSelectedContentType: (value: "all" | "article" | "video" | "podcast") => void;
  selectedDifficulty: "all" | "Beginner" | "Intermediate" | "Advanced";
  setSelectedDifficulty: (value: "all" | "Beginner" | "Intermediate" | "Advanced") => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchTerm,
  setSearchTerm,
  selectedIndustry,
  setSelectedIndustry,
  selectedContentType,
  setSelectedContentType,
  selectedDifficulty,
  setSelectedDifficulty
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-2 border-gray-200 focus:border-blue-500"
          />
        </div>
        <Select value={selectedIndustry} onValueChange={(value: any) => setSelectedIndustry(value)}>
          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
            <SelectValue placeholder="All Industries" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-xl">
            <SelectItem value="all">All Industries</SelectItem>
            <SelectItem value="woodworking">Woodworking & Millwork</SelectItem>
            <SelectItem value="autobody">Auto Body Finishing</SelectItem>
            <SelectItem value="general">General Finishing</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedContentType} onValueChange={(value: any) => setSelectedContentType(value)}>
          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
            <SelectValue placeholder="All Content" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-xl">
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="article">Articles</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="podcast">Podcasts</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedDifficulty} onValueChange={(value: any) => setSelectedDifficulty(value)}>
          <SelectTrigger className="border-2 border-gray-200 focus:border-blue-500">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent className="bg-white border border-gray-200 shadow-xl">
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilters;
