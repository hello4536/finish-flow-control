
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  PaintBucket, 
  Brush, 
  Sparkles, 
  Shield, 
  X, 
  Clock, 
  CheckSquare,
  HandSaw,
  FlaskConical
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

const WoodworkingFinishing = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: "Understanding Wood Stains",
      description: "Learn about different types of wood stains and how to choose the right one for your project.",
      icon: <PaintBucket className="h-6 w-6 text-orange-500" />,
      category: "staining",
      content: `
## Understanding Wood Stains

Wood staining is an essential technique for enhancing the natural beauty of wood while providing protection and color. Let's explore the different types of stains and how to select the right one for your specific project.

### Types of Wood Stains

#### Oil-Based Stains
**Characteristics:**
- Longer working time (20-30 minutes)
- Deep penetration into wood grain
- Rich, warm color
- More even application on difficult woods
- Requires mineral spirits for cleanup

**Best for:** Large projects where longer working time is beneficial, such as furniture pieces, cabinets, and floors.

#### Water-Based Stains
**Characteristics:**
- Quick drying (15-20 minutes)
- Lower VOCs (better for indoor use)
- Less odor
- Soap and water cleanup
- Wide color selection
- May raise wood grain, requiring additional sanding

**Best for:** Indoor projects, quick turnaround projects, and environments where low odor is important.

#### Gel Stains
**Characteristics:**
- Thick consistency prevents dripping
- Minimal penetration (sits more on surface)
- Excellent for difficult-to-stain woods
- More control over color intensity
- Great for vertical surfaces

**Best for:** Difficult woods like pine, maple, or birch; previously finished surfaces; vertical applications.

#### Dye Stains
**Characteristics:**
- Translucent, allowing wood grain to show
- Can be water, alcohol, or oil-based
- Very vibrant color options
- Penetrates deeply into wood fibers

**Best for:** Fine furniture, musical instruments, and when trying to match specific colors.

### How to Choose the Right Stain

1. **Consider the Wood Type**
   Different woods accept stain differently. Open-grained woods like oak and ash accept stain readily, while tight-grained woods like maple and cherry are more difficult to stain evenly.

2. **Assess Your Environment**
   Indoor projects may benefit from water-based stains due to lower VOCs and odor. Outdoor projects generally need the durability of oil-based stains.

3. **Desired Color Intensity**
   Test stains on scrap wood from your project to gauge final appearance. Remember that the same stain can look dramatically different on different wood species.

4. **Application Method**
   Consider your experience level and comfort with different application methods. Gel stains are more forgiving for beginners.

5. **Drying Time Requirements**
   Water-based stains dry faster, which can be beneficial for quick projects but challenging for large surfaces that require more working time.

### Pre-Staining Wood Preparation

1. **Sand thoroughly** - Start with coarser grit (80-100) and progress to finer grit (150-180)
2. **Remove all dust** - Use a vacuum, tack cloth, or compressed air
3. **Consider using a pre-stain wood conditioner** for blotch-prone woods like pine, maple, and birch
4. **Test your stain** on an inconspicuous area or scrap piece

Remember that the final appearance of your stained wood will depend on many factors including the type of wood, how it was prepared, application method, and the specific stain product used.
      `
    },
    {
      id: 2,
      title: "Applying Clear Finishes",
      description: "Step-by-step guide on applying clear coats, lacquers, and varnishes for professional results.",
      icon: <Brush className="h-6 w-6 text-orange-500" />,
      category: "clear-finishes",
      content: `
## Applying Clear Finishes

Clear finishes protect wood while enhancing its natural beauty. This guide will help you achieve professional results with various clear coating products.

### Types of Clear Finishes

#### Polyurethane
**Characteristics:**
- Very durable
- Water-resistant
- Available in oil-based and water-based formulations
- Sheen options: matte, satin, semi-gloss, gloss
- Oil-based has amber tone; water-based stays clear

**Application Notes:**
- Apply with high-quality brush, foam applicator, or spray
- Oil-based: 24+ hours between coats
- Water-based: 2-3 hours between coats
- Light sanding between coats (320-400 grit)
- 3 coats recommended for most applications

#### Lacquer
**Characteristics:**
- Fast-drying
- Excellent clarity
- Good scratch resistance
- Can be buffed to high sheen
- Not as water-resistant as polyurethane

**Application Notes:**
- Best applied by spray
- 1-2 hours between coats
- Light sanding between coats (320-400 grit)
- 3-5 thin coats ideal
- Good ventilation essential due to strong fumes

#### Shellac
**Characteristics:**
- Natural resin
- Fast-drying
- Excellent adhesion
- Good moisture barrier
- Limited heat and chemical resistance

**Application Notes:**
- Apply with brush, pad, or spray
- 1 hour between coats
- Light sanding between coats (320-400 grit)
- 3 coats recommended
- Can be dissolved/repaired with denatured alcohol

#### Danish Oil & Oil-Varnish Blends
**Characteristics:**
- Easy to apply
- Enhances grain
- Penetrates into wood
- Moderate durability
- Can be refreshed easily

**Application Notes:**
- Apply with cloth or brush
- Wipe off excess after 5-15 minutes
- 8-12 hours between coats
- 3 coats recommended
- Low build finish, lies within the wood

### Step-by-Step Application Process

#### Preparation
1. **Complete all staining** and ensure surface is fully dry
2. **Sand lightly** with fine-grit sandpaper (220-320)
3. **Remove all dust** thoroughly using a vacuum and tack cloth
4. **Set up in a dust-free environment** with good ventilation
5. **Strain finish** if it has particles or has been sitting for a long time

#### Application Techniques
1. **Brushing:**
   - Use high-quality synthetic brush for water-based finishes
   - Use natural bristle for oil-based finishes
   - Apply in thin, even coats
   - Brush with the grain
   - Maintain a wet edge to prevent lap marks

2. **Wiping:**
   - Use lint-free cloth
   - Apply in circular motion, then wipe off excess following the grain
   - Great for oils and oil-varnish blends

3. **Spraying:**
   - Provides smoothest finish
   - Requires proper equipment and ventilation
   - Apply thin coats to prevent runs
   - Maintain consistent distance from the surface

#### Between Coats
1. **Allow proper drying time** based on product instructions
2. **Sand lightly** with 320-400 grit sandpaper or 0000 steel wool
3. **Remove all dust** with tack cloth
4. **Apply next coat** within recommended time window

#### Final Coat
1. **Allow full curing time** (can be days to weeks depending on product)
2. **Buff with 0000 steel wool** for satin/semi-gloss sheen if desired
3. **Apply furniture wax** for additional protection and sheen control (optional)

### Troubleshooting Common Issues

1. **Bubbles:** Apply thinner coats; avoid shaking the finish; use proper brush technique
2. **Orange Peel:** Thin the finish; adjust spray settings; check environmental conditions
3. **Fish Eyes:** Clean surface thoroughly; use fish eye eliminator additive
4. **Brush Marks:** Use higher quality brush; thin finish slightly; consider different application method
5. **Dust Nibs:** Improve environment; sand between coats; use tack cloth effectively

With proper application techniques and attention to detail, you can achieve professional-quality clear finishes that both protect and beautify your woodworking projects.
      `
    },
    {
      id: 3,
      title: "Surface Preparation Techniques",
      description: "Master the art of wood preparation for flawless finishing results.",
      icon: <Sparkles className="h-6 w-6 text-orange-500" />,
      category: "preparation",
      content: `
## Surface Preparation Techniques

Proper surface preparation is the foundation of a successful finish. This article details the essential techniques for preparing wood surfaces to achieve professional results.

### Why Preparation Matters

The quality of your finish is directly related to how well the surface was prepared. Even the most expensive finishing products will fail on a poorly prepared surface. Proper preparation:

- Ensures even absorption of stains and finishes
- Reduces defects like blotching and uneven coloration
- Improves adhesion of topcoats
- Creates the foundation for a smooth, durable finish
- Reveals the true beauty of the wood

### Sanding Fundamentals

#### Grit Progression
Starting with the appropriate grit and progressing through finer grits is crucial:

1. **Rough Sanding (60-80 grit):**
   - Remove mill marks, glue residue, and major defects
   - Level uneven joints
   - Should be kept to a minimum to preserve wood thickness

2. **Medium Sanding (100-150 grit):**
   - Remove scratches from rough sanding
   - Begin smoothing the surface
   - Shape edges and curves

3. **Fine Sanding (180-220 grit):**
   - Final surface preparation for most projects
   - Creates smooth surface ready for finishing
   - Remove small imperfections

4. **Ultra-Fine Sanding (320-400+ grit):**
   - Used between finish coats
   - Creates ultra-smooth surfaces for high-gloss finishes
   - Not typically used on bare wood before finishing

#### Sanding Techniques

1. **With the Grain:**
   - Always sand in the direction of the wood grain
   - Cross-grain scratches will be visible under finish

2. **Consistent Pressure:**
   - Apply even pressure across the surface
   - Avoid pressing too hard, which creates uneven surfaces

3. **Systematic Coverage:**
   - Work methodically across surfaces
   - Overlap strokes by 50% to ensure complete coverage

4. **Power vs. Hand Sanding:**
   - Random orbit sanders minimize swirl marks
   - Hand sanding for final passes ensures the best surface
   - Sanding blocks help maintain flat surfaces

### Dealing with Specific Wood Preparation Challenges

#### End Grain
End grain absorbs much more stain than face grain, often appearing darker:
- Sand end grain to a finer grit (one or two levels higher)
- Consider applying a diluted sealer coat before staining
- Use a pre-stain wood conditioner on end grain

#### Soft Woods (Pine, Cedar, Fir)
These woods are prone to blotching and uneven stain absorption:
- Always use pre-stain wood conditioner
- Consider gel stains which sit more on the surface
- Sand to 180 grit maximum (finer grits can burnish soft woods)

#### Open-Grain Woods (Oak, Ash, Walnut)
These woods have visible pores that affect the finish:
- For smooth finish: fill grain with wood filler or grain filler
- For natural look: accept the texture of the pores
- Sand thoroughly between grain filling applications

#### Figured Woods (Curly Maple, Bird's Eye Maple)
Figured woods can develop torn grain during sanding:
- Use sharp scrapers instead of sandpaper where possible
- Sand at an angle to the grain in problem areas
- Use higher grits with light pressure

### Beyond Sanding

#### Scraping
Cabinet scrapers can produce a smoother surface than sandpaper:
- Effective on figured woods prone to tear-out
- Leaves surface ready for finishing with minimal dust
- Reduces total preparation time on many projects

#### Tackling Wood Defects
1. **Dents:** Steam with iron and damp cloth to raise fibers
2. **Small holes:** Fill with appropriate color wood filler
3. **Knots:** Seal with shellac to prevent bleed-through
4. **Tearout:** Back up cuts during planing; fill severe cases

#### Final Surface Cleaning
Before applying any finish:
1. Vacuum all dust from the surface
2. Wipe with tack cloth to remove fine particles
3. For open-grained woods, use compressed air to clean pores
4. Consider solvent wipe for oily woods (like teak or rosewood)

### Pre-Stain Treatments

#### Wood Conditioners
Essential for blotch-prone woods:
- Apply liberally and allow to penetrate for 5-15 minutes
- Wipe off excess thoroughly
- Apply stain within 2 hours while surface is still receptive
- Follow manufacturer's specific instructions

#### Washcoats
A diluted finish (typically shellac) that helps control stain absorption:
- Mix 1-pound cut shellac (1:8 ratio of flakes to denatured alcohol)
- Apply thin coat and let dry completely
- Sand lightly with 320 grit
- Stain will apply more evenly with controlled penetration

With proper surface preparation, you set the stage for a beautiful finish. Remember that the time spent in preparation is never wasted - it's an investment in the quality and durability of your final piece.
      `
    },
    {
      id: 4,
      title: "Water vs. Oil-Based Finishes",
      description: "Understand the differences, advantages, and applications of water and oil-based finishing products.",
      icon: <Shield className="h-6 w-6 text-orange-500" />,
      category: "materials",
      content: `
## Water vs. Oil-Based Finishes

Choosing between water-based and oil-based finishes is one of the most fundamental decisions in woodworking finishing. Each type has distinct characteristics that make it suitable for different applications.

### Oil-Based Finishes

#### Advantages
1. **Rich, Warm Appearance**
   - Imparts amber tone that enhances wood's natural color
   - Deepens and enriches wood grain patterns
   - Traditional look prized in fine furniture

2. **Working Time**
   - Longer open time allows for smoother application on large surfaces
   - More forgiving for beginners or complex projects
   - Can be manipulated longer before setting

3. **Durability**
   - Excellent resistance to water, heat, and solvents
   - More elastic, which helps with wood movement
   - Often preferred for high-wear surfaces like tables and floors

4. **Leveling Properties**
   - Superior self-leveling characteristics reduce brush marks
   - Flows out well, creating smoother surfaces

#### Disadvantages
1. **Drying Time**
   - Long dry time (8-24 hours between coats)
   - Full curing can take days to weeks
   - Dust contamination risk during extended drying

2. **Odor and VOCs**
   - Strong odors during application and drying
   - Higher VOC content (environmental and health concerns)
   - Requires good ventilation during use

3. **Cleanup**
   - Requires mineral spirits or paint thinner
   - More difficult to clean brushes and tools
   - More hazardous waste disposal

4. **Yellowing**
   - Continues to amber over time
   - Can impart unwanted tone to light-colored woods
   - May yellow white paints when used as primer

### Water-Based Finishes

#### Advantages
1. **Clear Appearance**
   - Minimal color impact on wood
   - Preserves natural look of light woods
   - Non-yellowing over time

2. **Quick Drying**
   - Touch dry in 30 minutes to 2 hours
   - Recoat in 2-3 hours
   - Projects completed faster
   - Less dust issues due to shorter open time

3. **Low Odor and VOCs**
   - Minimal smell during application
   - Lower environmental impact
   - Safer for indoor use, especially for those with sensitivities

4. **Easy Cleanup**
   - Soap and water cleanup while wet
   - Less hazardous waste
   - Easier tool maintenance

#### Disadvantages
1. **Application Challenges**
   - Shorter working time
   - Can raise wood grain requiring additional sanding
   - Less forgiving application window
   - More prone to lap marks and bubbles

2. **Durability Concerns**
   - Traditionally less resistant to heat and chemicals
   - May not hold up as well in high-moisture environments
   - Less scratch-resistant than oil-based (though modern formulations are improving)

3. **Wood Enhancement**
   - Less grain enhancement on dark woods
   - Can look "plastic-like" if over-applied
   - May require grain enhancer for deeper appearance

4. **Cold Weather Application**
   - Poor performance below 50°F (10°C)
   - Requires warmer application conditions
   - More affected by humidity extremes

### Best Applications

#### Oil-Based Finishes Work Best For:
- Antique restoration
- Dark or richly colored woods (walnut, mahogany, cherry)
- Traditional furniture
- Outdoor projects
- High-traffic flooring
- Areas with temperature fluctuations or high humidity
- Projects where maximum durability is essential

#### Water-Based Finishes Work Best For:
- Light-colored woods (maple, ash, birch)
- Contemporary furniture
- Children's furniture and toys
- Indoor projects with limited ventilation
- Projects requiring fast turnaround
- When minimal odor is required
- White or pastel painted surfaces

### Hybrid Approaches

Many woodworkers combine the benefits of both finish types:

1. **Oil-Based Stain + Water-Based Topcoat**
   - Rich color enhancement of oil stain
   - Quick drying and low odor of water-based clear coat
   - Allow oil-based stain to fully cure before top coating (72+ hours)

2. **Shellac As Intermediate Coat**
   - Use shellac as barrier coat between oil and water-based products
   - Ensures compatibility between different systems
   - Seals in oil-based products to prevent interaction

3. **Oil-Based Primer + Water-Based Paint**
   - Better adhesion of oil-based primer
   - Better color retention of water-based paint
   - Combines strengths of both systems

### Modern Developments

Technology has narrowed the performance gap between water and oil-based finishes:

- **Water-Based Urethanes** now offer durability approaching oil-based polyurethanes
- **Water-Borne Alkyds** combine water cleanup with oil-based performance
- **Hybrid Products** blend technologies for the best of both worlds

The choice between water and oil-based finishes should be based on your specific project requirements, working conditions, and desired results. Consider the wood species, project purpose, environmental conditions, and your personal preferences when making your selection.
      `
    },
    {
      id: 5,
      title: "Troubleshooting Common Finish Problems",
      description: "Solutions for common issues like blotching, bubbling, and uneven finish application.",
      icon: <Brush className="h-6 w-6 text-orange-500" />,
      category: "troubleshooting",
      content: `
## Troubleshooting Common Finish Problems

Even experienced woodworkers encounter finishing problems. This guide will help you identify, solve, and prevent the most common issues that arise during the finishing process.

### Blotchy Stain Application

#### Symptoms
- Uneven color absorption
- Dark spots and patches
- Mottled appearance, especially on pine, maple, cherry, and birch

#### Causes
- Uneven wood density
- Improper surface preparation
- Skipping pre-stain conditioner on blotch-prone woods
- Inconsistent application technique

#### Solutions
1. **Prevention:**
   - Apply pre-stain wood conditioner
   - Use gel stains instead of liquid stains
   - Consider using dye instead of pigmented stain
   - Test on scrap pieces from the same wood

2. **Fixing Existing Problems:**
   - Light sanding to remove some stain
   - Apply another layer of darker stain to even out appearance
   - In severe cases, strip and refinish
   - Use glazes or toners to even out color

### Bubbles in Finish

#### Symptoms
- Small or large air bubbles trapped in dried finish
- Rough surface texture
- Visible circular imperfections

#### Causes
- Shaking the finish container (instead of stirring)
- Applying too thick a coat
- Excessive brushing or overworking the finish
- High-humidity environment
- Using contaminated applicators

#### Solutions
1. **Prevention:**
   - Stir finish gently instead of shaking
   - Apply thin coats
   - Use proper brush technique (don't overwork)
   - Reduce humidity if possible
   - Use high-quality applicators

2. **Fixing Existing Problems:**
   - Sand smooth with fine sandpaper (320-400 grit)
   - Apply another thin coat
   - For severe cases, sand back and reapply properly
   - Consider switching to wipe-on technique

### Brush Marks and Streaks

#### Symptoms
- Visible lines in dried finish
- Uneven surface texture
- Ridges following brush direction

#### Causes
- Low-quality brushes
- Finish too thick or beginning to dry during application
- Improper brush technique
- Finish not self-leveling properly

#### Solutions
1. **Prevention:**
   - Use high-quality brushes appropriate for the finish
   - Thin finish according to manufacturer recommendations
   - Maintain "wet edge" while working
   - Apply in thin coats
   - Consider alternative application methods (spray, pad, wipe-on)

2. **Fixing Existing Problems:**
   - Level with fine sandpaper after fully curing
   - Apply another thin coat with proper technique
   - For deep brush marks, sand back and reapply

### Orange Peel (Textured Surface)

#### Symptoms
- Surface resembles the texture of an orange peel
- Uneven, slightly bumpy appearance
- Lacks smooth, glass-like finish

#### Causes
- Spraying: improper gun settings, technique, or thinning
- Rolling: using a roller with wrong nap
- Temperature too hot during application
- Finish drying too quickly

#### Solutions
1. **Prevention:**
   - Adjust spray gun settings (pressure, fluid, fan width)
   - Properly thin finish for spraying
   - Apply in optimal temperature and humidity
   - Use appropriate applicators

2. **Fixing Existing Problems:**
   - Wet sand with fine grit (600-1000) once cured
   - Polish with rubbing compound
   - In severe cases, sand back and reapply

### Dust Nibs and Contamination

#### Symptoms
- Small particles embedded in finish
- Rough texture when running hand over surface
- Visible specks in otherwise smooth finish

#### Causes
- Dusty environment
- Inadequate surface cleaning before application
- Airborne particles settling during drying
- Contaminated applicators

#### Solutions
1. **Prevention:**
   - Clean work area thoroughly before finishing
   - Damp down floor to reduce dust
   - Use air filtration system
   - Wipe surface with tack cloth before finishing
   - Work in dust-free environment when possible

2. **Fixing Existing Problems:**
   - Light sanding with fine sandpaper (320-400 grit)
   - Use a razor blade to carefully remove large particles
   - Apply another thin coat after surface is smooth
   - Consider rubbing out finish with steel wool and wax

### Fisheye (Crater-like Formations)

#### Symptoms
- Small, crater-like depressions in finish
- Finish pulling away from certain spots
- Circular patterns where finish won't flow together

#### Causes
- Surface contamination (silicone, oil, wax)
- Previous finishes containing silicone products
- Contaminants in shop air (from lubricants or polishes)

#### Solutions
1. **Prevention:**
   - Clean surface thoroughly with appropriate solvent
   - Avoid silicone-containing products in workshop
   - Add fisheye eliminator to finish

2. **Fixing Existing Problems:**
   - Sand back to bare wood in affected areas
   - Clean with appropriate solvents
   - Seal with shellac before applying new finish
   - Add fisheye eliminator to subsequent coats

### Finish Not Drying/Remaining Tacky

#### Symptoms
- Finish remains sticky or soft
- Never fully hardens
- Easily dented with fingernail

#### Causes
- High humidity
- Cold temperatures
- Applying too thick a coat
- Inadequate stirring of finish
- Product past its shelf life
- Contamination in finish

#### Solutions
1. **Prevention:**
   - Apply in appropriate temperature and humidity
   - Follow manufacturer's recommendations for coat thickness
   - Stir finish thoroughly before application
   - Use fresh product

2. **Fixing Existing Problems:**
   - If possible, move project to warmer, less humid environment
   - Allow extended drying time
   - For severe cases, remove finish and start over
   - Try wiping surface with appropriate solvent to remove excess finish

### Peeling or Poor Adhesion

#### Symptoms
- Finish flakes or peels away from wood
- Can be lifted with fingernail
- Separates from substrate in sheets or flakes

#### Causes
- Inadequate surface preparation
- Contamination on wood surface
- Incompatible finish layers
- Moisture in wood or environment
- Finishing over wax or silicone

#### Solutions
1. **Prevention:**
   - Sand properly before finishing
   - Clean surface thoroughly
   - Ensure compatibility between finish products
   - Check wood moisture content before finishing
   - Never apply over wax without removing it first

2. **Fixing Existing Problems:**
   - Remove all failing finish
   - Sand back to bare wood
   - Clean thoroughly
   - Start finishing process from beginning

### Runs and Sags

#### Symptoms
- Drips or curtains in vertical surfaces
- Thick, uneven areas in finish
- Wavy appearance in dried finish

#### Causes
- Applying too much finish
- Holding spray gun too close to surface
- Not catching drips during application
- Working in cold conditions (increases viscosity)

#### Solutions
1. **Prevention:**
   - Apply thin coats
   - Maintain proper distance when spraying
   - Check for runs during application and smooth them out
   - Work in appropriate temperatures

2. **Fixing Existing Problems:**
   - Wait until completely dry/cured
   - Sand level with fine sandpaper
   - Apply proper coat over sanded area
   - For severe runs, scrape while still wet with sharp edge

### Color Mismatch or Bleed-Through

#### Symptoms
- Unintended color showing through finish
- Stains from wood extractives appearing in finish
- Finish changing color over time

#### Causes
- Tannic acid in woods like oak or walnut
- Resinous knots in pine
- Dyes bleeding from exotic woods
- Chemical reaction between finish and wood extractives

#### Solutions
1. **Prevention:**
   - Seal knots with shellac sealer
   - Use stain-blocking primer
   - Apply washcoat of shellac on tannin-rich woods
   - Test finishes on scrap before full application

2. **Fixing Existing Problems:**
   - Apply barrier coat of shellac
   - For severe cases, strip finish and start with sealer coat
   - Use pigmented finish to hide discoloration

Remember that proper preparation, appropriate product selection, and good technique will prevent most finishing problems. When issues do occur, identifying the cause is the first step to finding an effective solution.
      `
    },
    {
      id: 6,
      title: "Spray Finishing for Beginners",
      description: "Getting started with spray equipment for professional-quality wood finishes.",
      icon: <PaintBucket className="h-6 w-6 text-orange-500" />,
      category: "techniques",
      content: `
## Spray Finishing for Beginners

Spray finishing can elevate your woodworking projects to professional quality when done correctly. This guide will help beginners understand the fundamentals of spray equipment and techniques.

### Benefits of Spray Finishing

- **Smooth, flawless finishes** without brush marks
- **Faster application** on large or complex projects
- **Even coverage** in hard-to-reach areas
- **Better efficiency** with most finishing materials
- **Professional-level results** achievable by hobbyists

### Types of Spray Equipment

#### HVLP (High Volume, Low Pressure)
**Best for:** Most woodworking projects, furniture, cabinets

**Characteristics:**
- Reduced overspray (better transfer efficiency)
- Good control for detailed work
- Less wasted material
- Lower pressure means less bounce-back

**Options:**
- **Turbine systems** (self-contained units, portable)
- **Conversion guns** (require separate air compressor)
- Cost range: $100-$1000+

#### Conventional Spray Guns
**Best for:** Large projects, production environments

**Characteristics:**
- Higher pressure than HVLP
- Faster coverage of large areas
- More overspray
- Requires significant air compressor capacity

**Cost range:** $50-$500+

#### Airless Sprayers
**Best for:** Large surfaces, thicker finishes

**Characteristics:**
- No air mixed with finish
- Very fast application
- Handles thicker materials easily
- Less control for fine work
- Higher pressure can lead to more overspray

**Cost range:** $300-$2000+

#### LVLP (Low Volume, Low Pressure)
**Best for:** Detail work, smaller projects

**Characteristics:**
- Even less air than HVLP
- Excellent transfer efficiency
- Works with smaller compressors
- Slower application than conventional systems

**Cost range:** $100-$400

### Entry-Level Recommendations

For beginners, these systems offer good value and performance:
1. **Earlex HVLP Spray Station** ($300-400) - Self-contained turbine system
2. **Wagner Control Spray** ($100-200) - Budget-friendly HVLP
3. **Fuji Semi-PRO 2** ($500-600) - Higher quality turbine system
4. **Harbor Freight HVLP** ($50-100) - Basic compressor-fed gun

### Essential Spray Equipment Components

1. **Spray Gun**
   - **Fluid Nozzle/Tip:** Determines flow rate and pattern size
   - **Air Cap:** Controls atomization and pattern shape
   - **Trigger:** Two-stage control for air and fluid
   - **Fluid Control Knob:** Adjusts material flow
   - **Pattern Control:** Changes spray pattern from round to fan
   - **Air Pressure Regulator:** Controls operating pressure

2. **Air Supply**
   - **Compressor:** Size matters - 2HP minimum for conventional, less for HVLP
   - **Air Filtration:** Essential for removing oil and moisture
   - **Pressure Regulator:** Maintains consistent pressure

3. **Accessories**
   - **Viscosity Cup:** Measures material thickness
   - **Strainers/Filters:** Removes particles from finish
   - **Cleaning Kit:** Brushes and tools for maintenance

### Setting Up Your Spray Area

1. **Ventilation**
   - **Essential for safety and finish quality**
   - Exhaust fan rated for finishing operations
   - Cross ventilation when possible
   - Consider a spray booth for regular finishing

2. **Lighting**
   - Bright, even illumination
   - Position to prevent shadows
   - Ideally from multiple angles

3. **Dust Control**
   - Damp floor to minimize dust
   - Clean area thoroughly before spraying
   - Consider air filtration system
   - Spray after all sanding is complete and dust has settled

4. **Safety Equipment**
   - **Respiratory protection:** NIOSH-approved respirator rated for finishing
   - **Eye protection:** Safety glasses or goggles
   - **Skin protection:** Nitrile gloves, coveralls
   - **Fire safety:** Proper solvent storage, fire extinguisher

### Preparing Finishes for Spraying

Most finishes require thinning for proper atomization:

1. **Water-Based Finishes**
   - Thin 5-10% with water or manufacturer's recommended thinner
   - Check viscosity with cup (typically 25-35 seconds)
   - Strain through fine filter

2. **Solvent-Based Finishes**
   - Lacquer: Thin 20-30% with lacquer thinner
   - Oil-based polyurethane: Thin 10-20% with mineral spirits
   - Always use compatible thinners

3. **Testing Consistency**
   - Use viscosity cup to measure flow rate
   - Follow manufacturer's recommendations
   - Test spray pattern on scrap material
   - Adjust thinning as needed

### Basic Spray Technique

1. **Gun Setup**
   - Distance: 6-8 inches from surface (check manufacturer's recommendation)
   - Pressure: Start low and increase until proper atomization
   - Pattern: Adjust to appropriate width for surface
   - Material flow: Start low and increase gradually

2. **Movement Fundamentals**
   - **Keep gun perpendicular** to surface
   - **Maintain consistent distance**
   - **Move in straight, parallel passes**
   - **Trigger off/on at beginning/end of each pass**
   - **Overlap each pass by 50%**
   - **Consistent speed** (too slow = runs, too fast = thin coverage)

3. **Practice Pattern**
   ![Spray Pattern Diagram]
   - Begin movement before triggering
   - Release trigger before stopping movement
   - Move at consistent speed (8-12 inches per second)
   - Practice on cardboard until consistent

### Spray Patterns for Different Surfaces

1. **Flat Surfaces**
   - Horizontal fan pattern
   - Parallel passes
   - Overlap by 50%

2. **Vertical Surfaces**
   - Horizontal passes (reduces runs)
   - Start at top, work down
   - Lighter coats to prevent sagging

3. **Inside Corners**
   - Spray corners first
   - Then adjacent surfaces
   - Use round pattern for tight areas

4. **Outside Edges**
   - Spray edges first
   - Then adjacent surfaces
   - Reduce material flow to prevent runs

### Troubleshooting Common Spray Issues

1. **Orange Peel (Textured Surface)**
   - **Causes:** Material too thick, pressure too low, moving too fast
   - **Solution:** Thin material, increase pressure, slow down movement

2. **Runs and Sags**
   - **Causes:** Too much material, moving too slow
   - **Solution:** Reduce fluid flow, increase speed, apply lighter coats

3. **Dry Spray/Dust**
   - **Causes:** Gun too far away, moving too fast
   - **Solution:** Move closer to surface, slow down, increase flow

4. **Uneven Coverage**
   - **Causes:** Inconsistent technique, improper overlap
   - **Solution:** Practice movement, maintain 50% overlap

5. **Clogging**
   - **Causes:** Inadequate straining, improper cleaning
   - **Solution:** Strain all materials, clean gun thoroughly after use

### Maintenance and Cleaning

Proper cleaning is essential for spray equipment longevity:

1. **Immediate After-Use Cleaning:**
   - Run appropriate solvent through gun until clear
   - Disassemble fluid nozzle and needle
   - Clean all passages with brush set
   - Wipe external surfaces
   - Never soak entire gun in solvent

2. **Deep Cleaning (Weekly if Used Regularly):**
   - Complete disassembly
   - Soak metal parts (not seals/gaskets)
   - Use gun cleaning kit with appropriate brushes
   - Inspect for wear or damage
   - Reassemble with light lubricant on threads and moving parts

3. **Storage:**
   - Store disassembled if not used regularly
   - Keep in dust-free environment
   - Leave small amount of gun oil in air passages

### Building Your Skills

1. **Start Simple:**
   - Practice on cardboard and scrap wood
   - Master flat surfaces before attempting complex shapes
   - Use forgiving finishes (water-based) while learning

2. **Systematic Approach:**
   - Focus on one variable at a time (distance, speed, flow)
   - Document successful settings for different materials
   - Create a spray log for repeatability

3. **Progressive Projects:**
   - Begin with simple boxes or panels
   - Graduate to more complex projects as skills improve
   - Experiment with different finishes as confidence grows

With practice and patience, spray finishing can transform your woodworking projects. Focus on proper setup, technique, and maintenance, and you'll achieve professional results that elevate your craftsmanship.
      `
    },
    {
      id: 7,
      title: "French Polishing Technique",
      description: "Learn the traditional technique of French polishing for a high-gloss, luxurious finish.",
      icon: <HandSaw className="h-6 w-6 text-orange-500" />,
      category: "techniques",
      content: `
## French Polishing Technique

French polishing is a traditional wood finishing technique that produces an exceptionally high-gloss, elegant surface. Developed in the 18th century, it remains one of the most beautiful—if labor-intensive—ways to finish fine furniture.

### What is French Polish?

French polish is not actually a product but a technique using shellac applied with a special rubbing pad. The process builds up many thin layers of shellac to create a deep, lustrous finish that enhances the wood's natural beauty. The result is:

- Incredible depth and clarity
- High gloss without appearing plastic
- Beautiful highlight of wood grain
- Tactile, warm feeling surface
- Historically authentic for period pieces

### Materials Needed

1. **Shellac Flakes**
   - Blonde (super blonde, blonde, or amber depending on desired color)
   - Fresh flakes produce best results
   - 1-2 lb cut (1-2 oz of flakes per 8 oz denatured alcohol)

2. **Denatured Alcohol**
   - 190 proof or higher
   - Free from additives or contaminants

3. **Rubbing Pads**
   - Outer wrap: Fine, lint-free cotton cloth (old t-shirts work well)
   - Inner core: Cotton wadding or cotton balls

4. **Oils**
   - Extra virgin olive oil (traditional)
   - Mineral oil (modern alternative)
   - Used as lubricant during application

5. **Abrasives**
   - Rottenstone or pumice powder (finest grade)
   - 600-1200 grit wet/dry sandpaper
   - 0000 steel wool

### Preparing the Surface

1. **Surface Preparation:**
   - Sand to 320-400 grit
   - Surface must be perfectly smooth
   - Remove all dust thoroughly

2. **Grain Filling (for open-grain woods):**
   - Use pumice and shellac mixture for traditional filling
   - Apply commercial grain filler for easier approach
   - Allow to dry completely and sand smooth

3. **Sealing the Surface:**
   - Apply thin wash coat (1/2 lb cut shellac)
   - Let dry 1-2 hours
   - Light sand with 400 grit
   - Remove all dust

### Making a French Polishing Pad (Muñeca or Tampon)

1. Place a small ball of cotton wadding in the center of a lint-free cloth
2. Add a few drops of shellac to the wadding
3. Gather the cloth around the wadding to form a tear-drop shape
4. Twist the cloth to create a handle, ensuring no wrinkles on the face
5. The face should be smooth and only slightly damp when squeezed

### The French Polishing Process

#### 1. Bodying Stage (Building Base)

1. **Apply Shellac:**
   - Add a few drops of shellac to pad
   - Move in figure-eight or circular patterns
   - Use very light pressure
   - Keep pad in constant motion
   - Work in small sections (1-2 sq ft)

2. **First Session:**
   - Apply 3-4 thin coats
   - Allow 1-2 hours between applications
   - Keep coats very thin to prevent problems

3. **Between Sessions:**
   - Allow 24 hours drying time
   - Light sand with 600 grit
   - Remove all dust before continuing

4. **Build to Desired Depth:**
   - Repeat process over 3-5 days
   - Each day adds depth to the finish
   - Patience is essential—rushing causes issues

#### 2. Spiriting Out (Removing Oil)

After building sufficient layers:

1. Create fresh pad with minimal oil
2. Charge with 2 lb cut shellac diluted 50% with alcohol
3. Use very light pressure and quick movements
4. Apply in straight lines with grain
5. Each pass removes oil from previous applications
6. Continue until surface feels dry and smooth

#### 3. Leveling the Surface

Once sufficient build is achieved:

1. Allow to cure 3-7 days
2. Wet sand very carefully with 1000-1200 grit
3. Use water or mineral oil as lubricant
4. Focus on creating perfectly level surface
5. Clean thoroughly and allow to dry completely

#### 4. Final Polishing

1. Create fresh pad with minimal shellac
2. Add few drops of alcohol (not shellac)
3. Move quickly with very light pressure
4. Work in straight lines with grain
5. This creates final high gloss and clarity

### Traditional Enhancements

#### Glazing
For the ultimate mirror finish:
1. Allow polish to cure 1 week
2. Create slurry of rottenstone and mineral oil
3. Apply in circular motion with soft cloth
4. Buff clean with cotton cloth
5. Final buff with chamois

#### Pore Highlighting
To enhance grain pattern:
1. Apply dark wax to grain after sealing
2. Buff excess from surface
3. Continue with regular French polishing
4. Creates dramatic contrast in open grain

### Troubleshooting Common Issues

#### Streaking
- **Cause:** Too much oil, uneven pressure
- **Solution:** Reduce oil, maintain even pressure, spirit out

#### Cloudy Appearance
- **Cause:** Moisture trapped in finish, ambient humidity
- **Solution:** Allow longer drying times, work in less humid conditions

#### Blotching
- **Cause:** Uneven absorption, contamination
- **Solution:** Apply wash coat first, ensure clean surface

#### Stickiness
- **Cause:** Too much shellac, insufficient drying
- **Solution:** Use less shellac, allow proper drying time between sessions

### Care for French Polished Surfaces

1. **Avoid:**
   - Water exposure (use coasters)
   - Alcohol-based cleaners
   - Direct heat
   - Prolonged sunlight

2. **Cleaning:**
   - Dust with soft cloth
   - Mild soap and water (barely damp cloth)
   - Dry immediately

3. **Maintenance:**
   - Apply good quality furniture wax twice yearly
   - Buff with soft cloth
   - Touch up scratches with shellac and pad

French polishing requires patience and practice, but the results are unmatched in their beauty and depth. This traditional technique connects modern woodworkers to centuries of craftsmanship tradition while producing a finish of remarkable quality and beauty.
      `
    },
    {
      id: 8,
      title: "Finishing for Outdoor Projects",
      description: "Protect your outdoor woodworking projects from the elements with these specialized finishing techniques.",
      icon: <FlaskConical className="h-6 w-6 text-orange-500" />,
      category: "materials",
      content: `
## Finishing for Outdoor Projects

Outdoor woodworking projects face harsh challenges from sun, rain, snow, and temperature fluctuations. Proper finishing is essential for both appearance and longevity of exterior wood.

### Understanding Outdoor Finish Requirements

Outdoor finishes must protect against:
- UV radiation damage
- Moisture penetration
- Mold and mildew
- Temperature expansion/contraction
- Physical wear and abrasion

Unlike indoor finishes, outdoor products must remain somewhat flexible to accommodate wood movement while maintaining their protective qualities.

### Types of Exterior Finishes

#### 1. Penetrating Oil Finishes

**Examples:** Teak oil, tung oil, linseed oil, penetrating deck stains

**Characteristics:**
- Penetrate into wood fibers
- Enhance natural grain and color
- Do not form surface film
- Easy to apply and maintain
- Gradual weathering
- Require more frequent reapplication

**Best for:**
- Deck furniture
- Adirondack chairs
- Picnic tables
- Cedar structures
- Projects where natural appearance is desired

**Application Tips:**
- Clean and sand surface thoroughly
- Apply liberally, allowing penetration
- Wipe excess after 15-30 minutes
- Multiple coats (3-4) improve durability
- Reapply annually or when water stops beading

#### 2. Exterior Varnishes and Urethanes

**Examples:** Spar urethane, marine varnish, "helmsman" type products

**Characteristics:**
- Form protective film on surface
- Higher UV and moisture resistance
- Longer lasting protection (2-3 years)
- Range from satin to high gloss
- More difficult to maintain/refinish

**Best for:**
- Entry doors
- Window frames
- Outdoor furniture requiring glossier finish
- Boats and marine applications
- Areas with high moisture exposure

**Application Tips:**
- Sand to 180-220 grit
- Apply thin coats (minimum 3)
- Sand lightly between coats (320 grit)
- Maintain with yearly light sanding and recoat
- Full strip and refinish every 3-5 years

#### 3. Exterior Stains

**Examples:** Semi-transparent deck stains, solid color stains

**Types:**
- **Water-based:** Easier cleanup, less odor, faster drying
- **Oil-based:** Better penetration, longer lasting, slower drying

**Opacity Options:**
- **Clear:** Maximum wood visibility, minimal UV protection
- **Semi-transparent:** Shows grain while adding color
- **Semi-solid:** Limited grain visibility, more UV protection
- **Solid:** Hides grain completely, maximum protection

**Best for:**
- Decks
- Fences
- Pergolas
- Siding
- Garden structures

**Application Tips:**
- Clean wood thoroughly
- Apply with brush, roller, or sprayer
- Maintain uniform coverage
- Back-brush sprayed applications
- Two coats for maximum protection

#### 4. Paint Systems

**Components:**
- Exterior primer (oil or water-based)
- Quality exterior paint (100% acrylic latex recommended)

**Characteristics:**
- Maximum protection from elements
- Completely hides wood grain
- Longest lasting finish option (5-10 years)
- Wide color selection
- Blocks UV rays completely

**Best for:**
- Siding
- Trim
- Outdoor structures
- Projects where wood appearance is not important
- Woods prone to checking/cracking

**Application Tips:**
- Always use appropriate exterior primer
- Sand between coats
- Minimum two topcoats
- Attention to coverage on end grain
- Cut-in edges and details with brush

### Wood Selection for Outdoor Projects

Some woods naturally perform better outdoors:

1. **Naturally Rot-Resistant Woods:**
   - Teak
   - Cedar
   - Redwood
   - White Oak
   - Cypress
   - Ipe/Brazilian Hardwoods

2. **Pressure-Treated Lumber:**
   - Contains preservatives
   - Requires 6+ months weathering before finishing
   - Select KDAT (kiln-dried after treatment) when possible

3. **Modified Woods:**
   - Thermally modified wood
   - Acetylated wood (Accoya)
   - Offer improved stability and rot resistance

### Special Considerations for Outdoor Finishing

#### End Grain Sealing
End grain absorbs 10-12 times more moisture than face grain:
- Seal all end grain with extra coats
- Consider epoxy sealer for maximum protection
- Pay special attention to joints where water can collect

#### Wood Preparation
Proper preparation is even more critical outdoors:
1. Allow new lumber to acclimate and dry (moisture content below 15%)
2. Sand to remove mill glaze
3. Clean thoroughly to remove dirt, mildew, and contaminants
4. Apply brightener/conditioner to weathered wood

#### Maintenance Schedules

1. **Oil Finishes:**
   - Inspect twice yearly
   - Clean surface
   - Reapply when water no longer beads
   - Typically annual reapplication

2. **Film-Forming Finishes:**
   - Inspect annually
   - Clean surface
   - Light sand and recoat when sheen dulls
   - Complete refinish every 3-5 years

3. **Stains:**
   - Horizontal surfaces: 1-3 years
   - Vertical surfaces: 3-7 years
   - Reapply when color fades or water absorption increases

4. **Paint:**
   - Touch up damaged areas promptly
   - Clean annually
   - Repaint when showing wear (5-10 years)

### Application Methods for Best Results

#### Weather Conditions
- Temperature: 50-85°F (10-29°C)
- Humidity: 40-70% ideal
- Avoid direct sunlight during application
- Allow 24+ hours without rain after application
- Morning application provides best results

#### Tools and Techniques
- Natural bristle brush for oil-based products
- Synthetic brush for water-based products
- Foam applicators for large, flat surfaces
- Spray application followed by back-brushing
- Clean lint-free rags for oil penetrating finishes

### Specialized Outdoor Products

#### Deck Restoration Products
- Thicker than standard finishes
- Fill small cracks and checks
- Textured for slip resistance
- Good for weathered wood
- Typical lifespan 2-3 years

#### End Grain Sealers
- Wax-based products
- Green wood sealers
- Epoxy sealers
- Applied specifically to end grain
- Prevent checking and splitting

#### Colorless UV Inhibitors
- Clear finishes with UV absorbers
- Maintain natural wood color longer
- Must be reapplied frequently
- Less effective than pigmented finishes

### Environmental Considerations

1. **VOC Regulations:**
   - Water-based products generally lower in VOCs
   - Check local regulations before selecting products
   - Low-VOC options available in most product categories

2. **Application Impact:**
   - Protect surrounding plants and soil
   - Dispose of products properly
   - Consider rain runoff when applying

3. **Sustainable Options:**
   - Natural oils (tung, linseed)
   - Water-based products
   - Hardwax oils

With proper selection and application of exterior finishes, your outdoor woodworking projects can maintain their beauty and structural integrity for many years, even in challenging environments. Remember that regular maintenance is key to long-term performance of any outdoor finish.
      `
    }
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 bg-orange-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-blue-900 mb-4">Woodworking Finishing</h1>
            <p className="text-xl text-blue-800 max-w-3xl mx-auto">
              Explore expert tips, techniques, and best practices for achieving professional-quality wood finishes.
            </p>
          </div>

          <Tabs defaultValue="all" className="w-full mb-8">
            <div className="flex justify-center mb-6">
              <TabsList>
                <TabsTrigger value="all">All Articles</TabsTrigger>
                <TabsTrigger value="staining">Staining</TabsTrigger>
                <TabsTrigger value="clear-finishes">Clear Finishes</TabsTrigger>
                <TabsTrigger value="techniques">Techniques</TabsTrigger>
                <TabsTrigger value="materials">Materials</TabsTrigger>
                <TabsTrigger value="preparation">Preparation</TabsTrigger>
                <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {articles.map((article) => (
                  <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardHeader className="flex flex-row items-center gap-4 pb-2">
                      <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                        {article.icon}
                      </div>
                      <CardTitle className="text-xl">{article.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">{article.description}</CardDescription>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setSelectedArticle(article)}
                      >
                        Read Article
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            {["staining", "clear-finishes", "techniques", "materials", "preparation", "troubleshooting"].map((category) => (
              <TabsContent key={category} value={category} className="mt-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {articles
                    .filter(article => article.category === category)
                    .map((article) => (
                      <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                        <CardHeader className="flex flex-row items-center gap-4 pb-2">
                          <div className="h-12 w-12 rounded-full bg-orange-100 flex items-center justify-center">
                            {article.icon}
                          </div>
                          <CardTitle className="text-xl">{article.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-base">{article.description}</CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            variant="outline" 
                            className="w-full"
                            onClick={() => setSelectedArticle(article)}
                          >
                            Read Article
                          </Button>
                        </CardFooter>
                      </Card>
                    ))
                  }
                </div>
              </TabsContent>
            ))}
          </Tabs>

          <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-12">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Subscribe for Weekly Woodworking Finishing Tips</h2>
            <p className="text-blue-800 mb-4">Join our newsletter and get the latest finishing techniques, product reviews, and expert advice delivered to your inbox.</p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input type="email" placeholder="Your email address" className="flex-1 px-4 py-2 rounded border" />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={selectedArticle !== null} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              {selectedArticle?.icon}
              {selectedArticle?.title}
            </DialogTitle>
            <DialogDescription>
              {selectedArticle?.description}
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="mt-4 max-h-[60vh] pr-4">
            <div className="prose prose-lg prose-blue max-w-none pb-8">
              {selectedArticle?.content && (
                <div 
                  dangerouslySetInnerHTML={{ 
                    __html: selectedArticle.content
                      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold text-blue-900 mt-8 mb-4">$1</h2>')
                      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold text-blue-700 mt-6 mb-3">$1</h3>')
                      .replace(/^#### (.*$)/gim, '<h4 class="text-lg font-bold text-blue-600 mt-4 mb-2">$1</h4>')
                      .replace(/^\- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
                      .replace(/^(\d+)\. (.*$)/gim, '<li class="ml-6 list-decimal"><strong>$1.</strong> $2</li>')
                      .replace(/^\*\*(.*)\*\*/gim, '<strong>$1</strong>')
                      .replace(/\n\n/gim, '<br/><br/>')
                   }} 
                />
              )}
            </div>
          </ScrollArea>
          
          <DialogFooter className="gap-2 sm:gap-0">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> 
              <span>10 min read</span>
              <CheckSquare className="h-4 w-4 ml-4" /> 
              <span>Fact checked by professional woodworkers</span>
            </div>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default WoodworkingFinishing;
