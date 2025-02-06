'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { TableRow, TableInsert } from "@/lib/supabase";

type Pet = TableRow<'pets'>;
type NewPet = TableInsert<'pets'>;
type UpdatePet = Partial<Omit<NewPet, 'id'>> & { id: string };

export function usePets() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: pets = [], isLoading } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('pets')
        .select('*')
        .eq('user_id', user?.id)
        .order('name');

      if (error) {
        toast.error('Failed to fetch pets');
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const { mutateAsync: addPet, isPending: isAdding } = useMutation({
    mutationFn: async (newPet: NewPet) => {
      const { data, error } = await supabase
        .from('pets')
        .insert([newPet])
        .select()
        .single();

      if (error) {
        toast.error('Failed to add pet');
        throw error;
      }

      toast.success('Pet added successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  const { mutateAsync: editPet, isPending: isEditing } = useMutation({
    mutationFn: async ({ id, ...updates }: UpdatePet) => {
      const { data, error } = await supabase
        .from('pets')
        .update(updates)
        .eq('id', id)
        .eq('user_id', user?.id)
        .select()
        .single();

      if (error) {
        toast.error('Failed to update pet');
        throw error;
      }

      toast.success('Pet updated successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  const { mutateAsync: deletePet, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('pets')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Failed to delete pet');
        throw error;
      }

      toast.success('Pet deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pets'] });
    },
  });

  return {
    pets,
    isLoading,
    addPet,
    isAdding,
    editPet,
    isEditing,
    deletePet,
    isDeleting,
  };
}
