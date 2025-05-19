
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useSampleQualityData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Add sample data for testing
  const seedSampleData = async () => {
    try {
      // Sample inspection data - both woodworking and auto body examples
      const sampleInspections = [
        { 
          inspection_id: "INS-001", 
          date: "2025-05-12", 
          product: "Aluminum Frame A-100", 
          inspector: "John Doe", 
          status: "Passed" as const, 
          notes: "All specifications met" 
        },
        { 
          inspection_id: "INS-002", 
          date: "2025-05-11", 
          product: "Steel Beam S-200", 
          inspector: "Jane Smith", 
          status: "Failed" as const, 
          notes: "Dimensional inconsistency" 
        },
        { 
          inspection_id: "INS-003", 
          date: "2025-05-10", 
          product: "Glass Panel G-300", 
          inspector: "Mike Johnson", 
          status: "Passed" as const, 
          notes: "Clarity test passed" 
        },
        { 
          inspection_id: "INS-004", 
          date: "2025-05-09", 
          product: "Plastic Casing P-400", 
          inspector: "Sarah Williams", 
          status: "Pending" as const, 
          notes: "Awaiting final inspection" 
        },
        { 
          inspection_id: "INS-005", 
          date: "2025-05-08", 
          product: "Copper Wire C-500", 
          inspector: "David Brown", 
          status: "Passed" as const, 
          notes: "Conductivity within parameters" 
        },
        // Woodworking examples
        { 
          inspection_id: "INS-006", 
          date: "2025-05-07", 
          product: "Oak Cabinet Door", 
          inspector: "Robert Thompson", 
          status: "Passed" as const, 
          notes: "Finish and dimensions match specifications" 
        },
        { 
          inspection_id: "INS-007", 
          date: "2025-05-06", 
          product: "Cherry Wood Table", 
          inspector: "Emily Davis", 
          status: "Failed" as const, 
          notes: "Wood grain mismatch on tabletop" 
        },
        { 
          inspection_id: "INS-008", 
          date: "2025-05-05", 
          product: "Walnut Bookshelf", 
          inspector: "Michael Wilson", 
          status: "Passed" as const, 
          notes: "Load testing successful" 
        },
        // Auto body examples
        { 
          inspection_id: "INS-009", 
          date: "2025-05-04", 
          product: "Basecoat Application - Honda Civic", 
          inspector: "Jessica Martinez", 
          status: "Passed" as const, 
          notes: "Even application, no imperfections" 
        },
        { 
          inspection_id: "INS-010", 
          date: "2025-05-03", 
          product: "Clearcoat Finish - Toyota Camry", 
          inspector: "Thomas Anderson", 
          status: "Failed" as const, 
          notes: "Orange peel effect detected on hood" 
        },
        { 
          inspection_id: "INS-011", 
          date: "2025-05-02", 
          product: "Panel Alignment - Ford F-150", 
          inspector: "Rebecca Taylor", 
          status: "Pending" as const, 
          notes: "Awaiting gap measurement verification" 
        },
        { 
          inspection_id: "INS-012", 
          date: "2025-05-01", 
          product: "Paint Color Match - BMW 3 Series", 
          inspector: "Daniel Clark", 
          status: "Passed" as const, 
          notes: "Perfect match with factory color code" 
        }
      ];

      // Insert sample data
      for (const inspection of sampleInspections) {
        const { error } = await supabase.from('quality_inspections').insert(inspection);
        if (error) console.error("Error inserting inspection:", error);
      }

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });

      toast({
        title: 'Sample data added',
        description: 'Sample quality inspection data has been added to the database.',
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

  return {
    seedSampleData
  };
};
