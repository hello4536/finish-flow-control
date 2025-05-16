
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { QualityInspection, Certification, ComplianceIssue, RegulatoryCompliance, Region } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useQualityData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState<Region>('US');

  // Fetch quality inspections
  const { data: inspections = [] } = useQuery({
    queryKey: ['qualityInspections'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching inspections',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as QualityInspection[];
    },
  });

  // Fetch certifications
  const { data: certifications = [] } = useQuery({
    queryKey: ['certifications'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('certifications')
        .select('*')
        .order('expiry', { ascending: true });
      
      if (error) {
        toast({
          title: 'Error fetching certifications',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as Certification[];
    },
  });

  // Fetch compliance issues
  const { data: complianceIssues = [] } = useQuery({
    queryKey: ['complianceIssues'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('compliance_issues')
        .select('*')
        .order('date', { ascending: false });
      
      if (error) {
        toast({
          title: 'Error fetching compliance issues',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as ComplianceIssue[];
    },
  });

  // Fetch regulatory compliance data
  const { data: regulatoryCompliance = [] } = useQuery({
    queryKey: ['regulatoryCompliance', selectedRegion],
    queryFn: async () => {
      let query = supabase
        .from('regulatory_compliance')
        .select('*');
      
      if (selectedRegion !== 'All') {
        query = query.eq('region', selectedRegion);
      }
      
      const { data, error } = await query;
      
      if (error) {
        toast({
          title: 'Error fetching regulatory compliance',
          description: error.message,
          variant: 'destructive',
        });
        return [];
      }
      
      return data as RegulatoryCompliance[];
    },
  });

  // Add inspection mutation
  const addInspection = useMutation({
    mutationFn: async (inspection: Omit<QualityInspection, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('quality_inspections')
        .insert(inspection)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      toast({ 
        title: 'Inspection added',
        description: 'Quality inspection has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding inspection',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Add certification mutation
  const addCertification = useMutation({
    mutationFn: async (certification: Omit<Certification, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('certifications')
        .insert(certification)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      toast({ 
        title: 'Certification added',
        description: 'Certification has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding certification',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Add compliance issue mutation
  const addComplianceIssue = useMutation({
    mutationFn: async (issue: Omit<ComplianceIssue, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('compliance_issues')
        .insert(issue)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['complianceIssues'] });
      toast({ 
        title: 'Compliance issue added',
        description: 'Compliance issue has been added successfully.'
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error adding compliance issue',
        description: error.message,
        variant: 'destructive',
      });
    }
  });

  // Update loading state when data is available
  useEffect(() => {
    if (inspections && certifications && complianceIssues && regulatoryCompliance) {
      setIsLoading(false);
    }
  }, [inspections, certifications, complianceIssues, regulatoryCompliance]);

  // Add sample data for testing
  const seedSampleData = async () => {
    try {
      // Sample inspection data
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
        }
      ];

      // Sample certification data
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
        }
      ];

      // Sample compliance issues data
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
        }
      ];

      // Insert sample data
      for (const inspection of sampleInspections) {
        await supabase.from('quality_inspections').insert(inspection);
      }

      for (const certification of sampleCertifications) {
        await supabase.from('certifications').insert(certification);
      }

      for (const issue of sampleComplianceIssues) {
        await supabase.from('compliance_issues').insert(issue);
      }

      // Refresh data
      queryClient.invalidateQueries({ queryKey: ['qualityInspections'] });
      queryClient.invalidateQueries({ queryKey: ['certifications'] });
      queryClient.invalidateQueries({ queryKey: ['complianceIssues'] });

      toast({
        title: 'Sample data added',
        description: 'Sample quality control data has been added to the database.',
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
    inspections,
    certifications,
    complianceIssues,
    regulatoryCompliance,
    selectedRegion,
    setSelectedRegion,
    isLoading,
    addInspection,
    addCertification,
    addComplianceIssue,
    seedSampleData
  };
};
