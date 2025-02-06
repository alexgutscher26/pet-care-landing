'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import { Database } from "@/lib/database.types";

type VetAppointment = Database['public']['Tables']['vet_appointments']['Row'] & {
  pets?: {
    name: string;
  } | null;
  veterinarians?: {
    name: string;
    clinic_name: string | null;
  } | null;
};

export function useVetAppointments() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery<VetAppointment[]>({
    queryKey: ['vet-appointments'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vet_appointments')
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
        .order('appointment_date');

      if (error) {
        toast.error('Failed to fetch appointments');
        throw error;
      }

      return data || [];
    },
    enabled: !!user,
  });

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) > new Date()
  );

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) <= new Date()
  );

  const { mutateAsync: addAppointment, isPending: isAdding } = useMutation({
    mutationFn: async (newAppointment: Omit<VetAppointment, 'id' | 'created_at' | 'updated_at' | 'user_id' | 'status' | 'pets' | 'veterinarians'>) => {
      const { data, error } = await supabase
        .from('vet_appointments')
        .insert([{ ...newAppointment, user_id: user?.id, status: 'scheduled' }])
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
        toast.error('Failed to add appointment');
        throw error;
      }

      toast.success('Appointment scheduled successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vet-appointments'] });
    },
  });

  const { mutateAsync: editAppointment, isPending: isEditing } = useMutation({
    mutationFn: async (updatedAppointment: Partial<VetAppointment> & { id: string }) => {
      const { id, pets, veterinarians, ...rest } = updatedAppointment;
      const { data, error } = await supabase
        .from('vet_appointments')
        .update(rest)
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
        toast.error('Failed to update appointment');
        throw error;
      }

      toast.success('Appointment updated successfully');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vet-appointments'] });
    },
  });

  const { mutateAsync: deleteAppointment, isPending: isDeleting } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('vet_appointments')
        .delete()
        .eq('id', id)
        .eq('user_id', user?.id);

      if (error) {
        toast.error('Failed to delete appointment');
        throw error;
      }

      toast.success('Appointment cancelled successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vet-appointments'] });
    },
  });

  return {
    appointments,
    upcomingAppointments,
    pastAppointments,
    isLoading,
    addAppointment,
    isAdding,
    editAppointment,
    isEditing,
    deleteAppointment,
    isDeleting,
  };
}
