
import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaintBucket, Brush, Sparkles, Shield } from "lucide-react";

const WoodworkingFinishing = () => {
  const articles = [
    {
      title: "Understanding Wood Stains",
      description: "Learn about different types of wood stains and how to choose the right one for your project.",
      icon: <PaintBucket className="h-6 w-6 text-orange-500" />,
      category: "staining"
    },
    {
      title: "Applying Clear Finishes",
      description: "Step-by-step guide on applying clear coats, lacquers, and varnishes for professional results.",
      icon: <Brush className="h-6 w-6 text-orange-500" />,
      category: "clear-finishes"
    },
    {
      title: "Surface Preparation Techniques",
      description: "Master the art of wood preparation for flawless finishing results.",
      icon: <Sparkles className="h-6 w-6 text-orange-500" />,
      category: "preparation"
    },
    {
      title: "Water vs. Oil-Based Finishes",
      description: "Understand the differences, advantages, and applications of water and oil-based finishing products.",
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      category: "materials"
    },
    {
      title: "Troubleshooting Common Finish Problems",
      description: "Solutions for common issues like blotching, bubbling, and uneven finish application.",
      icon: <Brush className="h-6 w-6 text-orange-500" />,
      category: "troubleshooting"
    },
    {
      title: "Spray Finishing for Beginners",
      description: "Getting started with spray equipment for professional-quality wood finishes.",
      icon: <PaintBucket className="h-6 w-6 text-orange-500" />,
      category: "techniques"
    }
  ];

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
              <TabsList>
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="staining">Staining</TabsTrigger>
                <TabsTrigger value="clear-finishes">Clear Finishes</TabsTrigger>
                <TabsTrigger value="techniques">Techniques</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                        {article.icon}
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{article.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full">Read Article</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {["staining", "clear-finishes", "techniques", "materials"].map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles
                    .filter(article => article.category === category)
                    .map((article, index) => (
                      <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                            {article.icon}
                          </div>
                          <CardTitle className="text-xl">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">{article.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">Read Article</Button>
                        </CardFooter>
                      </Card>
                    ))
                  }
                </div>
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
      
      <Footer />
    </div>
  );
};

export default WoodworkingFinishing;
