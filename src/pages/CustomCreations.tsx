
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PaintBucket, SwatchBook, Utensils, Bookmark, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/hooks/use-toast";

// Import custom creation components
import PaintColorsSection from "@/components/custom-creations/paint-colors/PaintColorsSection";
import StainsSection from "@/components/custom-creations/StainsSection";
import RecipesSection from "@/components/custom-creations/RecipesSection";
import BookmarksSection from "@/components/custom-creations/BookmarksSection";

const CustomCreations = () => {
  const [activeTab, setActiveTab] = useState("paint-colors");

  // Stats for each type of custom creation
  const [stats, setStats] = useState({
    paintColors: 0,
    stains: 0,
    recipes: 0,
    bookmarks: 0
  });

  // Update stats when counts change in child components
  const updatePaintCount = (count: number) => {
    setStats(prev => ({
      ...prev,
      paintColors: count
    }));
  };
  const updateStainsCount = (count: number) => {
    setStats(prev => ({
      ...prev,
      stains: count
    }));
  };
  const updateRecipesCount = (count: number) => {
    setStats(prev => ({
      ...prev,
      recipes: count
    }));
  };
  const updateBookmarksCount = (count: number) => {
    setStats(prev => ({
      ...prev,
      bookmarks: count
    }));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Custom Creations
          </h1>
          <p className="text-slate-600 mt-2 font-medium">
            Save and manage your custom paint colors, stains, recipes, and more.
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <Card 
            className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border-0 bg-gradient-to-br from-blue-50 to-indigo-100 backdrop-blur-sm shadow-lg ${
              activeTab === "paint-colors" ? "ring-2 ring-blue-500" : ""
            }`} 
            onClick={() => setActiveTab("paint-colors")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-blue-700 uppercase tracking-wide">Paint Colors</div>
                <div className="rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-3 shadow-lg">
                  <PaintBucket className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mb-2">
                <div className="text-4xl font-bold text-blue-800 mb-1">{stats.paintColors}</div>
                <div className="text-sm text-blue-600 font-medium">Custom colors saved</div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border-0 bg-gradient-to-br from-purple-50 to-violet-100 backdrop-blur-sm shadow-lg ${
              activeTab === "stains" ? "ring-2 ring-purple-500" : ""
            }`} 
            onClick={() => setActiveTab("stains")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-purple-700 uppercase tracking-wide">Stains</div>
                <div className="rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 p-3 shadow-lg">
                  <SwatchBook className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mb-2">
                <div className="text-4xl font-bold text-purple-800 mb-1">{stats.stains}</div>
                <div className="text-sm text-purple-600 font-medium">Custom stains saved</div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border-0 bg-gradient-to-br from-orange-50 to-amber-100 backdrop-blur-sm shadow-lg ${
              activeTab === "recipes" ? "ring-2 ring-orange-500" : ""
            }`} 
            onClick={() => setActiveTab("recipes")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-orange-700 uppercase tracking-wide">Recipes</div>
                <div className="rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 p-3 shadow-lg">
                  <Utensils className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mb-2">
                <div className="text-4xl font-bold text-orange-800 mb-1">{stats.recipes}</div>
                <div className="text-sm text-orange-600 font-medium">Custom recipes saved</div>
              </div>
            </CardContent>
          </Card>
          
          <Card 
            className={`cursor-pointer transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-100 backdrop-blur-sm shadow-lg ${
              activeTab === "bookmarks" ? "ring-2 ring-green-500" : ""
            }`} 
            onClick={() => setActiveTab("bookmarks")}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-semibold text-green-700 uppercase tracking-wide">Bookmarks</div>
                <div className="rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 p-3 shadow-lg">
                  <Bookmark className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="mb-2">
                <div className="text-4xl font-bold text-green-800 mb-1">{stats.bookmarks}</div>
                <div className="text-sm text-green-600 font-medium">Reference items saved</div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Separator />
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-md bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-1">
            <TabsTrigger 
              value="paint-colors" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Colors
            </TabsTrigger>
            <TabsTrigger 
              value="stains"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Stains
            </TabsTrigger>
            <TabsTrigger 
              value="recipes"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Recipes
            </TabsTrigger>
            <TabsTrigger 
              value="bookmarks"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              Bookmarks
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="paint-colors" className="mt-6">
            <PaintColorsSection onCountChange={updatePaintCount} />
          </TabsContent>
          
          <TabsContent value="stains" className="mt-6">
            <StainsSection onCountChange={updateStainsCount} />
          </TabsContent>
          
          <TabsContent value="recipes" className="mt-6">
            <RecipesSection onCountChange={updateRecipesCount} />
          </TabsContent>
          
          <TabsContent value="bookmarks" className="mt-6">
            <BookmarksSection onCountChange={updateBookmarksCount} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CustomCreations;
