import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CustomCreations from "./CustomCreations";
import WoodworkingFinishing from "./WoodworkingFinishing";
import AutoBodyFinishing from "./AutoBodyFinishing";
import { Palette, Hammer, Car, Droplet } from "lucide-react";

const CreativeHub: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <Palette className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Creative Hub</h1>
          <p className="text-muted-foreground">Manage custom projects, woodworking, auto body work, and color recipes</p>
        </div>
      </div>

      <Tabs defaultValue="custom" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="custom" className="flex items-center gap-2">
            <Palette className="h-4 w-4" />
            Custom Projects
          </TabsTrigger>
          <TabsTrigger value="woodworking" className="flex items-center gap-2">
            <Hammer className="h-4 w-4" />
            Woodworking
          </TabsTrigger>
          <TabsTrigger value="autobody" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            Auto Body
          </TabsTrigger>
          <TabsTrigger value="colors" className="flex items-center gap-2">
            <Droplet className="h-4 w-4" />
            Color Recipes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="custom" className="space-y-6">
          <CustomCreations />
        </TabsContent>

        <TabsContent value="woodworking" className="space-y-6">
          <WoodworkingFinishing />
        </TabsContent>

        <TabsContent value="autobody" className="space-y-6">
          <AutoBodyFinishing />
        </TabsContent>

        <TabsContent value="colors" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Color Recipes</CardTitle>
              <CardDescription>Manage paint colors, stains, and custom color formulations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Color recipe management coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CreativeHub;