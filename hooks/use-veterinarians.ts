'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Database } from "@/lib/database.types";

type Veterinarian = Database['public']['Tables']['veterinarians']['Row'];
type NewVeterinarian = Omit<Veterinarian, 'id' | 'created_at' | 'updated_at'>;
type UpdateVeterinarian = Partial<NewVeterinarian> & { id: string };

export function useVeterinarians() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: veterinarians = [], isLoading } = useQuery<Veterinarian[]>({
    queryKey: ['veterinarians'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('veterinarians')
        .select('*')
        .eq('user_id', user?.id)
        .order('name');

      if (error) {
        toast.error('Failed to fetch veterinarians');
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const { mutateAsync: addVeterinarian, isPending: isAdding } = useMutation({
    mutationFn: async (newVeterinarian: NewVeterinarian) => {
      const { data, error } = await supabase
        .from('veterinarians')
        .insert([newVeterinarian])
        .select()
        .single();

      if (error) {
        toast.error('Failed to add veterinarian');
        throw error;
      }

      toast.success('Veterinarian added successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veterinarians'] });
    },
  });

  const { mutateAsync: editVeterinarian, isPending: isEditing } = useMutation({
    mutationFn: async ({ id, ...updates }: UpdateVeterinarian) => {
      const { data, error } = await supabase
        .from('veterinarians')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to update veterinarian');
        throw error;
      }

      toast.success('Veterinarian updated successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veterinarians'] });
    },
  });

  const { mutateAsync: deleteVeterinarian, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('veterinarians')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Failed to delete veterinarian');
        throw error;
      }

      toast.success('Veterinarian deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['veterinarians'] });
    },
  });

  return {
    veterinarians,
    isLoading,
    addVeterinarian,
    isAdding,
    editVeterinarian,
    isEditing,
    deleteVeterinarian,
    isDeleting,
  };
}
