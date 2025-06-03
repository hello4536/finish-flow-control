import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Play, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { PodcastEpisode } from "./types";
import PodcastCalendar from "./PodcastCalendar";
interface PodcastSectionProps {
  episodes: PodcastEpisode[];
}
const PodcastSection: React.FC<PodcastSectionProps> = ({
  episodes
}) => {
  const [selectedIndustry, setSelectedIndustry] = useState<"all" | "autobody" | "woodworking" | "general">("all");
  const filteredEpisodes = selectedIndustry === "all" ? episodes : episodes.filter(ep => ep.industry === selectedIndustry);
  const upcomingEpisodes = episodes.filter(ep => ep.status === "upcoming").sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime()).slice(0, 3);
  const recentEpisodes = episodes.filter(ep => ep.status === "published").sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()).slice(0, 6);
  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "autobody":
        return "bg-blue-100 text-blue-800";
      case "woodworking":
        return "bg-amber-100 text-amber-800";
      case "general":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const getIndustryLabel = (industry: string) => {
    switch (industry) {
      case "autobody":
        return "Auto Body";
      case "woodworking":
        return "Millwork";
      case "general":
        return "General";
      default:
        return industry;
    }
  };
  const PodcastCard = ({
    episode
  }: {
    episode: PodcastEpisode;
  }) => <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between mb-2">
          <Badge className={getIndustryColor(episode.industry)}>
            {getIndustryLabel(episode.industry)}
          </Badge>
          <Badge variant={episode.status === "published" ? "default" : "secondary"}>
            {episode.status}
          </Badge>
        </div>
        <CardTitle className="text-lg">{episode.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">
          {episode.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {episode.duration}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {new Date(episode.releaseDate).toLocaleDateString()}
            </div>
            {episode.guests && episode.guests.length > 0 && <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {episode.guests.length} guest{episode.guests.length > 1 ? 's' : ''}
              </div>}
          </div>
        </div>
        <Button className="w-full" variant={episode.status === "published" ? "default" : "secondary"} disabled={episode.status === "upcoming"}>
          <Play className="w-4 h-4 mr-2" />
          {episode.status === "published" ? "Listen Now" : "Coming Soon"}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>;
  return <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 border border-green-200/50 text-green-700 text-sm font-medium mb-6">
          <Play className="w-4 h-4 mr-2" />
          Finivo Podcast Network
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          <span className="text-gray-900">Weekly insights from</span>
          <br />
          <span className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            finishing industry experts
          </span>
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join us every week for in-depth discussions on auto body finishing, millwork mastery, and general finishing techniques.
        </p>
      </div>

      {/* Upcoming Episodes */}
      {upcomingEpisodes.length > 0 && <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              Upcoming This Week
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingEpisodes.map(episode => <PodcastCard key={episode.id} episode={episode} />)}
            </div>
          </CardContent>
        </Card>}

      {/* Podcast Calendar */}
      <PodcastCalendar episodes={episodes} />

      {/* Recent Episodes with Tabs */}
      

      {/* Weekly Schedule Info */}
      <Card className="bg-gradient-to-r from-gray-50 to-blue-50">
        <CardHeader>
          <CardTitle>Never Miss an Episode</CardTitle>
          <CardDescription>Subscribe to get notified when new episodes are released</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
              <h4 className="font-semibold">Mondays</h4>
              <p className="text-sm text-gray-600">Auto Body Finishing</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-amber-500 rounded-full"></div>
              </div>
              <h4 className="font-semibold">Wednesdays</h4>
              <p className="text-sm text-gray-600">Millwork Mastery</p>
            </div>
            <div className="text-center p-4 bg-white rounded-lg border">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
              <h4 className="font-semibold">Fridays</h4>
              <p className="text-sm text-gray-600">General Finishing Talk</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default PodcastSection;