import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Users, TrendingUp } from "lucide-react";

const SocialProofWidget = () => {
  const [notifications, setNotifications] = useState<Array<{
    id: number;
    name: string;
    company: string;
    action: string;
    time: string;
  }>>([]);

  const sampleNotifications = [
    { name: "Mike Johnson", company: "AutoBody Pro", action: "started free trial", time: "2 minutes ago" },
    { name: "Sarah Wilson", company: "Elite Woodworks", action: "upgraded to Pro", time: "5 minutes ago" },
    { name: "David Chen", company: "Precision Coatings", action: "started free trial", time: "8 minutes ago" },
    { name: "Lisa Rodriguez", company: "Custom Finish Co", action: "completed onboarding", time: "12 minutes ago" },
    { name: "Tom Anderson", company: "Metro Auto Paint", action: "started free trial", time: "15 minutes ago" }
  ];

  useEffect(() => {
    // Show initial notification
    setNotifications([{ ...sampleNotifications[0], id: Date.now() }]);

    // Add new notifications every 10-15 seconds
    const interval = setInterval(() => {
      const randomNotification = sampleNotifications[Math.floor(Math.random() * sampleNotifications.length)];
      const newNotification = { 
        ...randomNotification, 
        id: Date.now(),
        time: "Just now"
      };
      
      setNotifications(prev => {
        const updated = [newNotification, ...prev].slice(0, 3); // Keep only last 3
        return updated;
      });

      // Auto-hide after 8 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
      }, 8000);
    }, Math.random() * 5000 + 10000); // Random between 10-15 seconds

    return () => clearInterval(interval);
  }, []);

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 space-y-2">
      {notifications.map((notification) => (
        <Card
          key={notification.id}
          className="p-4 bg-white border border-gray-200 shadow-lg max-w-sm animate-slide-in-left"
        >
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-600 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-1">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {notification.name}
                </p>
                <span className="text-xs text-gray-500">from</span>
                <p className="text-xs font-medium text-blue-600 truncate">
                  {notification.company}
                </p>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                {notification.action} • {notification.time}
              </p>
            </div>
            <TrendingUp className="w-4 h-4 text-green-500 flex-shrink-0" />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default SocialProofWidget;