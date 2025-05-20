import React from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaintBucket, Brush, Sparkles, Shield, Car } from "lucide-react";
const AutoBodyFinishing = () => {
  const articles = [{
    title: "Paint Booth Setup & Maintenance",
    description: "Best practices for setting up and maintaining a professional auto body paint booth.",
    icon: <Car className="h-6 w-6 text-blue-500" />,
    category: "equipment"
  }, {
    title: "Color Matching Techniques",
    description: "Learn how to achieve perfect color matches for automotive paint repairs.",
    icon: <PaintBucket className="h-6 w-6 text-blue-500" />,
    category: "painting"
  }, {
    title: "Surface Preparation for Auto Paint",
    description: "Essential steps for preparing automotive surfaces before applying paint.",
    icon: <Sparkles className="h-6 w-6 text-blue-500" />,
    category: "preparation"
  }, {
    title: "Clear Coat Application Guide",
    description: "Step-by-step instructions for achieving a flawless clear coat finish.",
    icon: <Brush className="h-6 w-6 text-blue-500" />,
    category: "painting"
  }, {
    title: "Paint Defect Troubleshooting",
    description: "Identifying and fixing common auto paint problems like orange peel, fish eye, and runs.",
    icon: <Shield className="h-6 w-6 text-blue-500" />,
    category: "troubleshooting"
  }, {
    title: "HVLP Spray Gun Techniques",
    description: "Master the use of HVLP spray guns for professional automotive finishes.",
    icon: <Car className="h-6 w-6 text-blue-500" />,
    category: "equipment"
  }];
  return <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Auto Body Finishing</h1>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto">
              Professional tips, techniques, and best practices for automotive paint and body work.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-orange-100">
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="painting">Painting</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
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
                  </Card>)}
              </div>
            </TabsContent>
            
            {["preparation", "painting", "equipment", "troubleshooting"].map(category => <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles.filter(article => article.category === category).map((article, index) => <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
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
                      </Card>)}
                </div>
              </TabsContent>)}
          </Tabs>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Get Professional Auto Body Tips</h2>
            <p className="text-blue-800 mb-4">Subscribe to receive industry insights, product reviews, and advanced techniques directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded border" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>;
};
export default AutoBodyFinishing;