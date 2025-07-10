import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapPin, Calendar, Award, ExternalLink, Users } from "lucide-react";

interface AuthorBioProps {
  name: string;
  title: string;
  company?: string;
  avatar?: string;
  bio: string;
  experience: string;
  location?: string;
  specialties: string[];
  achievements?: string[];
  followersCount?: number;
  articlesCount?: number;
  linkedinUrl?: string;
  websiteUrl?: string;
}

const AuthorBio: React.FC<AuthorBioProps> = ({
  name,
  title,
  company,
  avatar,
  bio,
  experience,
  location,
  specialties,
  achievements = [],
  followersCount,
  articlesCount,
  linkedinUrl,
  websiteUrl
}) => {
  return (
    <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={avatar} alt={name} />
            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-semibold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{name}</h3>
            <p className="text-blue-600 font-medium mb-1">{title}</p>
            {company && <p className="text-gray-600 text-sm mb-2">{company}</p>}
            <div className="flex items-center text-sm text-gray-500 space-x-4">
              {location && (
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {location}
                </div>
              )}
              <div className="flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {experience}
              </div>
            </div>
          </div>
        </div>

        <p className="text-gray-700 text-sm mb-4 leading-relaxed">{bio}</p>

        {specialties.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-2">Specializes in:</p>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {achievements.length > 0 && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-900 mb-2">
              <Award className="w-4 h-4 inline mr-1" />
              Key Achievements:
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              {achievements.map((achievement, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            {followersCount && (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                {followersCount.toLocaleString()} followers
              </div>
            )}
            {articlesCount && (
              <div>
                {articlesCount} articles published
              </div>
            )}
          </div>
          <div className="flex space-x-2">
            {linkedinUrl && (
              <Button size="sm" variant="outline" asChild>
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            )}
            {websiteUrl && (
              <Button size="sm" variant="outline" asChild>
                <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                  Website
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthorBio;