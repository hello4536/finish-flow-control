
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaintBucket, Brush, Sparkles, Shield, Car, SprayCan, Wrench, CarFront } from "lucide-react";

const AutoBodyFinishing = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const articles = [
    {
      title: "Paint Booth Setup & Maintenance",
      description: "Best practices for setting up and maintaining a professional auto body paint booth.",
      icon: <Car className="h-6 w-6 text-blue-500" />,
      category: "equipment",
      content: `
        <h2 class="text-2xl font-bold mb-4">Professional Paint Booth Setup & Maintenance</h2>

        <p class="mb-4">A properly maintained paint booth is essential for achieving high-quality automotive finishes. This guide covers everything from initial setup to regular maintenance procedures.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Booth Setup Essentials</h3>
        
        <p class="mb-4">When setting up your paint booth, consider these critical factors:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>Proper Ventilation:</strong> Ensure your booth has adequate air flow (minimum 80-100 feet per minute) for proper paint atomization and overspray removal.</li>
          <li class="mb-2"><strong>Lighting:</strong> Install high CRI (Color Rendering Index) lights at 45-degree angles to eliminate shadows and ensure color accuracy.</li>
          <li class="mb-2"><strong>Filtration:</strong> Use multi-stage filtration systems with intake and exhaust filters rated for automotive refinishing.</li>
          <li class="mb-2"><strong>Temperature Control:</strong> Maintain consistent temperature (70-75°F) and humidity levels (50-60%) for optimal paint curing.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Regular Maintenance Schedule</h3>
        
        <p class="mb-4">Follow this maintenance schedule to keep your booth operating at peak efficiency:</p>
        
        <h4 class="text-lg font-medium mb-2">Daily Tasks</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Remove floor paper and replace if needed</li>
          <li>Wipe down walls to remove overspray</li>
          <li>Check air pressure gauges and filter indicators</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">Weekly Tasks</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Clean light fixtures</li>
          <li>Inspect intake filters</li>
          <li>Check booth pressure balance</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">Monthly Tasks</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Replace intake filters as needed</li>
          <li>Check exhaust fan belt tension</li>
          <li>Inspect door seals and gaskets</li>
          <li>Test emergency systems</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">Quarterly Tasks</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Replace exhaust filters</li>
          <li>Calibrate temperature and humidity controls</li>
          <li>Service air make-up units</li>
          <li>Clean ductwork as needed</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Troubleshooting Common Issues</h3>
        
        <p class="mb-4">Be aware of these common booth problems and their solutions:</p>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-3">
            <strong>Poor Air Flow</strong>
            <p>Causes: Clogged filters, fan issues, or ductwork obstructions</p>
            <p>Solution: Check and replace filters, inspect fan motors, and clean ductwork</p>
          </li>
          <li class="mb-3">
            <strong>Inconsistent Lighting</strong>
            <p>Causes: Burnt-out bulbs, dust accumulation, or incorrect positioning</p>
            <p>Solution: Replace bulbs regularly, clean fixtures weekly, and confirm proper angle positioning</p>
          </li>
          <li class="mb-3">
            <strong>Contamination Issues</strong>
            <p>Causes: Booth cleanliness problems, air leaks, or filter bypass</p>
            <p>Solution: Implement stricter cleaning protocols, seal any leaks, and ensure filters are properly seated</p>
          </li>
        </ol>

        <p class="mt-6 text-blue-700 font-medium">Remember: A well-maintained paint booth not only produces better finishes but also provides a safer working environment and extends the life of your equipment.</p>
      `
    }, 
    {
      title: "Color Matching Techniques",
      description: "Learn how to achieve perfect color matches for automotive paint repairs.",
      icon: <PaintBucket className="h-6 w-6 text-blue-500" />,
      category: "painting",
      content: `
        <h2 class="text-2xl font-bold mb-4">Color Matching Techniques for Perfect Automotive Repairs</h2>

        <p class="mb-4">Color matching is one of the most challenging aspects of automotive refinishing. This guide explores advanced techniques for achieving seamless repairs that are undetectable to the customer.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Understanding Color Theory for Automotive Paints</h3>
        
        <p class="mb-4">Before attempting color matching, master these fundamental color concepts:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>Hue:</strong> The actual color (red, blue, etc.)</li>
          <li class="mb-2"><strong>Value:</strong> The lightness or darkness of the color</li>
          <li class="mb-2"><strong>Chroma:</strong> The intensity or saturation of the color</li>
          <li class="mb-2"><strong>Flop:</strong> How the color changes when viewed from different angles</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">The Color Matching Process</h3>
        
        <h4 class="text-lg font-medium mb-2">1. Identify the Original Color Code</h4>
        <p class="mb-4">Always start with the vehicle's color code, typically found on the VIN plate or door jamb sticker. This provides the baseline formula for your match.</p>
        
        <h4 class="text-lg font-medium mb-2">2. Assess Vehicle Condition Factors</h4>
        <p class="mb-4">Consider these variables that affect the actual color:</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Age (paint oxidation and fading)</li>
          <li>Previous repairs</li>
          <li>Environmental exposure (sun damage, acid rain)</li>
          <li>Surface condition</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">3. Spray Out Test Cards</h4>
        <p class="mb-4">Create multiple test cards with slight variations to find the best match:</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Use the same application method you'll use on the vehicle</li>
          <li>Create a blendable edge on each card</li>
          <li>Allow for proper flash and cure times</li>
          <li>Label each variation clearly</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">4. Evaluate in Multiple Light Sources</h4>
        <p class="mb-4">Check your test cards against the vehicle in these lighting conditions:</p>
        <ul class="list-disc pl-6 mb-4">
          <li>Direct sunlight</li>
          <li>Shade</li>
          <li>Fluorescent lighting</li>
          <li>LED lighting</li>
          <li>Color-corrected booth lighting</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Advanced Color Correction Techniques</h3>
        
        <p class="mb-4">Use these tinting principles to adjust your base color:</p>
        
        <table class="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">To Adjust</th>
              <th class="border border-gray-300 px-4 py-2">Add Toner</th>
              <th class="border border-gray-300 px-4 py-2">Effect</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Too Yellow</td>
              <td class="border border-gray-300 px-4 py-2">Violet or Blue</td>
              <td class="border border-gray-300 px-4 py-2">Neutralizes yellow cast</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Too Red</td>
              <td class="border border-gray-300 px-4 py-2">Green</td>
              <td class="border border-gray-300 px-4 py-2">Neutralizes red cast</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Too Blue</td>
              <td class="border border-gray-300 px-4 py-2">Orange or Yellow</td>
              <td class="border border-gray-300 px-4 py-2">Neutralizes blue cast</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Too Dark</td>
              <td class="border border-gray-300 px-4 py-2">White or Silver</td>
              <td class="border border-gray-300 px-4 py-2">Lightens overall value</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Too Light</td>
              <td class="border border-gray-300 px-4 py-2">Black</td>
              <td class="border border-gray-300 px-4 py-2">Darkens overall value</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-xl font-semibold mb-3 mt-6">Blending Techniques for Invisible Repairs</h3>
        
        <p class="mb-4">Even with perfect color matching, proper blending is essential:</p>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-3">
            <strong>Panel Mapping</strong>
            <p>Plan your blend into adjacent panels at natural break points</p>
          </li>
          <li class="mb-3">
            <strong>Stepped Reduction</strong>
            <p>Use progressively higher reduction ratios as you move away from the repair area</p>
          </li>
          <li class="mb-3">
            <strong>Mist Coats</strong>
            <p>Apply light, dry mist coats at the blend edges</p>
          </li>
          <li class="mb-3">
            <strong>Clearcoat Extension</strong>
            <p>Extend clearcoat 2-3 inches beyond the basecoat blend area</p>
          </li>
        </ol>

        <p class="mt-6 text-blue-700 font-medium">Pro Tip: Keep detailed records of your successful color matches, including the vehicle information, lighting conditions, and specific adjustments made. This creates a valuable reference library for future repairs.</p>
      `
    },
    {
      title: "Surface Preparation for Auto Paint",
      description: "Essential steps for preparing automotive surfaces before applying paint.",
      icon: <Sparkles className="h-6 w-6 text-blue-500" />,
      category: "preparation",
      content: `
        <h2 class="text-2xl font-bold mb-4">Surface Preparation: The Foundation of Quality Auto Paint Jobs</h2>

        <p class="mb-4">Surface preparation is the most critical factor in determining the quality and longevity of an automotive finish. This comprehensive guide covers the essential steps for achieving a perfect foundation for your paint application.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Initial Assessment and Planning</h3>
        
        <p class="mb-4">Begin with a thorough assessment of the substrate:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>Identify Damage Types:</strong> Distinguish between scratches, dents, rust, previous repairs, and factory defects.</li>
          <li class="mb-2"><strong>Determine Repair Strategy:</strong> Decide whether each area requires filling, priming, sanding, or full replacement.</li>
          <li class="mb-2"><strong>Document Pre-Existing Conditions:</strong> Take photos of problem areas before beginning work.</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Surface Cleaning Procedure</h3>
        
        <p class="mb-4">Follow this sequence for thorough decontamination:</p>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-2">
            <strong>Initial Wash</strong>
            <p>Use automotive soap and water to remove loose dirt and debris.</p>
          </li>
          <li class="mb-2">
            <strong>Degreasing</strong>
            <p>Apply a wax and grease remover to eliminate oils, silicones, and other contaminants.</p>
            <p class="text-sm italic">Recommendation: Use lint-free cloths and the two-rag method—one wet with solvent, one clean and dry.</p>
          </li>
          <li class="mb-2">
            <strong>Clay Bar Treatment</strong>
            <p>Remove embedded contaminants by using an automotive clay bar with lubricant.</p>
          </li>
          <li class="mb-2">
            <strong>Final Pre-Sand Cleaning</strong>
            <p>Wipe down with a tack cloth to remove any remaining dust or debris.</p>
          </li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-6">Progressive Sanding Technique</h3>
        
        <p class="mb-4">Use this progression of grits for optimal results:</p>
        
        <table class="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">Grit</th>
              <th class="border border-gray-300 px-4 py-2">Purpose</th>
              <th class="border border-gray-300 px-4 py-2">Tools</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">80-180</td>
              <td class="border border-gray-300 px-4 py-2">Heavy material removal, rust elimination</td>
              <td class="border border-gray-300 px-4 py-2">DA sander, sanding block</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">220-320</td>
              <td class="border border-gray-300 px-4 py-2">Body filler shaping and feathering</td>
              <td class="border border-gray-300 px-4 py-2">DA sander, soft interface pad</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">400-600</td>
              <td class="border border-gray-300 px-4 py-2">Primer preparation and leveling</td>
              <td class="border border-gray-300 px-4 py-2">DA sander, wet sanding</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">800-1000</td>
              <td class="border border-gray-300 px-4 py-2">Final primer surfacing</td>
              <td class="border border-gray-300 px-4 py-2">Wet sanding, ultra-fine block</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">1200+</td>
              <td class="border border-gray-300 px-4 py-2">Blend area preparation</td>
              <td class="border border-gray-300 px-4 py-2">Wet sanding, foam pad</td>
            </tr>
          </tbody>
        </table>

        <div class="bg-blue-50 p-4 rounded-md mb-4">
          <p class="font-medium text-blue-800">Sanding Tip: Always sand in a cross-pattern (north-south, then east-west) to ensure uniform material removal and to easily identify low or high spots.</p>
        </div>

        <h3 class="text-xl font-semibold mb-3 mt-6">Body Filler Application Best Practices</h3>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2">Always apply filler to bare, scuffed metal—never over primer or paint</li>
          <li class="mb-2">Mix hardener thoroughly (marble-like appearance with no streaks)</li>
          <li class="mb-2">Apply in thin layers rather than one thick application</li>
          <li class="mb-2">Allow proper curing time between coats</li>
          <li class="mb-2">Work from the center outward when spreading</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Primer Selection and Application</h3>
        
        <p class="mb-4">Choose the right primer for your specific needs:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-3">
            <strong>Epoxy Primer</strong>
            <p>Use for bare metal and as a sealer coat for superior adhesion and corrosion resistance</p>
          </li>
          <li class="mb-3">
            <strong>High-Build Primer</strong>
            <p>Use to fill minor imperfections and sand scratches</p>
          </li>
          <li class="mb-3">
            <strong>Self-Etching Primer</strong>
            <p>Use for aluminum and bare metal areas that require etching for adhesion</p>
          </li>
          <li class="mb-3">
            <strong>Urethane Primer-Sealer</strong>
            <p>Use as a final primer coat before color application</p>
          </li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Final Pre-Paint Preparation</h3>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-2">Mask all areas not being painted with quality automotive masking tape</li>
          <li class="mb-2">Perform a final cleaning with a tack cloth followed by an anti-static wipe</li>
          <li class="mb-2">Apply a pre-paint sealer if recommended for the paint system being used</li>
          <li class="mb-2">Ensure proper temperature and humidity levels before proceeding to paint</li>
        </ol>

        <div class="bg-amber-50 p-4 rounded-md mb-4 mt-6">
          <p class="font-medium text-amber-800">Critical Safety Note: Always wear appropriate PPE when sanding and preparing surfaces. Respiratory protection is essential, as automotive dust contains hazardous materials.</p>
        </div>

        <p class="mt-6 text-blue-700 font-medium">Remember: The quality of your prep work directly determines the quality of your finish. Taking shortcuts during surface preparation will always be visible in the final result.</p>
      `
    },
    {
      title: "Clear Coat Application Guide",
      description: "Step-by-step instructions for achieving a flawless clear coat finish.",
      icon: <Brush className="h-6 w-6 text-blue-500" />,
      category: "painting",
      content: `
        <h2 class="text-2xl font-bold mb-4">Clear Coat Application Guide: Achieving Show-Quality Finishes</h2>

        <p class="mb-4">The clear coat is what gives a professional automotive finish its depth, gloss, and protection. This comprehensive guide covers everything from selection to application techniques for flawless results.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Understanding Clear Coat Systems</h3>
        
        <p class="mb-4">Modern automotive clear coats come in several formulations, each with specific characteristics:</p>
        
        <table class="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">Type</th>
              <th class="border border-gray-300 px-4 py-2">Characteristics</th>
              <th class="border border-gray-300 px-4 py-2">Best For</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Urethane</td>
              <td class="border border-gray-300 px-4 py-2">Excellent durability, chemical resistance</td>
              <td class="border border-gray-300 px-4 py-2">Standard repairs, overall refinishing</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Polyurethane</td>
              <td class="border border-gray-300 px-4 py-2">Superior hardness, outstanding gloss</td>
              <td class="border border-gray-300 px-4 py-2">Show cars, custom finishes</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Acrylic Urethane</td>
              <td class="border border-gray-300 px-4 py-2">Good balance of properties, easier application</td>
              <td class="border border-gray-300 px-4 py-2">Production environments, blending</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Ceramic Clear</td>
              <td class="border border-gray-300 px-4 py-2">Extreme hardness, heat resistance</td>
              <td class="border border-gray-300 px-4 py-2">High-end custom work, racing applications</td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-xl font-semibold mb-3 mt-6">Pre-Application Preparation</h3>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-3">
            <strong>Basecoat Verification</strong>
            <p>Ensure basecoat is fully flashed off (follow manufacturer's recommendation, typically 15-30 minutes)</p>
            <p>Check for uniform color coverage and dry metallic/pearl orientation</p>
          </li>
          <li class="mb-3">
            <strong>Environmental Controls</strong>
            <p>Verify booth temperature (70-75°F / 21-24°C ideal)</p>
            <p>Check humidity levels (50-60% optimal)</p>
            <p>Ensure proper air movement and filtering</p>
          </li>
          <li class="mb-3">
            <strong>Product Preparation</strong>
            <p>Mix according to exact manufacturer ratios—never estimate</p>
            <p>Strain clear coat through fine filters to remove contaminants</p>
            <p>Allow mixed product to "sweat" for 5-10 minutes before application</p>
          </li>
          <li class="mb-3">
            <strong>Equipment Setup</strong>
            <p>Select appropriate spray gun (HVLP recommended)</p>
            <p>Choose correct fluid tip size (typically 1.3-1.4mm)</p>
            <p>Set gun pressure according to manufacturer's specifications</p>
          </li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-6">Application Technique: The Three-Coat Method</h3>
        
        <div class="bg-blue-50 p-4 rounded-md mb-6">
          <p class="italic">This method produces exceptional depth and gloss while minimizing orange peel and maximizing durability.</p>
        </div>
        
        <h4 class="text-lg font-medium mb-2">1. First Coat: Light/Medium "Tack Coat"</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Apply at 70-75% coverage</li>
          <li>Gun distance: 8-10 inches from surface</li>
          <li>Gun angle: Perpendicular (90°) to surface</li>
          <li>Move at consistent speed (2-3 feet per second)</li>
          <li>Flash time: 5-10 minutes before next coat</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">2. Second Coat: Medium "Build Coat"</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Apply at 95-100% coverage</li>
          <li>Gun distance: 6-8 inches from surface</li>
          <li>Focus on even application and wet appearance</li>
          <li>Flash time: 10-15 minutes before final coat</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">3. Third Coat: Medium-Wet "Flow Coat"</h4>
        <ul class="list-disc pl-6 mb-4">
          <li>Apply slightly wetter than second coat</li>
          <li>Gun distance: 6-8 inches from surface</li>
          <li>Slow down application speed slightly</li>
          <li>Focus on achieving maximum gloss and leveling</li>
        </ul>

        <div class="bg-amber-50 p-4 rounded-md mb-4 mt-2">
          <p class="font-medium text-amber-800">Warning: Applying clear coat too heavily can cause solvent pop, sags, and extended cure times. It's better to apply additional thin-to-medium coats than fewer heavy coats.</p>
        </div>

        <h3 class="text-xl font-semibold mb-3 mt-6">Gun Movement Patterns</h3>
        
        <p class="mb-4">Use these spray patterns for optimal results:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>50% Overlap:</strong> Each pass should overlap the previous by 50%</li>
          <li class="mb-2"><strong>Cross-Coating:</strong> Apply first series of passes horizontally, second series vertically</li>
          <li class="mb-2"><strong>Edge-First Technique:</strong> Start at edges and work toward the center of panels</li>
          <li class="mb-2"><strong>Trigger Control:</strong> Begin moving the gun before pulling the trigger, release before stopping</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Post-Application Handling</h3>
        
        <p class="mb-4">Follow these steps after clear coat application:</p>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-2">Allow for full "dust-free" dry time (typically 30-60 minutes) before moving vehicle</li>
          <li class="mb-2">Maintain temperature for proper curing (usually 24-48 hours minimum)</li>
          <li class="mb-2">Do not tape, wash, or polish for manufacturer's recommended cure time (typically 5-7 days)</li>
          <li class="mb-2">If defect removal is required, wait at least 24 hours before wet sanding or buffing</li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-6">Troubleshooting Common Clear Coat Issues</h3>
        
        <table class="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">Issue</th>
              <th class="border border-gray-300 px-4 py-2">Cause</th>
              <th class="border border-gray-300 px-4 py-2">Prevention/Solution</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Orange Peel</td>
              <td class="border border-gray-300 px-4 py-2">Improper viscosity, gun setup, or technique</td>
              <td class="border border-gray-300 px-4 py-2">Adjust viscosity, increase atomization pressure, proper gun distance</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Solvent Pop</td>
              <td class="border border-gray-300 px-4 py-2">Trapped solvents, excessive film build</td>
              <td class="border border-gray-300 px-4 py-2">Proper flash times, thinner coats, appropriate hardener speed</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Fish Eyes</td>
              <td class="border border-gray-300 px-4 py-2">Surface contamination (silicone, oil)</td>
              <td class="border border-gray-300 px-4 py-2">Thorough surface prep, fish eye eliminator additive</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Dieback (Dulling)</td>
              <td class="border border-gray-300 px-4 py-2">Improper mixing, humidity issues</td>
              <td class="border border-gray-300 px-4 py-2">Proper mixing ratios, environmental control, quality reducers</td>
            </tr>
          </tbody>
        </table>

        <p class="mt-6 text-blue-700 font-medium">Pro Tip: Create a clear coat test panel alongside each job to test polishing techniques before working on the actual vehicle. This helps prevent damage during the final finishing process.</p>
      `
    },
    {
      title: "Paint Defect Troubleshooting",
      description: "Identifying and fixing common auto paint problems like orange peel, fish eye, and runs.",
      icon: <Shield className="h-6 w-6 text-blue-500" />,
      category: "troubleshooting",
      content: `
        <h2 class="text-2xl font-bold mb-4">Paint Defect Troubleshooting: Diagnose and Fix Common Problems</h2>

        <p class="mb-4">Even experienced refinishers encounter paint defects. This guide will help you identify, prevent, and remedy the most common automotive paint problems.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Understanding Paint Defect Categories</h3>
        
        <p class="mb-4">Paint defects typically fall into four main categories:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>Application Defects:</strong> Runs, sags, orange peel, dry spray</li>
          <li class="mb-2"><strong>Contamination Defects:</strong> Dirt nibs, fish eyes, cratering</li>
          <li class="mb-2"><strong>Environmental Defects:</strong> Water spots, humidity issues, drying problems</li>
          <li class="mb-2"><strong>Material Defects:</strong> Peeling, adhesion failures, color mismatches</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Common Defects: Causes and Solutions</h3>
        
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 bg-blue-100 p-2">1. Runs and Sags</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-bold mb-1">Causes:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Excessive paint applied</li>
                <li>Gun held too close to surface</li>
                <li>Moving too slowly during application</li>
                <li>Paint viscosity too thin</li>
                <li>Improper reducer/thinner selection</li>
                <li>Insufficient flash time between coats</li>
              </ul>
            </div>
            
            <div>
              <p class="font-bold mb-1">Prevention:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Maintain proper gun distance (6-8 inches)</li>
                <li>Use consistent movement speed</li>
                <li>Apply thinner coats with proper flash time</li>
                <li>Check viscosity before application</li>
                <li>Use appropriate reducer for conditions</li>
              </ul>
            </div>
          </div>
          
          <p class="font-bold mb-1">Repair Methods:</p>
          <ol class="list-decimal pl-6 mb-2">
            <li>Allow paint to fully cure</li>
            <li>Sand defect with 800-1000 grit until level</li>
            <li>Progress to 1500-2000 grit for final smoothing</li>
            <li>Compound and polish, or</li>
            <li>Reapply clear coat if sanding breaks through</li>
          </ol>
        </div>
        
        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 bg-blue-100 p-2">2. Orange Peel</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-bold mb-1">Causes:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Improper gun setup (air pressure/fluid adjustment)</li>
                <li>Incorrect viscosity</li>
                <li>Wrong reducer/thinner selection</li>
                <li>Gun held too far from surface</li>
                <li>Paint too cold during application</li>
              </ul>
            </div>
            
            <div>
              <p class="font-bold mb-1">Prevention:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Set proper atomization pressure</li>
                <li>Adjust fluid delivery rate</li>
                <li>Use correct tip size for material</li>
                <li>Ensure material is at recommended temperature</li>
                <li>Mix paint to proper viscosity</li>
              </ul>
            </div>
          </div>
          
          <p class="font-bold mb-1">Repair Methods:</p>
          <ol class="list-decimal pl-6 mb-2">
            <li>Progressive wet sanding: 1200 → 1500 → 2000 → 2500 grit</li>
            <li>Machine compounding with diminishing abrasives</li>
            <li>Final polishing with ultra-fine polish</li>
            <li>For severe cases, reapplication may be necessary</li>
          </ol>
        </div>

        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 bg-blue-100 p-2">3. Fish Eyes / Cratering</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-bold mb-1">Causes:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Silicone or oil contamination</li>
                <li>Residual wax or polish</li>
                <li>Compressed air contamination</li>
                <li>Cross-contamination from shop environment</li>
                <li>Previous improper repairs</li>
              </ul>
            </div>
            
            <div>
              <p class="font-bold mb-1">Prevention:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Thorough surface cleaning with wax/grease remover</li>
                <li>Use clean air supply with proper filtration</li>
                <li>Control shop environment and separate prep/spray areas</li>
                <li>Keep silicone products out of paint shop</li>
                <li>Use anti-fish eye additive in contaminated environments</li>
              </ul>
            </div>
          </div>
          
          <p class="font-bold mb-1">Repair Methods:</p>
          <ol class="list-decimal pl-6 mb-2">
            <li>Allow to fully cure, then sand smooth</li>
            <li>Clean thoroughly with anti-silicone solvent</li>
            <li>Apply sealer before recoating</li>
            <li>Add fish-eye eliminator to new material (according to manufacturer specs)</li>
            <li>Reapply finish with proper technique</li>
          </ol>
        </div>

        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 bg-blue-100 p-2">4. Solvent Pop / Bubbling</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-bold mb-1">Causes:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Trapped solvents in paint film</li>
                <li>Excessive film thickness</li>
                <li>Insufficient flash time between coats</li>
                <li>Improper reducer/hardener selection for conditions</li>
                <li>Excessive booth temperatures</li>
                <li>Applying over uncured primer</li>
              </ul>
            </div>
            
            <div>
              <p class="font-bold mb-1">Prevention:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Apply proper film thickness (avoid heavy coats)</li>
                <li>Allow adequate flash time between coats</li>
                <li>Select appropriate reducer for temperature/humidity</li>
                <li>Ensure substrate is fully cured before topcoating</li>
                <li>Control booth temperature during application/curing</li>
              </ul>
            </div>
          </div>
          
          <p class="font-bold mb-1">Repair Methods:</p>
          <ol class="list-decimal pl-6 mb-2">
            <li>For minor cases: sand with 1200-1500 grit, compound and polish</li>
            <li>For severe cases: sand back to smooth surface</li>
            <li>Apply sealer if necessary</li>
            <li>Reapply finish using proper technique and environmental controls</li>
          </ol>
        </div>

        <div class="mb-6">
          <h4 class="text-lg font-medium mb-2 bg-blue-100 p-2">5. Dirt Nibs / Contamination</h4>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p class="font-bold mb-1">Causes:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Inadequate booth filtration</li>
                <li>Poor booth maintenance</li>
                <li>Improper painter preparation (clothing, hair)</li>
                <li>Dirty spray equipment</li>
                <li>Contaminated paint material</li>
                <li>Improper tack cloth use</li>
              </ul>
            </div>
            
            <div>
              <p class="font-bold mb-1">Prevention:</p>
              <ul class="list-disc pl-6 mb-2">
                <li>Maintain booth filtration systems</li>
                <li>Clean booth regularly</li>
                <li>Wear appropriate paint suits/head coverings</li>
                <li>Clean spray equipment thoroughly</li>
                <li>Strain all paint materials before use</li>
                <li>Use proper tack cloth technique</li>
              </ul>
            </div>
          </div>
          
          <p class="font-bold mb-1">Repair Methods:</p>
          <ol class="list-decimal pl-6 mb-4">
            <li>For small nibs:
              <ul class="list-disc pl-6 mb-2">
                <li>Denib with 1500 grit or denibbing tool</li>
                <li>Compound and polish</li>
              </ul>
            </li>
            <li>For extensive contamination:
              <ul class="list-disc pl-6 mb-2">
                <li>Sand with 1200-1500 grit</li>
                <li>Progress to finer grits (2000+)</li>
                <li>Compound and polish, or</li>
                <li>Recoat if necessary</li>
              </ul>
            </li>
          </ol>
        </div>

        <h3 class="text-xl font-semibold mb-3 mt-6">Systematic Defect Analysis Approach</h3>
        
        <p class="mb-4">When faced with a paint defect, follow this process for diagnosis and correction:</p>
        
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-2"><strong>Identify the Specific Defect</strong> - Precisely name what you're seeing</li>
          <li class="mb-2"><strong>Determine When It Occurred</strong> - During application, drying, or after cure</li>
          <li class="mb-2"><strong>Review Process Variables</strong> - Materials, equipment, techniques, environment</li>
          <li class="mb-2"><strong>Isolate Root Cause</strong> - Determine primary factor for defect</li>
          <li class="mb-2"><strong>Select Appropriate Repair Method</strong> - Based on severity and type</li>
          <li class="mb-2"><strong>Document Findings</strong> - Record what happened and how it was fixed</li>
          <li class="mb-2"><strong>Implement Prevention Measures</strong> - Change procedures to prevent recurrence</li>
        </ol>

        <div class="bg-blue-50 p-4 rounded-md mb-4">
          <p class="font-medium text-blue-800">Remember: The most efficient way to deal with paint defects is to prevent them through proper preparation, technique, and environmental control.</p>
        </div>

        <p class="mt-6 text-blue-700 font-medium">Pro Tip: Create a "defect library" with examples of common problems and their solutions. This visual reference can be invaluable for training and troubleshooting in your shop.</p>
      `
    },
    {
      title: "HVLP Spray Gun Techniques",
      description: "Master the use of HVLP spray guns for professional automotive finishes.",
      icon: <SprayCan className="h-6 w-6 text-blue-500" />,
      category: "equipment",
      content: `
        <h2 class="text-2xl font-bold mb-4">Mastering HVLP Spray Gun Techniques</h2>

        <p class="mb-4">High Volume Low Pressure (HVLP) spray guns have become the industry standard for automotive refinishing due to their superior transfer efficiency and reduced overspray. This guide covers everything from setup to advanced techniques.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Understanding HVLP Technology</h3>
        
        <p class="mb-4">HVLP spray guns operate at lower air pressure (typically 10 PSI or less at the air cap) while delivering higher volumes of air compared to conventional spray guns. This results in:</p>
        
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>Higher Transfer Efficiency:</strong> 65-80% of material reaches the surface (vs. 30-40% with conventional guns)</li>
          <li class="mb-2"><strong>Reduced Overspray:</strong> Less waste and cleaner work environment</li>
          <li class="mb-2"><strong>Better Compliance:</strong> Meets VOC regulations in most areas</li>
          <li class="mb-2"><strong>Improved Finish Quality:</strong> When properly set up and operated</li>
        </ul>

        <h3 class="text-xl font-semibold mb-3 mt-6">Spray Gun Components and Setup</h3>
        
        <h4 class="text-lg font-medium mb-2">Key Components</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p class="font-bold mb-1">Air Cap</p>
            <ul class="list-disc pl-6 mb-2">
              <li>Controls atomization pattern</li>
              <li>Different designs for different coatings</li>
              <li>Must be kept clean for optimal performance</li>
            </ul>
          </div>
          
          <div>
            <p class="font-bold mb-1">Fluid Tip</p>
            <ul class="list-disc pl-6 mb-2">
              <li>Determines material flow rate</li>
              <li>Size selection based on material viscosity</li>
              <li>Common sizes: 1.2-1.4mm (clear coat), 1.5-1.8mm (basecoat/primer)</li>
            </ul>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <p class="font-bold mb-1">Fluid Needle</p>
            <ul class="list-disc pl-6 mb-2">
              <li>Controls amount of material flow</li>
              <li>Must match fluid tip size</li>
              <li>Requires precise adjustment</li>
            </ul>
          </div>
          
          <div>
            <p class="font-bold mb-1">Air Control Valves</p>
            <ul class="list-disc pl-6 mb-2">
              <li>Regulates inlet air pressure</li>
              <li>Fan pattern control</li>
              <li>Some guns feature separate atomization control</li>
            </ul>
          </div>
        </div>

        <h4 class="text-lg font-medium mb-2">Setup and Adjustment</h4>
        
        <table class="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">Material</th>
              <th class="border border-gray-300 px-4 py-2">Fluid Tip</th>
              <th class="border border-gray-300 px-4 py-2">Air Pressure*</th>
              <th class="border border-gray-300 px-4 py-2">Fan Pattern</th>
              <th class="border border-gray-300 px-4 py-2">Fluid Adjustment</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Clear Coat</td>
              <td class="border border-gray-300 px-4 py-2">1.2-1.4mm</td>
              <td class="border border-gray-300 px-4 py-2">26-29 PSI (inlet)</td>
              <td class="border border-gray-300 px-4 py-2">Full</td>
              <td class="border border-gray-300 px-4 py-2">2-2.5 turns</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Basecoat</td>
              <td class="border border-gray-300 px-4 py-2">1.3-1.5mm</td>
              <td class="border border-gray-300 px-4 py-2">26-29 PSI (inlet)</td>
              <td class="border border-gray-300 px-4 py-2">75-100%</td>
              <td class="border border-gray-300 px-4 py-2">2-3 turns</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Primer</td>
              <td class="border border-gray-300 px-4 py-2">1.7-2.0mm</td>
              <td class="border border-gray-300 px-4 py-2">28-32 PSI (inlet)</td>
              <td class="border border-gray-300 px-4 py-2">100%</td>
              <td class="border border-gray-300 px-4 py-2">3-4 turns</td>
            </tr>
          </tbody>
        </table>
        <p class="text-sm italic mb-4">*Inlet pressure settings will vary by gun manufacturer and model. Always verify the manufacturer's recommendations.</p>

        <h3 class="text-xl font-semibold mb-3 mt-6">Spray Pattern Testing and Adjustment</h3>
        
        <p class="mb-4">Before spraying a vehicle, always perform pattern tests:</p>
        
        <ol class="list-decimal pl-6 mb-6">
          <li class="mb-3">
            <strong>Horizontal Line Test</strong>
            <p>Spray a horizontal line on test paper</p>
            <p>Pattern should be even with no heavy spots, tails, or fingering</p>
          </li>
          <li class="mb-3">
            <strong>Vertical Line Test</strong>
            <p>Spray a vertical line on test paper</p>
            <p>Check for consistency and pattern shape</p>
          </li>
          <li class="mb-3">
            <strong>Pattern Shape Analysis</strong>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-2">
              <div class="bg-gray-100 p-2 rounded">
                <p class="font-bold mb-1 text-center">Heavy Top</p>
                <p class="text-center mb-1">↓</p>
                <p class="text-sm">Fluid needle worn or damaged</p>
              </div>
              <div class="bg-gray-100 p-2 rounded">
                <p class="font-bold mb-1 text-center">Heavy Side</p>
                <p class="text-center mb-1">→ or ←</p>
                <p class="text-sm">Air horn hole clogged on opposite side</p>
              </div>
              <div class="bg-gray-100 p-2 rounded">
                <p class="font-bold mb-1 text-center">Heavy Center</p>
                <p class="text-center mb-1">●</p>
                <p class="text-sm">Too much fluid or too little air pressure</p>
              </div>
            </div>
          </li>
        </ol>

        <h3 class="text-xl font-semibold mb-3 mt-6">Professional Spray Techniques</h3>
        
        <h4 class="text-lg font-medium mb-2">Fundamental Principles</h4>
        <ul class="list-disc pl-6 mb-4">
          <li class="mb-2"><strong>Distance:</strong> Maintain 6-8 inches from surface (varies by material)</li>
          <li class="mb-2"><strong>Angle:</strong> Keep gun perpendicular (90°) to surface at all times</li>
          <li class="mb-2"><strong>Speed:</strong> Move at consistent speed (2-3 feet per second)</li>
          <li class="mb-2"><strong>Overlap:</strong> 50-75% overlap on each pass</li>
          <li class="mb-2"><strong>Triggering:</strong> Begin movement before pulling trigger, release before stopping</li>
        </ul>

        <h4 class="text-lg font-medium mb-2">Advanced Techniques for Different Panel Types</h4>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h5 class="font-medium mb-1">Horizontal Surfaces (Hoods, Roofs, Deck Lids)</h5>
            <ul class="list-disc pl-6 mb-2">
              <li>Work from front to back</li>
              <li>Use parallel passes with 50% overlap</li>
              <li>Consider "box method" for large panels:
                <ol class="list-decimal pl-6 mt-1">
                  <li>Spray outer perimeter first</li>
                  <li>Fill in center with parallel passes</li>
                  <li>Cross-coat for even coverage</li>
                </ol>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-medium mb-1">Vertical Surfaces (Doors, Quarters, Fenders)</h5>
            <ul class="list-disc pl-6 mb-2">
              <li>Work from top to bottom</li>
              <li>Use slightly faster passes to prevent runs</li>
              <li>Consider reducing fluid output</li>
              <li>Pay special attention to edges and character lines</li>
              <li>Cross-coat with horizontal passes if needed</li>
            </ul>
          </div>
        </div>

        <h4 class="text-lg font-medium mb-2">Technique Modifications for Different Materials</h4>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h5 class="font-medium mb-1">Metallic/Pearl Basecoats</h5>
            <ul class="list-disc pl-6 mb-2">
              <li>Apply first coats at normal 70-75% wetness</li>
              <li>Final "control coat" at 75-80% gun distance</li>
              <li>Reduce air pressure slightly for control coat</li>
              <li>Use consistent overlap for uniform metallic orientation</li>
            </ul>
          </div>
          
          <div>
            <h5 class="font-medium mb-1">Clear Coats</h5>
            <ul class="list-disc pl-6 mb-2">
              <li>Use medium-wet application</li>
              <li>Watch for proper flow and leveling</li>
              <li>Ensure full panel coverage</li>
              <li>Pay special attention to edges and runs</li>
              <li>Consider multiple medium coats vs. fewer heavy coats</li>
            </ul>
          </div>
        </div>

        <h3 class="text-xl font-semibold mb-3 mt-6">Maintenance and Troubleshooting</h3>
        
        <h4 class="text-lg font-medium mb-2">Daily Cleaning Procedure</h4>
        <ol class="list-decimal pl-6 mb-4">
          <li class="mb-1">Empty unused material back into container</li>
          <li class="mb-1">Rinse cup with appropriate solvent</li>
          <li class="mb-1">Fill cup partially with clean solvent</li>
          <li class="mb-1">Spray solvent through gun until clear</li>
          <li class="mb-1">Disconnect air supply</li>
          <li class="mb-1">Remove air cap and fluid tip</li>
          <li class="mb-1">Clean components with brush and solvent</li>
          <li class="mb-1">Reassemble when dry</li>
          <li class="mb-1">Add 2-3 drops of spray gun lubricant to air valve and fluid needle</li>
        </ol>

        <div class="bg-amber-50 p-4 rounded-md mb-4">
          <p class="font-medium text-amber-800">Never soak entire spray gun in solvent – this damages seals and lubricants, reducing gun life and performance.</p>
        </div>

        <h4 class="text-lg font-medium mb-2">Common Spray Issues and Fixes</h4>
        <table class="min-w-full border border-gray-300 mb-4">
          <thead>
            <tr>
              <th class="border border-gray-300 px-4 py-2">Problem</th>
              <th class="border border-gray-300 px-4 py-2">Possible Causes</th>
              <th class="border border-gray-300 px-4 py-2">Solutions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Spitting</td>
              <td class="border border-gray-300 px-4 py-2">Dried material in fluid tip, damaged needle, loose fluid tip</td>
              <td class="border border-gray-300 px-4 py-2">Clean thoroughly, replace worn parts, tighten fluid tip</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Fluttering Spray</td>
              <td class="border border-gray-300 px-4 py-2">Low material level, loose fluid tip, damaged fluid needle/tip</td>
              <td class="border border-gray-300 px-4 py-2">Refill cup, tighten connections, replace worn components</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Poor Atomization</td>
              <td class="border border-gray-300 px-4 py-2">Incorrect viscosity, low air pressure, wrong tip size</td>
              <td class="border border-gray-300 px-4 py-2">Adjust material, increase pressure, change to appropriate tip</td>
            </tr>
            <tr>
              <td class="border border-gray-300 px-4 py-2">Air Leaks</td>
              <td class="border border-gray-300 px-4 py-2">Damaged o-rings or seals, loose air valve</td>
              <td class="border border-gray-300 px-4 py-2">Replace seals, tighten components, lubricate properly</td>
            </tr>
          </tbody>
        </table>

        <p class="mt-6 text-blue-700 font-medium">Pro Tip: Invest in quality spray guns and maintain them meticulously. A well-maintained mid-range gun often outperforms an expensive gun that's poorly maintained.</p>
      `
    }
  ];

  const openArticle = (article) => {
    setSelectedArticle(article);
    setDialogOpen(true);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-blue-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Auto Body Finishing</h1>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto">
              Professional tips, techniques, and best practices for automotive paint and body work.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center mb-6">
              <TabsList className="bg-orange-100">
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="painting">Painting</TabsTrigger>
                <TabsTrigger value="equipment">Equipment</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                        {article.icon}
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{article.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => openArticle(article)}>Read Article</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {["preparation", "painting", "equipment", "troubleshooting"].map(category => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles.filter(article => article.category === category).map((article, index) => (
                    <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardHeader className="flex flex-row items-center gap-4 pb-2">
                        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                          {article.icon}
                        </div>
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base">{article.description}</CardDescription>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => openArticle(article)}>Read Article</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Get Professional Auto Body Tips</h2>
            <p className="text-blue-800 mb-4">Subscribe to receive industry insights, product reviews, and advanced techniques directly to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded border" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedArticle?.title}</DialogTitle>
            <DialogDescription className="text-base">{selectedArticle?.description}</DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div 
              className="prose prose-blue max-w-none" 
              dangerouslySetInnerHTML={{ __html: selectedArticle?.content }}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default AutoBodyFinishing;
