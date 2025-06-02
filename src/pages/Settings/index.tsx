
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Globe, Lock, User } from "lucide-react";
import SettingsHeader from "./components/SettingsHeader";
import ProfileTab from "./components/ProfileTab";
import NotificationsTab from "./components/NotificationsTab";
import SecurityTab from "./components/SecurityTab";
import AppearanceTab from "./components/AppearanceTab";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-6 py-8 space-y-8">
        <SettingsHeader />
        
        <Tabs defaultValue="profile" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-4 w-full max-w-4xl mb-8 bg-white/80 backdrop-blur-sm border border-slate-200 shadow-lg rounded-2xl p-2">
            <TabsTrigger value="profile" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-red-500 data-[state=active]:to-rose-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <Lock className="h-4 w-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-violet-500 data-[state=active]:text-white data-[state=active]:shadow-lg rounded-xl">
              <Globe className="h-4 w-4" />
              <span className="hidden sm:inline">Appearance</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <ProfileTab />
          </TabsContent>
          
          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="security">
            <SecurityTab />
          </TabsContent>
        
          <TabsContent value="appearance">
            <AppearanceTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
