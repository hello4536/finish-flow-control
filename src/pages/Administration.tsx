import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Users from "./Users";
import Settings from "./Settings";
import Resources from "./Resources";
import { Users as UsersIcon, Settings as SettingsIcon, FolderOpen } from "lucide-react";

const Administration: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-3">
        <SettingsIcon className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administration</h1>
          <p className="text-muted-foreground">Manage users, system settings, and resources</p>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="users" className="flex items-center gap-2">
            <UsersIcon className="h-4 w-4" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <SettingsIcon className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="resources" className="flex items-center gap-2">
            <FolderOpen className="h-4 w-4" />
            Resources
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <Users />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Settings />
        </TabsContent>

        <TabsContent value="resources" className="space-y-6">
          <Resources />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Administration;