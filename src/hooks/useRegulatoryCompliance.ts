
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { RegulatoryCompliance, Region } from '@/types/quality';
import { useToast } from '@/hooks/use-toast';

export const useRegulatoryCompliance = () => {
  const { toast } = useToast();
  const [selectedRegion, setSelectedRegion] = useState<Region>('US');

  // Fetch regulatory compliance data
  const { data: regulatoryCompliance = [], isLoading: isRegulatoryLoading } = useQuery({
    queryKey: ['regulatoryCompliance', selectedRegion],
    queryFn: async () => {
      // In a real implementation, this would fetch from the database
      // For now, we're using mock data but expanded with more comprehensive regulations
      
      let mockData: RegulatoryCompliance[] = [
        {
          id: '1',
          jurisdiction: 'Federal',
          requirement: 'Resource Conservation and Recovery Act (RCRA)',
          feature_key: 'hazardous-waste-management',
          region: 'US',
          notes: 'Requires proper management of hazardous waste from cradle to grave',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '2',
          jurisdiction: 'Federal',
          requirement: 'OSHA Hazard Communication Standard',
          feature_key: 'chemical-labeling',
          region: 'US',
          notes: 'Requires proper labeling and safety data sheets for chemicals',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '3',
          jurisdiction: 'Federal',
          requirement: 'Clean Air Act',
          feature_key: 'air-emissions',
          region: 'US',
          notes: 'Regulates air emissions from stationary and mobile sources',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '4',
          jurisdiction: 'Federal',
          requirement: 'OSHA PPE Requirements (29 CFR 1910.132)',
          feature_key: 'ppe-requirements',
          region: 'US',
          notes: 'Requires employers to assess workplace hazards and provide appropriate PPE',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '5',
          jurisdiction: 'Federal',
          requirement: 'OSHA Respiratory Protection (29 CFR 1910.134)',
          feature_key: 'respiratory-protection',
          region: 'US',
          notes: 'Requires implementation of a respiratory protection program',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '6',
          jurisdiction: 'Provincial',
          requirement: 'WHMIS 2015',
          feature_key: 'chemical-labeling',
          region: 'Canada',
          notes: 'Canadian version of GHS for chemical labeling and safety data sheets',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '7',
          jurisdiction: 'Provincial',
          requirement: 'Canada Environmental Protection Act',
          feature_key: 'environmental-protection',
          region: 'Canada',
          notes: 'Comprehensive environmental regulations for Canada',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '8',
          jurisdiction: 'State',
          requirement: 'California Prop 65',
          feature_key: 'chemical-warnings',
          region: 'US',
          notes: 'Requires warning labels for chemicals known to cause cancer or reproductive harm',
          applies: false,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '9',
          jurisdiction: 'State',
          requirement: 'California Air Resources Board (CARB)',
          feature_key: 'voc-limits',
          region: 'US',
          notes: 'Establishes VOC limits for products sold in California',
          applies: false,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        },
        {
          id: '10',
          jurisdiction: 'Federal',
          requirement: 'EPA Hazardous Waste Generator Requirements',
          feature_key: 'waste-generator',
          region: 'US',
          notes: 'Specific requirements based on generator category (LQG, SQG, VSQG)',
          applies: true,
          created_at: '2025-01-01T00:00:00Z',
          updated_at: '2025-01-01T00:00:00Z'
        }
      ];
      
      if (selectedRegion !== 'All') {
        mockData = mockData.filter(item => item.region === selectedRegion);
      }
      
      return mockData;
    },
  });

  return {
    regulatoryCompliance,
    isRegulatoryLoading,
    selectedRegion,
    setSelectedRegion,
  };
};
