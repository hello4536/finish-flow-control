
import React from "react";
import { FileText, Shield, Wrench, Award, BookOpen } from "lucide-react";

export interface Article {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  readTime: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  content: string;
}

export const autoBodyArticles: Article[] = [
  {
    id: 1,
    title: "Automotive Paint System Fundamentals",
    description: "Understanding the layers and components of modern automotive paint systems for professional results.",
    icon: React.createElement(FileText, { className: "h-6 w-6 text-blue-500" }),
    category: "paint-systems",
    readTime: "8 min read",
    difficulty: "Beginner",
    content: `
      <h2>Understanding Automotive Paint Systems</h2>
      <p>Modern automotive paint systems consist of multiple layers, each serving a specific purpose in protection and appearance.</p>
      
      <h3>Base Layers</h3>
      <p>The foundation starts with proper surface preparation and primer application. Different primer types serve various purposes:</p>
      <ul>
        <li>Etching primers for bare metal</li>
        <li>High-build primers for smoothing imperfections</li>
        <li>Sealer primers for color uniformity</li>
      </ul>
      
      <h3>Color Coats</h3>
      <p>The color layer provides the vehicle's appearance and can be:</p>
      <ul>
        <li>Solid colors for classic, uniform appearance</li>
        <li>Metallic finishes with aluminum flakes</li>
        <li>Pearl coats with mica particles</li>
      </ul>
      
      <h3>Clear Coat Protection</h3>
      <p>The final clear coat provides UV protection, chemical resistance, and gloss retention. Modern clear coats often include:</p>
      <ul>
        <li>UV absorbers and stabilizers</li>
        <li>Scratch-resistant additives</li>
        <li>Self-healing properties</li>
      </ul>
    `
  },
  {
    id: 2,
    title: "Color Matching and Paint Mixing",
    description: "Master the art of automotive color matching using spectrophotometers and traditional techniques.",
    icon: React.createElement(Award, { className: "h-6 w-6 text-purple-500" }),
    category: "color-matching",
    readTime: "12 min read",
    difficulty: "Advanced",
    content: `
      <h2>Precision Color Matching</h2>
      <p>Accurate color matching is crucial for seamless automotive repairs and restorations.</p>
      
      <h3>Spectrophotometer Technology</h3>
      <p>Modern color matching relies on spectrophotometers that analyze light reflection across the visible spectrum:</p>
      <ul>
        <li>Multi-angle measurement for metallic and pearl effects</li>
        <li>Database comparison with manufacturer formulas</li>
        <li>Automatic formula adjustments</li>
      </ul>
      
      <h3>Traditional Color Matching</h3>
      <p>Visual color matching skills remain important for complex situations:</p>
      <ul>
        <li>Understanding color theory and metamerism</li>
        <li>Spray-out card techniques</li>
        <li>Blending strategies for invisible repairs</li>
      </ul>
      
      <h3>Paint Mixing Precision</h3>
      <p>Accurate paint mixing ensures consistent results:</p>
      <ul>
        <li>Gravimetric vs. volumetric mixing systems</li>
        <li>Proper stirring and mixing techniques</li>
        <li>Viscosity adjustment and reduction ratios</li>
      </ul>
    `
  },
  {
    id: 3,
    title: "Spray Booth Operations and Safety",
    description: "Essential knowledge for operating automotive spray booths safely and efficiently.",
    icon: React.createElement(Shield, { className: "h-6 w-6 text-green-500" }),
    category: "safety-compliance",
    readTime: "10 min read",
    difficulty: "Intermediate",
    content: `
      <h2>Spray Booth Best Practices</h2>
      <p>Proper spray booth operation ensures quality finishes while maintaining safety standards.</p>
      
      <h3>Airflow Management</h3>
      <p>Understanding airflow patterns is critical for even paint application:</p>
      <ul>
        <li>Downdraft vs. crossdraft booth designs</li>
        <li>Air velocity requirements (50-100 FPM)</li>
        <li>Filter maintenance schedules</li>
      </ul>
      
      <h3>Temperature and Humidity Control</h3>
      <p>Environmental conditions directly affect paint quality:</p>
      <ul>
        <li>Optimal temperature range (65-75°F)</li>
        <li>Humidity control (40-60% RH)</li>
        <li>Curing cycle management</li>
      </ul>
      
      <h3>Safety Protocols</h3>
      <p>Personal and environmental safety must be prioritized:</p>
      <ul>
        <li>Proper PPE selection and use</li>
        <li>Respiratory protection programs</li>
        <li>Fire suppression systems</li>
        <li>Waste management procedures</li>
      </ul>
    `
  },
  {
    id: 4,
    title: "Surface Preparation for Automotive Finishes",
    description: "Complete guide to preparing automotive surfaces for professional paint application.",
    icon: React.createElement(Wrench, { className: "h-6 w-6 text-orange-500" }),
    category: "surface-prep",
    readTime: "15 min read",
    difficulty: "Intermediate",
    content: `
      <h2>Automotive Surface Preparation</h2>
      <p>Proper surface preparation is the foundation of any quality automotive finish.</p>
      
      <h3>Damage Assessment</h3>
      <p>Begin with thorough evaluation of the surface condition:</p>
      <ul>
        <li>Rust and corrosion evaluation</li>
        <li>Dent and scratch assessment</li>
        <li>Paint adhesion testing</li>
      </ul>
      
      <h3>Metal Preparation</h3>
      <p>Bare metal requires specific preparation steps:</p>
      <ul>
        <li>Rust removal techniques</li>
        <li>Metal conditioning and etching</li>
        <li>Primer selection and application</li>
      </ul>
      
      <h3>Sanding Procedures</h3>
      <p>Progressive sanding ensures optimal paint adhesion:</p>
      <ul>
        <li>Grit progression (80-800+ grit)</li>
        <li>Wet vs. dry sanding applications</li>
        <li>Guide coat techniques</li>
        <li>Final cleaning and tack cloth use</li>
      </ul>
    `
  },
  {
    id: 5,
    title: "Automotive Equipment Maintenance",
    description: "Keep your spray guns, compressors, and booth equipment running at peak performance.",
    icon: React.createElement(Wrench, { className: "h-6 w-6 text-red-500" }),
    category: "equipment-maintenance",
    readTime: "11 min read",
    difficulty: "Beginner",
    content: `
      <h2>Equipment Maintenance Essentials</h2>
      <p>Regular maintenance ensures consistent performance and extends equipment life.</p>
      
      <h3>Spray Gun Care</h3>
      <p>Proper spray gun maintenance prevents finish defects:</p>
      <ul>
        <li>Daily cleaning procedures</li>
        <li>Needle and nozzle inspection</li>
        <li>Fluid tip replacement schedules</li>
        <li>Air cap maintenance</li>
      </ul>
      
      <h3>Compressor Maintenance</h3>
      <p>Air quality directly affects finish quality:</p>
      <ul>
        <li>Oil and filter change intervals</li>
        <li>Moisture trap maintenance</li>
        <li>Pressure regulator calibration</li>
        <li>Tank drainage procedures</li>
      </ul>
      
      <h3>Booth Filter Management</h3>
      <p>Clean airflow is essential for quality finishes:</p>
      <ul>
        <li>Intake filter replacement schedules</li>
        <li>Exhaust filter monitoring</li>
        <li>Pressure differential measurements</li>
        <li>Filter disposal procedures</li>
      </ul>
    `
  },
  {
    id: 6,
    title: "Troubleshooting Paint Defects",
    description: "Identify, prevent, and correct common automotive paint defects for flawless finishes.",
    icon: React.createElement(BookOpen, { className: "h-6 w-6 text-indigo-500" }),
    category: "troubleshooting",
    readTime: "13 min read",
    difficulty: "Advanced",
    content: `
      <h2>Paint Defect Analysis and Correction</h2>
      <p>Understanding paint defects helps achieve consistent, professional results.</p>
      
      <h3>Application Defects</h3>
      <p>Common issues during spray application:</p>
      <ul>
        <li>Orange peel - causes and prevention</li>
        <li>Runs and sags - technique adjustments</li>
        <li>Dry spray - environmental factors</li>
        <li>Overspray - masking and technique</li>
      </ul>
      
      <h3>Surface Contamination</h3>
      <p>Identifying and preventing contamination issues:</p>
      <ul>
        <li>Fisheyes from silicone contamination</li>
        <li>Crawling from surface preparation issues</li>
        <li>Crater formation and remediation</li>
        <li>Dirt and debris prevention</li>
      </ul>
      
      <h3>Curing and Adhesion Problems</h3>
      <p>Long-term durability concerns:</p>
      <ul>
        <li>Poor adhesion between coats</li>
        <li>Solvent popping and blistering</li>
        <li>Color mismatch after curing</li>
        <li>Gloss variation and mottling</li>
      </ul>
    `
  }
];

export const autoBodyCategories = [
  { id: "all", name: "All Articles", count: autoBodyArticles.length },
  { id: "paint-systems", name: "Paint Systems", count: autoBodyArticles.filter(a => a.category === "paint-systems").length },
  { id: "color-matching", name: "Color Matching", count: autoBodyArticles.filter(a => a.category === "color-matching").length },
  { id: "safety-compliance", name: "Safety & Compliance", count: autoBodyArticles.filter(a => a.category === "safety-compliance").length },
  { id: "surface-prep", name: "Surface Preparation", count: autoBodyArticles.filter(a => a.category === "surface-prep").length },
  { id: "equipment-maintenance", name: "Equipment Maintenance", count: autoBodyArticles.filter(a => a.category === "equipment-maintenance").length },
  { id: "troubleshooting", name: "Troubleshooting", count: autoBodyArticles.filter(a => a.category === "troubleshooting").length }
];
