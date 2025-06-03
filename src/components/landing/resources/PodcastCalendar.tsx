
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Clock, User } from "lucide-react";
import { PodcastEpisode } from "./types";
import { format, parseISO } from "date-fns";

interface PodcastCalendarProps {
  episodes: PodcastEpisode[];
}

const PodcastCalendar: React.FC<PodcastCalendarProps> = ({ episodes }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);

  const getEpisodesForDate = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return episodes.filter(episode => episode.releaseDate === dateString);
  };

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

  const episodeDates = episodes.map(ep => parseISO(ep.releaseDate));

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Podcast Schedule
          </CardTitle>
          <CardDescription>
            Click on any date to see episode details. We release new episodes weekly!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                modifiers={{
                  hasEpisode: episodeDates
                }}
                modifiersStyles={{
                  hasEpisode: { 
                    fontWeight: "bold",
                    backgroundColor: "rgb(59 130 246 / 0.1)",
                    color: "rgb(59 130 246)"
                  }
                }}
                onDayClick={(date) => {
                  const episodesForDate = getEpisodesForDate(date);
                  if (episodesForDate.length > 0) {
                    setSelectedEpisode(episodesForDate[0]);
                  }
                }}
              />
              
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-sm">Weekly Schedule:</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span>Monday: Auto Body Finishing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                    <span>Wednesday: Millwork Mastery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span>Friday: General Finishing Talk</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {selectedDate && (
                <div>
                  <h3 className="font-semibold mb-3">
                    Episodes for {format(selectedDate, "MMMM d, yyyy")}
                  </h3>
                  
                  {getEpisodesForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      {getEpisodesForDate(selectedDate).map(episode => (
                        <Card 
                          key={episode.id} 
                          className="cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => setSelectedEpisode(episode)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <Badge className={getIndustryColor(episode.industry)}>
                                {getIndustryLabel(episode.industry)}
                              </Badge>
                              <Badge variant={episode.status === "published" ? "default" : "secondary"}>
                                {episode.status}
                              </Badge>
                            </div>
                            <h4 className="font-medium mb-1">{episode.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {episode.duration}
                              </div>
                              {episode.guests && episode.guests.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  {episode.guests.length} guest{episode.guests.length > 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No episodes scheduled for this date.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

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
              <div className="flex items-center gap-4">
                <Badge className={getIndustryColor(selectedEpisode.industry)}>
                  {getIndustryLabel(selectedEpisode.industry)}
                </Badge>
                <Badge variant={selectedEpisode.status === "published" ? "default" : "secondary"}>
                  {selectedEpisode.status}
                </Badge>
                <span className="text-sm text-gray-600">
                  {format(parseISO(selectedEpisode.releaseDate), "MMMM d, yyyy")}
                </span>
              </div>
              
              <p className="text-gray-700">{selectedEpisode.description}</p>
              
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
                  <div className="flex flex-wrap gap-2 mt-1">
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
              
              {selectedEpisode.status === "upcoming" && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700">
                    This episode will be available on {format(parseISO(selectedEpisode.releaseDate), "MMMM d, yyyy")}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PodcastCalendar;
