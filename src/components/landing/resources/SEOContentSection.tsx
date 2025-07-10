import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Users, Award, ArrowRight } from "lucide-react";

const SEOContentSection: React.FC = () => {
  const seoTopics = [
    {
      title: "Professional Wood Finishing Techniques",
      description: "Master the art of wood finishing with our comprehensive guides covering staining, sealing, and protective coatings.",
      keywords: ["wood finishing", "furniture refinishing", "cabinet staining"],
      popularity: "High",
      articles: 23
    },
    {
      title: "Auto Body Paint Repair Solutions", 
      description: "Learn professional auto body painting and repair techniques used by certified technicians worldwide.",
      keywords: ["auto body repair", "car painting", "collision repair"],
      popularity: "Very High",
      articles: 31
    },
    {
      title: "Spray Equipment Setup & Maintenance",
      description: "Complete guides on spray gun selection, setup, and maintenance for optimal finishing results.",
      keywords: ["spray gun", "paint equipment", "finishing tools"],
      popularity: "High", 
      articles: 18
    },
    {
      title: "Industrial Coating Applications",
      description: "Advanced techniques for industrial and commercial coating applications across multiple industries.",
      keywords: ["industrial coatings", "commercial painting", "protective finishes"],
      popularity: "Medium",
      articles: 15
    }
  ];

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "Very High": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800"; 
      case "Medium": return "bg-yellow-100 text-yellow-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200/50 text-green-700 text-sm font-medium mb-6">
            <Search className="w-4 h-4 mr-2" />
            Trending Topics
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-gray-900">Most Searched</span>
            <br />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Finishing Topics
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the most popular finishing topics that professionals are searching for and learning about.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {seoTopics.map((topic, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between mb-2">
                  <Badge className={getPopularityColor(topic.popularity)}>
                    {topic.popularity} Demand
                  </Badge>
                  <div className="flex items-center text-sm text-gray-500">
                    <Users className="w-4 h-4 mr-1" />
                    {topic.articles} articles
                  </div>
                </div>
                <CardTitle className="text-xl">{topic.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {topic.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Popular Keywords:</p>
                  <div className="flex flex-wrap gap-2">
                    {topic.keywords.map((keyword, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Explore Topic
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section for SEO */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h3>
            <p className="text-gray-600">
              Get answers to the most common finishing questions from our expert community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What's the best spray gun for beginners?
                </h4>
                <p className="text-gray-600 text-sm">
                  HVLP spray guns are ideal for beginners due to their lower overspray and easier control. Start with a 1.4mm tip for most applications.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How do I prevent orange peel texture?
                </h4>
                <p className="text-gray-600 text-sm">
                  Orange peel is usually caused by improper spray distance, incorrect pressure, or wrong material viscosity. Maintain 6-8 inches distance.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  What temperature is best for finishing?
                </h4>
                <p className="text-gray-600 text-sm">
                  Ideal finishing temperature is 70-75°F with 50-60% humidity. Avoid finishing in direct sunlight or extreme temperatures.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">
                  How long should I wait between coats?
                </h4>
                <p className="text-gray-600 text-sm">
                  Wait times depend on material type and conditions. Generally 2-4 hours for water-based and 6-8 hours for oil-based finishes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SEOContentSection;