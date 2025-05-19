
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';

export const useSampleComplianceData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add sample data for testing
  const seedSampleData = async () => {
    try {
      // Sample certification data - both woodworking and auto body examples
      const sampleCertifications = [
        { 
          certification_id: "CERT-001", 
          name: "ISO 9001", 
          status: "Active" as const, 
          expiry: "2026-01-15", 
          authority: "International Standards Organization" 
        },
        { 
          certification_id: "CERT-002", 
          name: "CE Mark", 
          status: "Active" as const, 
          expiry: "2025-12-10", 
          authority: "European Commission" 
        },
        { 
          certification_id: "CERT-003", 
          name: "UL Certification", 
          status: "Expiring Soon" as const, 
          expiry: "2025-06-30", 
          authority: "Underwriters Laboratories" 
        },
        { 
          certification_id: "CERT-004", 
          name: "ASTM Compliance", 
          status: "Active" as const, 
          expiry: "2027-03-22", 
          authority: "American Society for Testing and Materials" 
        },
        { 
          certification_id: "CERT-005", 
          name: "RoHS Compliance", 
          status: "Active" as const, 
          expiry: "2026-09-18", 
          authority: "European Union" 
        },
        // Woodworking specific
        { 
          certification_id: "CERT-006", 
          name: "FSC Certification", 
          status: "Active" as const, 
          expiry: "2026-11-05", 
          authority: "Forest Stewardship Council" 
        },
        { 
          certification_id: "CERT-007", 
          name: "PEFC Certification", 
          status: "Expiring Soon" as const, 
          expiry: "2025-07-12", 
          authority: "Programme for the Endorsement of Forest Certification" 
        },
        // Auto body specific
        { 
          certification_id: "CERT-008", 
          name: "I-CAR Gold Class", 
          status: "Active" as const, 
          expiry: "2026-04-30", 
          authority: "Inter-Industry Conference on Auto Collision Repair" 
        },
        { 
          certification_id: "CERT-009", 
          name: "ASE Certification", 
          status: "Active" as const, 
          expiry: "2026-08-15", 
          authority: "National Institute for Automotive Service Excellence" 
        },
        { 
          certification_id: "CERT-010", 
          name: "EPA 6H Compliance", 
          status: "Expiring Soon" as const, 
          expiry: "2025-06-28", 
          authority: "Environmental Protection Agency" 
        }
      ];

      // Sample compliance issues data - both woodworking and auto body examples
      const sampleComplianceIssues = [
        { 
          issue_id: "VIO-001", 
          date: "2025-04-15", 
          type: "Safety Protocol", 
          description: "Inadequate machine guarding", 
          status: "Resolved" as const, 
          assignee: "Operations Team" 
        },
        { 
          issue_id: "VIO-002", 
          date: "2025-04-02", 
          type: "Environmental", 
          description: "Improper waste disposal", 
          status: "In Progress" as const, 
          assignee: "Facilities Management" 
        },
        { 
          issue_id: "VIO-003", 
          date: "2025-03-28", 
          type: "Quality Control", 
          description: "Documentation incomplete", 
          status: "Resolved" as const, 
          assignee: "QC Department" 
        },
        { 
          issue_id: "VIO-004", 
          date: "2025-03-10", 
          type: "Regulatory", 
          description: "Missing hazard labels", 
          status: "Pending Review" as const, 
          assignee: "Compliance Officer" 
        },
        { 
          issue_id: "VIO-005", 
          date: "2025-02-22", 
          type: "Procedural", 
          description: "Skipped inspection step", 
          status: "Resolved" as const, 
          assignee: "Production Team" 
        },
        // Woodworking specific
        { 
          issue_id: "VIO-006", 
          date: "2025-04-18", 
          type: "Environmental", 
          description: "Wood dust exposure exceeding limits", 
          status: "In Progress" as const, 
          assignee: "Safety Manager" 
        },
        { 
          issue_id: "VIO-007", 
          date: "2025-04-05", 
          type: "Regulatory", 
          description: "Improper storage of flammable finishes", 
          status: "Resolved" as const, 
          assignee: "Workshop Supervisor" 
        },
        // Auto body specific
        { 
          issue_id: "VIO-008", 
          date: "2025-03-25", 
          type: "Environmental", 
          description: "VOC emissions above permitted levels", 
          status: "In Progress" as const, 
          assignee: "Environmental Compliance" 
        },
        { 
          issue_id: "VIO-009", 
          date: "2025-03-12", 
          type: "Safety", 
          description: "Inadequate respiratory protection in spray booth", 
          status: "Resolved" as const, 
          assignee: "Shop Manager" 
        },
        { 
          issue_id: "VIO-010", 
          date: "2025-02-28", 
          type: "Regulatory", 
          description: "Non-compliant paint mixing station", 
          status: "Pending Review" as const, 
          assignee: "Facility Director" 
        }
      ];

      // Sample hazardous waste data - both woodworking and auto body examples
      const sampleHazardousWaste = [
        {
          waste_id: "HW-001",
          material: "Spent Paint Thinner",
          quantity: 25.5,
          unit: "Gallons",
          disposal_date: "2025-04-20",
          disposal_method: "Incineration",
          handler: "EcoWaste Solutions",
          status: "Disposed" as const,
          manifest_number: "EPA12345678"
        },
        {
          waste_id: "HW-002",
          material: "Used Oil Filters",
          quantity: 120,
          unit: "Units",
          disposal_date: "2025-04-15",
          disposal_method: "Recycling",
          handler: "Auto Parts Recyclers",
          status: "In Progress" as const,
          manifest_number: "EPA87654321"
        },
        {
          waste_id: "HW-003",
          material: "Aerosol Cans",
          quantity: 45,
          unit: "Units",
          disposal_date: "2025-05-01",
          disposal_method: "Puncture and Recycle",
          handler: "Metal Recovery Inc.",
          status: "Pending" as const,
          manifest_number: null
        },
        // Auto body specific
        {
          waste_id: "HW-004",
          material: "Used Spray Booth Filters",
          quantity: 15,
          unit: "Units",
          disposal_date: "2025-04-25",
          disposal_method: "Hazardous Waste Landfill",
          handler: "Clean Earth Services",
          status: "Disposed" as const,
          manifest_number: "EPA45678901"
        },
        {
          waste_id: "HW-005",
          material: "Leftover Automotive Paint",
          quantity: 12.5,
          unit: "Gallons",
          disposal_date: "2025-05-05",
          disposal_method: "Fuel Blending",
          handler: "Waste Management Solutions",
          status: "Pending" as const,
          manifest_number: null
        },
        {
          waste_id: "HW-006",
          material: "Used Solvent Rags",
          quantity: 75,
          unit: "Pounds",
          disposal_date: "2025-04-10",
          disposal_method: "Industrial Laundry",
          handler: "UniFirst Corporation",
          status: "Disposed" as const,
          manifest_number: "EPA56789012"
        },
        // Woodworking specific
        {
          waste_id: "HW-007",
          material: "Waste Varnish",
          quantity: 8.5,
          unit: "Gallons",
          disposal_date: "2025-04-18",
          disposal_method: "Solidification",
          handler: "Green Disposal Co.",
          status: "In Progress" as const,
          manifest_number: "EPA23456789"
        },
        {
          waste_id: "HW-008",
          material: "Stain-Soaked Rags",
          quantity: 35,
          unit: "Pounds",
          disposal_date: "2025-05-10",
          disposal_method: "Controlled Incineration",
          handler: "Safety-Kleen",
          status: "Pending" as const,
          manifest_number: null
        },
        {
          waste_id: "HW-009",
          material: "Wood Treatment Chemicals",
          quantity: 4.2,
          unit: "Gallons",
          disposal_date: "2025-04-05",
          disposal_method: "Chemical Neutralization",
          handler: "Environmental Recovery Services",
          status: "Disposed" as const,
          manifest_number: "EPA34567890"
        },
        {
          waste_id: "HW-010",
          material: "Empty Adhesive Containers",
          quantity: 28,
          unit: "Units",
          disposal_date: "2025-05-15",
          disposal_method: "Triple Rinse and Recycle",
          handler: "Advanced Recycling Corp",
          status: "Pending" as const,
          manifest_number: null
        }
      ];

      // Sample PPE requirements data - both woodworking and auto body examples
      const samplePPERequirements = [
        {
          requirement_id: "PPE-001",
          department: "Paint Shop",
          equipment: "Respirators",
          standard: "NIOSH-Approved",
          required_by: "OSHA 29 CFR 1910.134",
          last_inspection: "2025-01-15",
          next_inspection: "2025-07-15",
          status: "Compliant" as const,
          notes: "Annual fit testing completed for all staff"
        },
        {
          requirement_id: "PPE-002",
          department: "Body Shop",
          equipment: "Safety Glasses",
          standard: "ANSI Z87.1",
          required_by: "OSHA 29 CFR 1910.133",
          last_inspection: "2025-02-10",
          next_inspection: "2025-08-10",
          status: "Non-Compliant" as const,
          notes: "5 pairs found with scratched lenses, replacements ordered"
        },
        {
          requirement_id: "PPE-003",
          department: "Detail Department",
          equipment: "Chemical-Resistant Gloves",
          standard: "EN 374",
          required_by: "Company Policy",
          last_inspection: "2025-03-05",
          next_inspection: "2025-09-05",
          status: "Pending Review" as const,
          notes: "Evaluating new supplier for improved durability"
        },
        // Auto body specific
        {
          requirement_id: "PPE-004",
          department: "Spray Booth",
          equipment: "Paint Suits",
          standard: "Type 5/6 Protection",
          required_by: "OSHA 29 CFR 1910.132",
          last_inspection: "2025-02-25",
          next_inspection: "2025-08-25",
          status: "Compliant" as const,
          notes: "Inventory adequate for current staff rotation"
        },
        {
          requirement_id: "PPE-005",
          department: "Metal Fabrication",
          equipment: "Welding Helmets",
          standard: "ANSI Z87.1+",
          required_by: "OSHA 29 CFR 1910.252",
          last_inspection: "2025-01-20",
          next_inspection: "2025-07-20",
          status: "Non-Compliant" as const,
          notes: "Auto-darkening feature not functioning on 2 units"
        },
        // Woodworking specific
        {
          requirement_id: "PPE-006",
          department: "Woodshop",
          equipment: "Ear Protection",
          standard: "NRR 25+",
          required_by: "OSHA 29 CFR 1910.95",
          last_inspection: "2025-03-10",
          next_inspection: "2025-09-10",
          status: "Compliant" as const,
          notes: "Both earmuffs and plugs available at all stations"
        },
        {
          requirement_id: "PPE-007",
          department: "CNC Router Area",
          equipment: "Dust Masks",
          standard: "N95",
          required_by: "Company Policy",
          last_inspection: "2025-02-05",
          next_inspection: "2025-08-05",
          status: "Compliant" as const,
          notes: "Monthly supply adequate for current operations"
        },
        {
          requirement_id: "PPE-008",
          department: "Finishing Room",
          equipment: "Face Shields",
          standard: "ANSI Z87.1",
          required_by: "OSHA 29 CFR 1910.133",
          last_inspection: "2025-03-15",
          next_inspection: "2025-09-15",
          status: "Non-Compliant" as const,
          notes: "Excessive paint buildup affecting visibility, cleaning procedure being revised"
        },
        {
          requirement_id: "PPE-009",
          department: "Material Handling",
          equipment: "Steel-toed Boots",
          standard: "ASTM F2413",
          required_by: "OSHA 29 CFR 1910.136",
          last_inspection: "2025-01-25",
          next_inspection: "2025-07-25",
          status: "Pending Review" as const,
          notes: "Annual employee allowance being reassessed"
        },
        {
          requirement_id: "PPE-010",
          department: "Maintenance",
          equipment: "Cut-resistant Gloves",
          standard: "ANSI/ISEA 105 Level 4",
          required_by: "Company Policy",
          last_inspection: "2025-02-15",
          next_inspection: "2025-08-15",
          status: "Compliant" as const,
          notes: "New improved model introduced after safety committee review"
        }
      ];

      // Insert sample certifications
      for (const certification of sampleCertifications) {
        const { error } = await supabase.from('certifications').insert(certification);
        if (error) console.error("Error inserting certification:", error);
      }

      // Insert sample compliance issues
      for (const issue of sampleComplianceIssues) {
        const { error } = await supabase.from('compliance_issues').insert(issue);
        if (error) console.error("Error inserting compliance issue:", error);
      }

      // Insert sample hazardous waste
      for (const waste of sampleHazardousWaste) {
        const { error } = await supabase.from('hazardous_waste').insert(waste);
        if (error) console.error("Error inserting hazardous waste:", error);
      }

      // Insert sample PPE requirements
      for (const ppe of samplePPERequirements) {
        const { error } = await supabase.from('ppe_requirements').insert(ppe);
        if (error) console.error("Error inserting PPE requirement:", error);
      }

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      queryClient.invalidateQueries({ queryKey: ['complianceIssues'] });
      queryClient.invalidateQueries({ queryKey: ['hazardousWaste'] });
      queryClient.invalidateQueries({ queryKey: ['ppeRequirements'] });

      toast({
        title: 'Sample data added',
        description: 'Sample compliance data has been added to the database.',
      });
    } catch (error: any) {
      console.error('Error seeding sample data:', error);
      toast({
        title: 'Error adding sample data',
        description: error.message,
        variant: 'destructive',
      });
    }
  };

  return { seedSampleData };
};
