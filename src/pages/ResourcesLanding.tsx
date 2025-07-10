import React, { useState } from "react";
import { BookOpen, Star, TrendingUp, Award } from "lucide-react";
import { ContentItem } from "@/components/landing/resources/types";
import { getAllContent, filterContent } from "@/components/landing/resources/utils";
import { podcastEpisodes } from "@/components/landing/resources/data/podcastData";
import ContentCard from "@/components/landing/resources/ContentCard";
import SearchFilters from "@/components/landing/resources/SearchFilters";
import StatsSection from "@/components/landing/resources/StatsSection";
import NewsletterSignup from "@/components/landing/resources/NewsletterSignup";
import PodcastSection from "@/components/landing/resources/PodcastSection";
import LeadMagnetCTA from "@/components/landing/resources/LeadMagnetCTA";
import PremiumContentGate from "@/components/landing/resources/PremiumContentGate";
import AuthorBio from "@/components/landing/resources/AuthorBio";
import RelatedContent from "@/components/landing/resources/RelatedContent";
import SEOContentSection from "@/components/landing/resources/SEOContentSection";
import StrategicCTABanner from "@/components/landing/resources/StrategicCTABanner";
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

        {/* Lead Magnets Section */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200/50 text-green-700 text-sm font-medium mb-6">
                <Star className="w-4 h-4 mr-2" />
                Free Professional Resources
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gray-900">Download Free</span>
                <br />
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                  Professional Guides
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <LeadMagnetCTA
                title="Complete Wood Finishing Checklist"
                description="Professional 50-point checklist ensuring perfect results every time. Used by 10,000+ finishers worldwide."
                downloadCount={12847}
                rating={4.9}
                estimatedTime="2 min read"
                type="checklist"
              />
              <LeadMagnetCTA
                title="Auto Body Color Matching Guide"
                description="Step-by-step guide to achieving perfect color matches with any spray gun system."
                downloadCount={8923}
                rating={4.8}
                estimatedTime="15 min read"
                type="guide"
              />
              <LeadMagnetCTA
                title="Spray Pattern Calculator"
                description="Interactive tool to optimize your spray patterns for any project size and finish type."
                downloadCount={6542}
                rating={4.7}
                estimatedTime="5 min use"
                type="calculator"
              />
            </div>
          </div>
        </section>

        {/* Premium Content Preview */}
        <section className="py-16 bg-gradient-to-br from-amber-50 to-yellow-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-amber-100 to-yellow-100 border border-amber-200/50 text-amber-700 text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Premium Masterclasses
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-gray-900">Learn from</span>
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Industry Masters
                </span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <PremiumContentGate
                title="Advanced Spray Booth Mastery"
                description="Complete masterclass on spray booth setup, maintenance, and optimization for professional results."
                previewContent="Learn the fundamentals of spray booth airflow dynamics and how temperature affects finish quality. This preview covers basic safety protocols..."
                benefits={[
                  "5 hours of video content from master finishers",
                  "Downloadable setup templates and checklists",
                  "Private community access for questions",
                  "Monthly live Q&A sessions",
                  "Certificate of completion"
                ]}
                memberCount={2847}
                estimatedTime="5 hours"
                contentType="masterclass"
                price={97}
                originalPrice={197}
              />
              <PremiumContentGate
                title="Complete Finishing Business Toolkit"
                description="Everything you need to start and scale a profitable finishing business."
                previewContent="Starting a finishing business requires proper planning, equipment selection, and pricing strategies. This toolkit includes..."
                benefits={[
                  "Business plan templates",
                  "Pricing calculator spreadsheets",
                  "Client contract templates",
                  "Marketing materials pack",
                  "1-hour strategy call with expert"
                ]}
                memberCount={1234}
                estimatedTime="3 hours setup"
                contentType="toolkit"
                price={149}
                originalPrice={299}
              />
            </div>
          </div>
        </section>

        {/* Browse Resources Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 text-blue-700 text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4 mr-2" />
                Knowledge Library
              </div>
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

            {/* Content Grid with Enhanced CTAs */}
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredContent.slice(0, 12).map(item => (
                  <ContentCard key={item.id} item={item} />
                ))}
              </div>

              {/* Featured Author Bio */}
              {filteredContent.length > 6 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <AuthorBio
                      name="Master Finisher John Mitchell"
                      title="Senior Finishing Expert"
                      company="Premium Woodworks Inc."
                      bio="With over 30 years in high-end furniture finishing, John has worked on projects for luxury hotels, custom homes, and exclusive furniture collections. His expertise in traditional and modern techniques makes him one of the most sought-after finishers in the industry."
                      experience="30+ years"
                      location="San Francisco, CA"
                      specialties={["French Polishing", "Custom Staining", "Restoration", "Spray Booth Setup"]}
                      achievements={[
                        "Certified by the International Finishing Association",
                        "Featured in Woodworking Magazine 15+ times",
                        "Trainer for 500+ professional finishers",
                        "Developer of the Mitchell Finishing Method"
                      ]}
                      followersCount={12500}
                      articlesCount={47}
                      linkedinUrl="https://linkedin.com/in/johnmitchell"
                      websiteUrl="https://premiumwoodworks.com"
                    />
                  </div>
                  <div>
                    <RelatedContent
                      currentItem={filteredContent[0]}
                      relatedItems={allContent}
                      title="More from Expert Authors"
                    />
                  </div>
                </div>
              )}
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

        {/* Strategic CTA Banner */}
        <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="container px-4 md:px-6 mx-auto">
            <StrategicCTABanner
              title="Join 25,000+ Finishing Professionals"
              subtitle="Expert Training"
              description="Get exclusive tips, techniques, and industry insights delivered to your inbox weekly. Plus instant access to our complete finishing guide library."
              primaryCTA="Join Free Today"
              secondaryCTA="View Courses"
              urgency="Limited Time: Free Bonus Pack"
              socialProof={{
                userCount: 25000,
                rating: 4.9,
                testimonial: "Best finishing resource I've found"
              }}
              type="newsletter"
            />
          </div>
        </section>

        {/* SEO Content Topics Section */}
        <SEOContentSection />

        {/* Podcast Section */}
        <section className="py-20 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <PodcastSection episodes={podcastEpisodes} />
          </div>
        </section>

        {/* Course Promotion CTA */}
        <section className="py-16 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <StrategicCTABanner
              title="Master Professional Finishing Techniques"
              subtitle="Premium Course"
              description="Complete 8-week course covering advanced spray techniques, color matching, and business strategies. Taught by industry experts with 30+ years experience."
              primaryCTA="Enroll Now - $297"
              secondaryCTA="Learn More"
              urgency="Early Bird: Save $100"
              socialProof={{
                userCount: 1200,
                rating: 4.8,
                testimonial: "Transformed my finishing business"
              }}
              type="course"
            />
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
