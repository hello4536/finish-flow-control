
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SprayBooth, CreateBoothData, UpdateBoothData } from "../types";

export const useSprayBooths = () => {
  return useQuery({
    queryKey: ["spray-booths"],
    queryFn: async (): Promise<SprayBooth[]> => {
      const { data, error } = await supabase
        .from("spray_booths")
        .select("*")
        .order("booth_number");

      if (error) throw error;
      return (data || []).map(booth => ({
        ...booth,
        status: booth.status as "active" | "maintenance" | "offline",
        location: booth.location || "",
        notes: booth.notes || "",
        capacity: booth.capacity || 1,
        specifications: booth.specifications as Record<string, any> || {}
      }));
    }
  });
};

export const useCreateBooth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateBoothData): Promise<SprayBooth> => {
      const { data: result, error } = await supabase
        .from("spray_booths")
        .insert(data)
        .select()
        .single();

      if (error) throw error;
      return {
        ...result,
        status: result.status as "active" | "maintenance" | "offline",
        location: result.location || "",
        notes: result.notes || "",
        capacity: result.capacity || 1,
        specifications: result.specifications as Record<string, any> || {}
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spray-booths"] });
    }
  });
};

export const useUpdateBooth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateBoothData): Promise<SprayBooth> => {
      const { data: result, error } = await supabase
        .from("spray_booths")
        .update(data)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return {
        ...result,
        status: result.status as "active" | "maintenance" | "offline",
        location: result.location || "",
        notes: result.notes || "",
        capacity: result.capacity || 1,
        specifications: result.specifications as Record<string, any> || {}
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spray-booths"] });
    }
  });
};

export const useDeleteBooth = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string): Promise<void> => {
      const { error } = await supabase
        .from("spray_booths")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spray-booths"] });
    }
  });
};
