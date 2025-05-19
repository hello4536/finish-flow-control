
import { useState, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Material, Supplier, MaterialSupplier } from '@/types/materials';

export function useMaterialsData() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [materialSuppliers, setMaterialSuppliers] = useState<MaterialSupplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchMaterialsData = async () => {
    setIsLoading(true);
    try {
      // Fetch materials
      const { data: materialsData, error: materialsError } = await supabase
        .from('materials')
        .select('*');

      if (materialsError) throw materialsError;
      
      // Validate and type cast the materials data
      const validMaterials = (materialsData || []).map(item => {
        // Ensure status is one of the allowed values
        let status: Material['status'] = 'In Stock'; // Default value
        if (['In Stock', 'Low Stock', 'Critical Low', 'Out of Stock'].includes(item.status)) {
          status = item.status as Material['status'];
        }
        
        return {
          ...item,
          status,
        } as Material;
      });
      
      setMaterials(validMaterials);
      
      // Fetch suppliers
      const { data: suppliersData, error: suppliersError } = await supabase
        .from('suppliers')
        .select('*');

      if (suppliersError) throw suppliersError;
      setSuppliers(suppliersData || []);
      
      // Fetch material-supplier relationships
      const { data: msData, error: msError } = await supabase
        .from('material_suppliers')
        .select('*');
        
      if (msError) throw msError;
      setMaterialSuppliers(msData || []);

    } catch (error: any) {
      console.error('Error fetching materials data:', error);
      toast({
        title: "Error fetching data",
        description: error.message || "Failed to load materials data",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Create a function to get suppliers with their materials
  const getSuppliersWithMaterials = () => {
    return suppliers.map(supplier => {
      const supplierMaterialIds = materialSuppliers
        .filter(ms => ms.supplier_id === supplier.id)
        .map(ms => ms.material_id);
        
      const supplierMaterials = materials
        .filter(material => supplierMaterialIds.includes(material.id));
        
      return {
        ...supplier,
        materials: supplierMaterials
      };
    });
  };

  // Filter materials based on search term and active tab
  const filterMaterials = (searchTerm: string, activeTab: string) => {
    return materials.filter(material => {
      const matchesSearch = material.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           material.type.toLowerCase().includes(searchTerm.toLowerCase());
      
      if (activeTab === "all") return matchesSearch;
      if (activeTab === "low") return matchesSearch && 
        (material.status === "Low Stock" || material.status === "Critical Low");
      if (activeTab === "hazardous") return matchesSearch && material.is_hazardous === true;
      if (activeTab === material.type.toLowerCase()) return matchesSearch;
      
      return matchesSearch;
    });
  };

  // Update material function
  const updateMaterial = async (id: string, updates: Partial<Material>) => {
    try {
      const { error } = await supabase
        .from('materials')
        .update(updates)
        .eq('id', id);
        
      if (error) throw error;
      
      toast({
        title: "Material updated",
        description: "Material has been updated successfully."
      });
      
      await fetchMaterialsData();
      return true;
    } catch (error: any) {
      console.error('Error updating material:', error);
      toast({
        title: "Error updating material",
        description: error.message || "Failed to update material",
        variant: "destructive",
      });
      return false;
    }
  };

  // Get hazardous materials count
  const getHazardousMaterialsCount = () => {
    return materials.filter(material => material.is_hazardous).length;
  };

  // Get materials with missing safety data
  const getMaterialsWithMissingSafetyData = () => {
    return materials.filter(material => 
      material.is_hazardous && !material.safety_data_sheet_url
    );
  };

  useEffect(() => {
    fetchMaterialsData();

    // Set up realtime subscription
    const materialsChannel = supabase
      .channel('public:materials')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'materials' }, 
        () => fetchMaterialsData())
      .subscribe();

    const suppliersChannel = supabase
      .channel('public:suppliers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'suppliers' },
        () => fetchMaterialsData())
      .subscribe();
        
    const msChannel = supabase
      .channel('public:material_suppliers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'material_suppliers' },
        () => fetchMaterialsData())
      .subscribe();
      
    return () => {
      supabase.removeChannel(materialsChannel);
      supabase.removeChannel(suppliersChannel);
      supabase.removeChannel(msChannel);
    };
  }, []);

  return {
    materials,
    suppliers: getSuppliersWithMaterials(),
    isLoading,
    filterMaterials,
    fetchMaterialsData,
    updateMaterial,
    getHazardousMaterialsCount,
    getMaterialsWithMissingSafetyData
  };
}
