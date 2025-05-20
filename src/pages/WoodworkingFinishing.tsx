
import React, { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Info, Mail, BookOpen, ArrowRight } from "lucide-react";

// Import our components
import ArticleCard from "@/components/woodworking/ArticleCard";
import ArticleDialog from "@/components/woodworking/ArticleDialog";
import { articles } from "@/components/woodworking/data/articlesData";

const WoodworkingFinishing = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  
  // Group articles by category
  const categories = {
    all: articles,
    staining: articles.filter(a => a.category === "staining"),
    "clear-finishes": articles.filter(a => a.category === "clear-finishes"),
    techniques: articles.filter(a => a.category === "techniques"),
    materials: articles.filter(a => a.category === "materials"),
    preparation: articles.filter(a => a.category === "preparation"),
    troubleshooting: articles.filter(a => a.category === "troubleshooting"),
  };
  
  // Category info for display
  const categoryInfo = {
    all: {
      title: "All Articles",
      description: "Browse our complete collection of wood finishing resources."
    },
    staining: {
      title: "Wood Staining",
      description: "Discover techniques and products for enhancing the natural beauty of wood with stains."
    },
    "clear-finishes": {
      title: "Clear Finishes",
      description: "Explore clear finish options from lacquers and varnishes to oils and shellac."
    },
    techniques: {
      title: "Finishing Techniques",
      description: "Master essential techniques for professional results on your woodworking projects."
    },
    materials: {
      title: "Materials Guide",
      description: "Learn about the various materials and tools used in the finishing process."
    },
    preparation: {
      title: "Surface Preparation",
      description: "Proper preparation is key to a flawless finish. Learn the best practices."
    },
    troubleshooting: {
      title: "Troubleshooting",
      description: "Solutions for common finishing problems and how to fix mistakes."
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main>
        {/* Hero section with wood grain background */}
        <div 
          className="bg-cover bg-center pt-24 pb-16 px-4 md:px-8 lg:px-16" 
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1566041510639-8d95a2490bfb?q=80&w=1964')", 
            backgroundPosition: "center" 
          }}
        >
          <div className="max-w-6xl mx-auto text-white">
            <div className="max-w-2xl">
              <Badge className="bg-orange-500 text-white hover:bg-orange-600 mb-4">Expert Guide</Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Mastering Wood Finishing</h1>
              <p className="text-lg md:text-xl opacity-90 mb-8">
                Unlock professional finishing techniques that bring your woodworking projects to life. 
                From preparation to troubleshooting, we've got you covered.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                  Start Learning <BookOpen className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 border-white/20">
                  Popular Techniques
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content area */}
        <div className="max-w-7xl mx-auto px-4 py-12 md:px-8">
          <Tabs 
            defaultValue="all" 
            className="w-full"
            onValueChange={setActiveCategory}
          >
            <div className="sticky top-0 z-10 bg-gray-50 pt-4 pb-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-blue-900">Finishing Resources</h2>
                <div className="hidden md:block">
                  <Button variant="outline" className="text-blue-700">
                    Filter <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="pb-2 md:hidden">
                <TabsList className="inline-flex w-max pb-2 pt-2">
                  <TabsTrigger value="all" className="px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium">
                    All Articles
                  </TabsTrigger>
                  {Object.keys(categoryInfo).filter(cat => cat !== "all").map((category) => (
                    <TabsTrigger 
                      key={category} 
                      value={category}
                      className="px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium"
                    >
                      {categoryInfo[category].title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </ScrollArea>
              
              <div className="hidden md:flex md:items-center md:justify-center">
                <TabsList className="flex justify-center">
                  <TabsTrigger value="all">
                    All Articles
                  </TabsTrigger>
                  {Object.keys(categoryInfo).filter(cat => cat !== "all").map((category) => (
                    <TabsTrigger key={category} value={category}>
                      {categoryInfo[category].title}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            
            <div className="mt-8">
              <TabsContent value={activeCategory}>
                <div>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-blue-900">{categoryInfo[activeCategory].title}</h3>
                    <p className="text-blue-700 mt-1">{categoryInfo[activeCategory].description}</p>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {categories[activeCategory].map(article => (
                      <ArticleCard 
                        key={article.id} 
                        article={article} 
                        onReadArticle={setSelectedArticle} 
                      />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
          
          {/* Featured content section */}
          <section className="mt-20 bg-blue-50 rounded-xl overflow-hidden">
            <div className="md:grid md:grid-cols-2">
              <div className="p-8 md:p-10">
                <Badge className="bg-blue-200 text-blue-800 hover:bg-blue-300 mb-2">Featured</Badge>
                <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-3">
                  The Ultimate Wood Finish Selection Guide
                </h2>
                <p className="text-blue-800 opacity-90 mb-6">
                  Not sure which finish to use? Our comprehensive guide will walk 
                  you through selecting the perfect finish based on your project type,
                  wood species, and desired appearance and durability.
                </p>
                <Button className="bg-blue-700 hover:bg-blue-800 text-white">
                  Read The Guide <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div 
                className="h-60 md:h-auto bg-cover bg-center" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=1972')" }}
              ></div>
            </div>
          </section>
          
          {/* Quick tips section */}
          <section className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                <Info className="h-6 w-6 text-orange-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900">Quick Finishing Tips</h2>
                <p className="text-blue-700">Pro insights to improve your next project</p>
              </div>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Always Sand With The Grain</h3>
                <p className="text-gray-700">
                  Sanding against the grain can create scratches that become more visible after finishing. 
                  Always sand in the direction of the wood grain for best results.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Test On Scrap First</h3>
                <p className="text-gray-700">
                  Always test your finish on a scrap piece of the same wood to ensure 
                  you're happy with the color and appearance before applying it to your project.
                </p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-xl font-bold text-blue-900 mb-2">Apply Thin Coats</h3>
                <p className="text-gray-700">
                  Multiple thin coats always produce better results than one thick coat. 
                  Be patient and allow proper drying time between coats.
                </p>
              </div>
            </div>
          </section>
          
          {/* Newsletter subscription */}
          <section className="mt-20 bg-gradient-to-r from-blue-700 to-blue-900 rounded-xl shadow-lg p-8 text-white">
            <div className="md:flex md:items-center md:justify-between">
              <div className="mb-6 md:mb-0 md:mr-8 md:flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Mail className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">Finishing Tips In Your Inbox</h2>
                </div>
                <p className="text-blue-100 mb-4">
                  Join our newsletter to get expert advice, new techniques, product reviews, and project 
                  inspiration delivered straight to your inbox.
                </p>
              </div>
              
              <div className="md:flex-1">
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300" 
                  />
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white font-medium">
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-blue-200 mt-2">
                  We'll never share your email. Unsubscribe anytime.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <ArticleDialog 
        article={selectedArticle} 
        isOpen={selectedArticle !== null} 
        onClose={() => setSelectedArticle(null)} 
      />
      
      <Footer />
    </div>
  );
};

export default WoodworkingFinishing;
