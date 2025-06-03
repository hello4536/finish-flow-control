
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Play, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PodcastEpisode } from "./types";
import { format, parseISO, isSameDay } from "date-fns";

interface PodcastCalendarProps {
  episodes: PodcastEpisode[];
}

const PodcastCalendar: React.FC<PodcastCalendarProps> = ({ episodes }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedEpisode, setSelectedEpisode] = useState<PodcastEpisode | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const getEpisodesForDate = (date: Date) => {
    return episodes.filter(episode => 
      isSameDay(parseISO(episode.releaseDate), date)
    );
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

  const hasEpisodeOnDate = (date: Date) => {
    return episodes.some(episode => 
      isSameDay(parseISO(episode.releaseDate), date)
    );
  };

  const getEpisodeForDate = (date: Date) => {
    return episodes.find(episode => 
      isSameDay(parseISO(episode.releaseDate), date)
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          Podcast Schedule
        </CardTitle>
        <CardDescription className="text-base">
          Click on any date to see episode details. We release new episodes weekly!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calendar */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                {format(currentMonth, "MMMM yyyy")}
              </h3>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border w-full"
              classNames={{
                months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                month: "space-y-4 w-full",
                caption: "flex justify-center pt-1 relative items-center",
                caption_label: "text-sm font-medium",
                nav: "space-x-1 flex items-center",
                nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
                nav_button_previous: "absolute left-1",
                nav_button_next: "absolute right-1",
                table: "w-full border-collapse space-y-1",
                head_row: "flex",
                head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
                row: "flex w-full mt-2",
                cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors",
                day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                day_today: "bg-accent text-accent-foreground",
                day_outside: "text-muted-foreground opacity-50",
                day_disabled: "text-muted-foreground opacity-50",
                day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
                day_hidden: "invisible"
              }}
              modifiers={{
                hasEpisode: episodeDates
              }}
              modifiersStyles={{
                hasEpisode: { 
                  fontWeight: "bold",
                  backgroundColor: "rgb(59 130 246 / 0.1)",
                  color: "rgb(59 130 246)",
                  position: "relative"
                }
              }}
              onDayClick={(date) => {
                setSelectedDate(date);
                const episodesForDate = getEpisodesForDate(date);
                if (episodesForDate.length > 0) {
                  setSelectedEpisode(episodesForDate[0]);
                }
              }}
            />
            
            {/* Weekly Schedule */}
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Weekly Schedule:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="font-medium">Monday:</span>
                  <span className="text-gray-600">Auto Body Finishing</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  <span className="font-medium">Wednesday:</span>
                  <span className="text-gray-600">Millwork Mastery</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                  <span className="font-medium">Friday:</span>
                  <span className="text-gray-600">General Finishing Talk</span>
                </div>
              </div>
            </div>
          </div>

          {/* Episode Details */}
          <div className="space-y-4">
            {selectedDate && (
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Episodes for {format(selectedDate, "MMMM d, yyyy")}
                </h3>
                
                {getEpisodesForDate(selectedDate).length > 0 ? (
                  <div className="space-y-3">
                    {getEpisodesForDate(selectedDate).map(episode => (
                      <Card 
                        key={episode.id} 
                        className="cursor-pointer hover:shadow-md transition-shadow border-l-4"
                        style={{ borderLeftColor: getIndustryColor(episode.industry).replace('bg-', '').replace('500', '#3B82F6') }}
                        onClick={() => setSelectedEpisode(episode)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <Badge className={getIndustryColor(episode.industry).replace('bg-', 'bg-').replace('500', '-100 text-').replace('text-', episode.industry === 'autobody' ? 'blue' : episode.industry === 'woodworking' ? 'amber' : 'purple') + '-800'}>
                              {getIndustryLabel(episode.industry)}
                            </Badge>
                            <Badge variant={episode.status === "published" ? "default" : "secondary"}>
                              {episode.status}
                            </Badge>
                          </div>
                          <h4 className="font-medium mb-2 line-clamp-2">{episode.title}</h4>
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
                  <div className="text-center py-8">
                    <p className="text-gray-500">No episodes scheduled for this date.</p>
                  </div>
                )}
              </div>
            )}
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
                <Badge className={getIndustryColor(selectedEpisode.industry).replace('bg-', 'bg-').replace('500', '-100 text-').replace('text-', selectedEpisode.industry === 'autobody' ? 'blue' : selectedEpisode.industry === 'woodworking' ? 'amber' : 'purple') + '-800'}>
                  {getIndustryLabel(selectedEpisode.industry)}
                </Badge>
                <Badge variant={selectedEpisode.status === "published" ? "default" : "secondary"}>
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
    </Card>
  );
};

export default PodcastCalendar;
