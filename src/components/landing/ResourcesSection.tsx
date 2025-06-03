
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, FileText, Video, BookOpen, Star, Clock, User, ArrowRight } from "lucide-react";
import { articles as woodworkingArticles } from "@/components/woodworking/data/articlesData";
import { videoReviews as woodworkingVideos } from "@/components/woodworking/data/videoReviewsData";
import { autoBodyArticles } from "@/components/autobody/data/articlesData";
import { autoBodyVideoReviews } from "@/components/autobody/data/videoReviewsData";
import { Link } from "react-router-dom";

interface ContentItem {
  id: number;
  title: string;
  description: string;
  type: "article" | "video";
  industry: "woodworking" | "autobody";
  category: string;
  difficulty?: string;
  readTime?: string;
  videoLength?: string;
  creator?: string;
}

const ResourcesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<"all" | "woodworking" | "autobody">("all");
  const [selectedContentType, setSelectedContentType] = useState<"all" | "article" | "video">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<"all" | "Beginner" | "Intermediate" | "Advanced">("all");

  // Combine all content into unified format
  const allContent: ContentItem[] = [
    ...woodworkingArticles.map(article => ({
      id: article.id,
      title: article.title,
      description: article.description,
      type: "article" as const,
      industry: "woodworking" as const,
      category: article.category,
      difficulty: article.difficulty,
      readTime: article.readTime
    })),
    ...woodworkingVideos.map(video => ({
      id: video.id + 1000,
      title: video.title,
      description: video.description,
      type: "video" as const,
      industry: "woodworking" as const,
      category: video.category,
      videoLength: video.length,
      creator: video.creator
    })),
    ...autoBodyArticles.map(article => ({
      id: article.id + 2000,
      title: article.title,
      description: article.description,
      type: "article" as const,
      industry: "autobody" as const,
      category: article.category,
      difficulty: article.difficulty,
      readTime: article.readTime
    })),
    ...autoBodyVideoReviews.map(video => ({
      id: video.id + 3000,
      title: video.title,
      description: video.description,
      type: "video" as const,
      industry: "autobody" as const,
      category: video.category,
      videoLength: video.length,
      creator: video.creator
    }))
  ];

  // Filter content based on search and filters
  const filteredContent = allContent.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesIndustry = selectedIndustry === "all" || item.industry === selectedIndustry;
    const matchesContentType = selectedContentType === "all" || item.type === selectedContentType;
    const matchesDifficulty = selectedDifficulty === "all" || item.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesIndustry && matchesContentType && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-green-100 text-green-800";
      case "Intermediate": return "bg-yellow-100 text-yellow-800";
      case "Advanced": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getIndustryColor = (industry: string) => {
    return industry === "woodworking" 
      ? "bg-amber-100 text-amber-800" 
      : "bg-blue-100 text-blue-800";
  };

  const ContentCard = ({ item }: { item: ContentItem }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 border-gray-100 hover:border-blue-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2">
            {item.type === "article" ? (
              <FileText className="w-5 h-5 text-blue-500" />
            ) : (
              <Video className="w-5 h-5 text-red-500" />
            )}
            <Badge variant="outline" className={getIndustryColor(item.industry)}>
              {item.industry === "woodworking" ? "Woodworking" : "Auto Body"}
            </Badge>
          </div>
          {item.difficulty && (
            <Badge className={getDifficultyColor(item.difficulty)}>
              {item.difficulty}
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
          {item.title}
        </CardTitle>
        <CardDescription className="text-sm text-gray-600 line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            {item.readTime && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.readTime}
              </div>
            )}
            {item.videoLength && (
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {item.videoLength}
              </div>
            )}
            {item.creator && (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {item.creator}
              </div>
            )}
          </div>
        </div>
        <Button variant="outline" className="w-full group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors">
          {item.type === "article" ? "Read Article" : "Watch Video"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section id="resources" className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
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
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gray-900">Learn from industry</span>
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text text-transparent">
              experts and professionals
            </span>
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our comprehensive collection of articles, videos, and tutorials covering woodworking, millwork, and auto body finishing techniques.
          </p>
        </div>

        {/* Search and Filters */}
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

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredContent.slice(0, 12).map(item => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>

        {/* Stats and CTA */}
        <div className="text-center bg-white rounded-2xl p-12 border border-gray-100 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {allContent.filter(item => item.type === "article").length}+
              </div>
              <div className="text-gray-600 font-medium">Expert Articles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-600 mb-2">
                {allContent.filter(item => item.type === "video").length}+
              </div>
              <div className="text-gray-600 font-medium">Video Tutorials</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">2</div>
              <div className="text-gray-600 font-medium">Industry Specialties</div>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-4">
            Ready to access our complete knowledge base?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Sign up for Finivo to unlock advanced tutorials, industry insights, and connect with our community of finishing professionals.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 group"
            >
              <Link to="/auth/signup" className="flex items-center">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200"
            >
              <Link to="/woodworking-finishing">Explore Woodworking</Link>
            </Button>
            
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-full px-8 py-4 text-lg font-semibold transition-all duration-200"
            >
              <Link to="/auto-body-finishing">Explore Auto Body</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
