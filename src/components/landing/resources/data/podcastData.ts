
import { PodcastEpisode } from "../types";

export const podcastEpisodes: PodcastEpisode[] = [
  // Auto Body Finishing Podcasts (Mondays)
  {
    id: 4001,
    title: "Advanced Clear Coat Techniques for Modern Vehicles",
    description: "Deep dive into the latest clear coat application methods and troubleshooting common issues in automotive refinishing.",
    type: "podcast",
    industry: "autobody",
    category: "Clear Coating",
    difficulty: "Advanced",
    duration: "45 min",
    releaseDate: "2025-06-02",
    status: "published",
    guests: ["Mike Rodriguez", "Sarah Chen"],
    audioUrl: "/podcasts/clearcoat-techniques.mp3",
    creator: "Auto Body Masters"
  },
  {
    id: 4002,
    title: "Color Matching Secrets from Industry Experts",
    description: "Learn professional color matching techniques and the latest technology for perfect paint matches every time.",
    type: "podcast",
    industry: "autobody",
    category: "Color Matching",
    difficulty: "Intermediate",
    duration: "38 min",
    releaseDate: "2025-06-09",
    status: "upcoming",
    guests: ["Tony Martinez"],
    creator: "Auto Body Masters"
  },
  {
    id: 4003,
    title: "Spray Gun Setup and Maintenance Masterclass",
    description: "Everything you need to know about spray gun selection, setup, and maintenance for optimal finishing results.",
    type: "podcast",
    industry: "autobody",
    category: "Equipment",
    difficulty: "Beginner",
    duration: "42 min",
    releaseDate: "2025-06-16",
    status: "upcoming",
    guests: ["Lisa Thompson"],
    creator: "Auto Body Masters"
  },

  // Millwork Finishing Podcasts (Wednesdays)
  {
    id: 4004,
    title: "Cabinet Finishing: From Prep to Perfect Sheen",
    description: "Complete guide to cabinet finishing including surface preparation, stain application, and achieving consistent results.",
    type: "podcast",
    industry: "woodworking",
    category: "Cabinet Finishing",
    difficulty: "Intermediate",
    duration: "52 min",
    releaseDate: "2025-05-28",
    status: "published",
    guests: ["David Kim", "Jennifer Walsh"],
    audioUrl: "/podcasts/cabinet-finishing.mp3",
    creator: "Millwork Mastery"
  },
  {
    id: 4005,
    title: "Architectural Millwork: High-End Finishing Techniques",
    description: "Explore premium finishing methods for architectural millwork including custom stains and protective coatings.",
    type: "podcast",
    industry: "woodworking",
    category: "Architectural Millwork",
    difficulty: "Advanced",
    duration: "48 min",
    releaseDate: "2025-06-04",
    status: "published",
    guests: ["Robert Anderson"],
    audioUrl: "/podcasts/architectural-millwork.mp3",
    creator: "Millwork Mastery"
  },
  {
    id: 4006,
    title: "Troubleshooting Common Wood Finishing Problems",
    description: "Identify and solve the most common issues in wood finishing, from blotchy stains to finish adhesion problems.",
    type: "podcast",
    industry: "woodworking",
    category: "Troubleshooting",
    difficulty: "Intermediate",
    duration: "44 min",
    releaseDate: "2025-06-11",
    status: "upcoming",
    guests: ["Maria Santos"],
    creator: "Millwork Mastery"
  },

  // General Finishing Podcasts (Fridays)
  {
    id: 4007,
    title: "The Science Behind Paint Chemistry",
    description: "Understanding the fundamental chemistry of paints and coatings and how it affects application and performance.",
    type: "podcast",
    industry: "general",
    category: "Chemistry",
    difficulty: "Advanced",
    duration: "56 min",
    releaseDate: "2025-05-30",
    status: "published",
    guests: ["Dr. Emily Foster", "James Park"],
    audioUrl: "/podcasts/paint-chemistry.mp3",
    creator: "General Finishing Talk"
  },
  {
    id: 4008,
    title: "Environmental Considerations in Modern Finishing",
    description: "Discussing eco-friendly finishing options, VOC regulations, and sustainable practices in the finishing industry.",
    type: "podcast",
    industry: "general",
    category: "Environmental",
    difficulty: "Beginner",
    duration: "39 min",
    releaseDate: "2025-06-06",
    status: "published",
    guests: ["Green Finish Solutions Team"],
    audioUrl: "/podcasts/environmental-finishing.mp3",
    creator: "General Finishing Talk"
  },
  {
    id: 4009,
    title: "Future Trends in Finishing Technology",
    description: "Exploring emerging technologies and trends that will shape the future of finishing across all industries.",
    type: "podcast",
    industry: "general",
    category: "Technology",
    difficulty: "Intermediate",
    duration: "47 min",
    releaseDate: "2025-06-13",
    status: "upcoming",
    guests: ["Tech Innovation Panel"],
    creator: "General Finishing Talk"
  }
];
