'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { TableRow } from "@/lib/supabase";

type BaseHealthRecord = TableRow<'health_records'>;

export type HealthRecord = BaseHealthRecord & {
  pets: {
    name: string;
  };
  veterinarians?: {
    name: string;
    clinic_name: string | null;
  } | null;
};

export type NewHealthRecord = Omit<BaseHealthRecord, 'id' | 'created_at' | 'updated_at'>;
export type UpdateHealthRecord = Partial<Omit<NewHealthRecord, 'user_id'>> & { id: string };

export function useHealthRecords() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: healthRecords = [], isLoading } = useQuery<HealthRecord[]>({
    queryKey: ['health-records'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('health_records')
        .select(`
          *,
          pets (
            name
          ),
          veterinarians (
            name,
            clinic_name
          )
        `)
        .eq('user_id', user?.id)
        .order('record_date', { ascending: false });

      if (error) {
        toast.error('Failed to fetch health records');
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const { mutateAsync: addHealthRecord, isPending: isAdding } = useMutation({
    mutationFn: async (newRecord: NewHealthRecord) => {
      const { data, error } = await supabase
        .from('health_records')
        .insert([newRecord])
        .select(`
          *,
          pets (
            name
          ),
          veterinarians (
            name,
            clinic_name
          )
        `)
        .single();

      if (error) {
        toast.error('Failed to add health record');
        throw error;
      }

      toast.success('Health record added successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-records'] });
    },
  });

  const { mutateAsync: editHealthRecord, isPending: isEditing } = useMutation({
    mutationFn: async ({ id, ...updates }: UpdateHealthRecord) => {
      const { data, error } = await supabase
        .from('health_records')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select(`
          *,
          pets (
            name
          ),
          veterinarians (
            name,
            clinic_name
          )
        `)
        .single();

      if (error) {
        toast.error('Failed to update health record');
        throw error;
      }

      toast.success('Health record updated successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-records'] });
    },
  });

  const { mutateAsync: deleteHealthRecord, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('health_records')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Failed to delete health record');
        throw error;
      }

      toast.success('Health record deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['health-records'] });
    },
  });

  return {
    healthRecords,
    isLoading,
    addHealthRecord,
    isAdding,
    editHealthRecord,
    isEditing,
    deleteHealthRecord,
    isDeleting,
  };
}
