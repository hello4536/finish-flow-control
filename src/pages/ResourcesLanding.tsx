import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { ContentItem } from "@/components/landing/resources/types";
import { getAllContent, filterContent } from "@/components/landing/resources/utils";
import { podcastEpisodes } from "@/components/landing/resources/data/podcastData";
import ContentCard from "@/components/landing/resources/ContentCard";
import SearchFilters from "@/components/landing/resources/SearchFilters";
import StatsSection from "@/components/landing/resources/StatsSection";
import NewsletterSignup from "@/components/landing/resources/NewsletterSignup";
import PodcastSection from "@/components/landing/resources/PodcastSection";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";

const ResourcesLanding = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<"all" | "woodworking" | "autobody" | "general">("all");
  const [selectedContentType, setSelectedContentType] = useState<"all" | "article" | "video" | "podcast">("all");
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
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-100/40 to-purple-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-amber-100/40 to-orange-100/40 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 mr-2" />
                Knowledge Hub
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gray-900">Learn from industry</span>
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
                  experts and professionals
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Explore our comprehensive collection of articles, videos, podcasts, and tutorials covering woodworking, millwork, and auto body finishing techniques.
              </p>
            </div>

            {/* Stats Overview */}
            <div className="mb-16">
              <StatsSection allContent={allContent} />
            </div>
          </div>
        </section>

        {/* Browse Resources Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gray-900">Browse All</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Learning Resources
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Filter and search through our extensive library of educational content tailored for finishing professionals.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="mb-12">
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
            </div>

            {/* Results Summary */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing <span className="font-semibold">{Math.min(filteredContent.length, 12)}</span> of{" "}
                  <span className="font-semibold">{filteredContent.length}</span> resources
                </p>
                {filteredContent.length > 12 && (
                  <p className="text-sm text-blue-600">
                    Load more results available
                  </p>
                )}
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredContent.slice(0, 12).map(item => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>

            {/* Load More Button */}
            {filteredContent.length > 12 && (
              <div className="text-center mt-12">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                  Load More Resources
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Podcast Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <PodcastSection episodes={podcastEpisodes} />
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6 mx-auto">
            <NewsletterSignup />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ResourcesLanding;
