
import React, { useState } from "react";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import our components
import ContentDisplay from "@/components/woodworking/ContentDisplay";
import ArticleDialog from "@/components/woodworking/ArticleDialog";
import { articles } from "@/components/woodworking/data/articlesData";

const WoodworkingFinishing = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Woodworking Finishing</h1>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto">
              Explore expert tips, techniques, and best practices for achieving professional-quality wood finishes.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center mb-6">
              <TabsList className="flex-wrap">
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="staining">Staining</TabsTrigger>
                <TabsTrigger value="clear-finishes">Clear Finishes</TabsTrigger>
                <TabsTrigger value="techniques">Techniques</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
            </div>
            
            {["all", "staining", "clear-finishes", "techniques", "materials", "preparation", "troubleshooting"].map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <ContentDisplay 
                  category={category} 
                  articles={articles}
                  onReadArticle={setSelectedArticle}
                />
              </TabsContent>
            ))}
          </Tabs>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Subscribe for Weekly Woodworking Finishing Tips</h2>
            <p className="text-blue-800 mb-4">Join our newsletter and get the latest finishing techniques, product reviews, and expert advice delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded border" />
              <Button>Subscribe</Button>
            </div>
          </div>
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
