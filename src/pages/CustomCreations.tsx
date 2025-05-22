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
  return <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-purple-600">Custom Creations</h1>
        <p className="text-muted-foreground mt-2">
          Save and manage your custom paint colors, stains, recipes, and more.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card className={`cursor-pointer hover:border-primary/50 transition-all ${activeTab === "paint-colors" ? "border-primary" : ""}`} onClick={() => setActiveTab("paint-colors")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Paint Colors</CardTitle>
            <PaintBucket className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.paintColors}</div>
            <p className="text-xs text-muted-foreground">Custom colors saved</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer hover:border-primary/50 transition-all ${activeTab === "stains" ? "border-primary" : ""}`} onClick={() => setActiveTab("stains")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Stains</CardTitle>
            <SwatchBook className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.stains}</div>
            <p className="text-xs text-muted-foreground">Custom stains saved</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer hover:border-primary/50 transition-all ${activeTab === "recipes" ? "border-primary" : ""}`} onClick={() => setActiveTab("recipes")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Recipes</CardTitle>
            <Utensils className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.recipes}</div>
            <p className="text-xs text-muted-foreground">Custom recipes saved</p>
          </CardContent>
        </Card>
        
        <Card className={`cursor-pointer hover:border-primary/50 transition-all ${activeTab === "bookmarks" ? "border-primary" : ""}`} onClick={() => setActiveTab("bookmarks")}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Bookmarks</CardTitle>
            <Bookmark className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.bookmarks}</div>
            <p className="text-xs text-muted-foreground">Reference items saved</p>
          </CardContent>
        </Card>
      </div>
      
      <Separator />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-50">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="paint-colors">Colors</TabsTrigger>
          <TabsTrigger value="stains">Stains</TabsTrigger>
          <TabsTrigger value="recipes">Recipes</TabsTrigger>
          <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
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
    </div>;
};
export default CustomCreations;