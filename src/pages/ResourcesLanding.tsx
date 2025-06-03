
import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { ContentItem } from "@/components/landing/resources/types";
import { getAllContent, filterContent } from "@/components/landing/resources/utils";
import ContentCard from "@/components/landing/resources/ContentCard";
import SearchFilters from "@/components/landing/resources/SearchFilters";
import StatsSection from "@/components/landing/resources/StatsSection";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const ResourcesLanding = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<"all" | "woodworking" | "autobody">("all");
  const [selectedContentType, setSelectedContentType] = useState<"all" | "article" | "video">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "Beginner" | "Intermediate" | "Advanced">("all");

  const allContent: ContentItem[] = getAllContent();

  const filteredContent = filterContent(
    allContent,
    searchTerm,
    selectedIndustry,
    selectedContentType,
    selectedDifficulty
  );

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Hub
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-gray-900">Learn from industry</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                  experts and professionals
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive collection of articles, videos, and tutorials covering woodworking, millwork, and auto body finishing techniques.
              </p>
            </div>

            {/* Search and Filters */}
            <SearchFilters
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedIndustry={selectedIndustry}
              setSelectedIndustry={setSelectedIndustry}
              selectedContentType={selectedContentType}
              setSelectedContentType={setSelectedContentType}
              selectedDifficulty={selectedDifficulty}
              setSelectedDifficulty={setSelectedDifficulty}
            />

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {filteredContent.slice(0, 12).map(item => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>

            {/* Stats and CTA */}
            <StatsSection allContent={allContent} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcesLanding;
