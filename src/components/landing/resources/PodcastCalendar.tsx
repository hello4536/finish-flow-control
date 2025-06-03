
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Clock, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PodcastEpisode } from "./types";
import { format, parseISO } from "date-fns";

interface PodcastCalendarProps {
  episodes: PodcastEpisode[];
}

const PodcastCalendar: React.FC<PodcastCalendarProps> = ({ episodes }) => {
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  const getIndustryColor = (industry: string) => {
    switch (industry) {
      case "autobody": return "bg-blue-500";
      case "woodworking": return "bg-amber-500";
      case "general": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getIndustryLabel = (industry: string) => {
    switch (industry) {
      case "autobody": return "Auto Body";
      case "woodworking": return "Millwork";
      case "general": return "General";
      default: return industry;
    }
  };

  const recentEpisodes = episodes
    .filter(ep => ep.status === "published")
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 6);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Play className="w-6 h-6" />
          Recent Episodes
        </CardTitle>
        <CardDescription className="text-base">
          Catch up on our latest podcast episodes from across all shows.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Weekly Schedule */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
              <div>
                <span className="font-medium text-sm">Monday:</span>
                <p className="text-sm text-gray-600">Auto Body Finishing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
              <div>
                <span className="font-medium text-sm">Wednesday:</span>
                <p className="text-sm text-gray-600">Millwork Mastery</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
              <div>
                <span className="font-medium text-sm">Friday:</span>
                <p className="text-sm text-gray-600">General Finishing Talk</p>
              </div>
            </div>
          </div>

          {/* Recent Episodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentEpisodes.map(episode => (
              <Card 
                key={episode.id} 
                className="cursor-pointer hover:shadow-md transition-shadow border-l-4 hover:-translate-y-1"
                style={{ borderLeftColor: getIndustryColor(episode.industry).replace('bg-', '#').replace('blue-500', '3B82F6').replace('amber-500', 'F59E0B').replace('purple-500', '8B5CF6') }}
                onClick={() => setSelectedEpisode(episode)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge className={`${getIndustryColor(episode.industry).replace('bg-', 'bg-').replace('500', '-100')} text-${getIndustryColor(episode.industry).replace('bg-', '').replace('-500', '')}-800`}>
                      {getIndustryLabel(episode.industry)}
                    </Badge>
                    <Badge variant="default">
                      {episode.status}
                    </Badge>
                  </div>
                  <h4 className="font-medium mb-2 line-clamp-2 text-sm">{episode.title}</h4>
                  <div className="flex items-center gap-4 text-xs text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {episode.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(parseISO(episode.releaseDate), "MMM d")}
                    </div>
                    {episode.guests && episode.guests.length > 0 && (
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {episode.guests.length} guest{episode.guests.length > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                  <Button size="sm" className="w-full">
                    <Play className="w-3 h-3 mr-1" />
                    Listen Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>

      {/* Episode Detail Modal */}
      <Dialog open={!!selectedEpisode} onOpenChange={() => setSelectedEpisode(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Play className="w-5 h-5" />
              {selectedEpisode?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedEpisode && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Badge className={`${getIndustryColor(selectedEpisode.industry).replace('bg-', 'bg-').replace('500', '-100')} text-${getIndustryColor(selectedEpisode.industry).replace('bg-', '').replace('-500', '')}-800`}>
                  {getIndustryLabel(selectedEpisode.industry)}
                </Badge>
                <Badge variant="default">
                  {selectedEpisode.status}
                </Badge>
                <span className="text-sm text-gray-600">
                  {format(parseISO(selectedEpisode.releaseDate), "MMMM d, yyyy")}
                </span>
              </div>
              
              <p className="text-gray-700 leading-relaxed">{selectedEpisode.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Duration:</span> {selectedEpisode.duration}
                </div>
                <div>
                  <span className="font-medium">Creator:</span> {selectedEpisode.creator}
                </div>
              </div>
              
              {selectedEpisode.guests && selectedEpisode.guests.length > 0 && (
                <div>
                  <span className="font-medium text-sm">Guests:</span>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {selectedEpisode.guests.map((guest, index) => (
                      <Badge key={index} variant="outline">{guest}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedEpisode.status === "published" && selectedEpisode.audioUrl && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-2">Audio Player:</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Play className="w-4 h-4" />
                    Audio player would be integrated here
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default PodcastCalendar;
