
import React, { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronRight, Info, Mail } from "lucide-react";

// Import our components
import ArticleCard from "@/components/woodworking/ArticleCard";
import ArticleDialog from "@/components/woodworking/ArticleDialog";
import { articles } from "@/components/woodworking/data/articlesData";

const WoodworkingFinishing = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  
  // Group articles by category
  const categories = {
    staining: articles.filter(a => a.category === "staining"),
    "clear-finishes": articles.filter(a => a.category === "clear-finishes"),
    techniques: articles.filter(a => a.category === "techniques"),
    materials: articles.filter(a => a.category === "materials"),
    preparation: articles.filter(a => a.category === "preparation"),
    troubleshooting: articles.filter(a => a.category === "troubleshooting"),
  };
  
  // Category info for display
  const categoryInfo = {
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
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-orange-50">
        {/* Hero section */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl font-bold mb-6">Woodworking Finishing</h1>
              <p className="text-xl mb-8">
                Expert tips, techniques, and best practices for achieving professional-quality wood finishes
                that will make your projects stand out.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Explore Techniques
                </Button>
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
                  Browse Materials
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Quick navigation */}
        <div className="bg-white py-6 shadow-md sticky top-0 z-10">
          <div className="container mx-auto px-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
              {Object.keys(categories).map((category) => (
                <a 
                  key={category} 
                  href={`#${category}`}
                  className="px-4 py-2 whitespace-nowrap rounded-full bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium text-sm flex-shrink-0 transition-colors"
                >
                  {categoryInfo[category].title}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Category sections */}
        <div className="container mx-auto px-4 py-12">
          {Object.entries(categories).map(([category, categoryArticles]) => (
            <section 
              key={category} 
              id={category} 
              className="mb-20 scroll-mt-24"
            >
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-blue-900">{categoryInfo[category].title}</h2>
                  <p className="text-lg text-blue-700 mt-2">{categoryInfo[category].description}</p>
                </div>
                <Button variant="ghost" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {categoryArticles.map(article => (
                  <ArticleCard 
                    key={article.id} 
                    article={article} 
                    onReadArticle={setSelectedArticle} 
                  />
                ))}
              </div>
              
              <Separator className="mt-10 bg-blue-100" />
            </section>
          ))}
          
          {/* Featured resources section */}
          <section className="mb-20 bg-blue-50 rounded-xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Info className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-blue-900">Featured Resources</h2>
                <p className="text-blue-700">Handpicked guides to take your finishing skills to the next level</p>
              </div>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Complete Guide to Wood Finishing</h3>
                <p className="text-blue-800 mb-4">A comprehensive guide covering all aspects of wood finishing from preparation to final coat.</p>
                <Button variant="outline" className="w-full">Download PDF</Button>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm border border-blue-100">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">Finishing Technique Videos</h3>
                <p className="text-blue-800 mb-4">A curated collection of high-quality video tutorials demonstrating advanced finishing techniques.</p>
                <Button variant="outline" className="w-full">Access Videos</Button>
              </div>
            </div>
          </section>
          
          {/* Newsletter subscription */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-lg p-8 text-white mb-20">
            <div className="md:flex items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="h-6 w-6" />
                  <h2 className="text-2xl font-bold">Subscribe for Weekly Tips</h2>
                </div>
                <p className="text-blue-100">
                  Join our newsletter and get the latest finishing techniques, product reviews, and expert advice delivered to your inbox.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 md:min-w-[400px]">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-1 px-4 py-3 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300" 
                />
                <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
                  Subscribe
                </Button>
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
