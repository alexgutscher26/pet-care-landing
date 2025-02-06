'use client';

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth-context";
import type { Database } from "@/lib/database.types";

type VetAppointment = Database['public']['Tables']['vet_appointments']['Row'] & {
  pets?: {
    name: string;
  } | null;
  veterinarians?: {
    name: string;
    clinic_name: string | null;
  } | null;
};

type NewVetAppointment = Omit<Database['public']['Tables']['vet_appointments']['Insert'], 'id' | 'created_at' | 'updated_at' | 'user_id'>;

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
    mutationFn: async (newAppointment: NewVetAppointment) => {
      if (!user?.id) {
        throw new Error('User must be authenticated to schedule appointments');
      }

      // Validate appointment date
      const appointmentDate = new Date(newAppointment.appointment_date);
      if (isNaN(appointmentDate.getTime())) {
        throw new Error('Invalid appointment date');
      }

      // Get vet details for validation
      const { data: vet, error: vetError } = await supabase
        .from('veterinarians')
        .select('id')
        .eq('name', newAppointment.vet_name)
        .single();

      if (vetError || !vet) {
        throw new Error('Selected veterinarian is not valid');
      }

      // Get pet details for validation
      const { data: pet, error: petError } = await supabase
        .from('pets')
        .select('id')
        .eq('id', newAppointment.pet_id)
        .eq('user_id', user.id)
        .single();

      if (petError || !pet) {
        throw new Error('Selected pet is not valid');
      }

      const { data, error } = await supabase
        .from('vet_appointments')
        .insert([{
          ...newAppointment,
          user_id: user.id,
          veterinarian_id: vet.id,
          status: 'scheduled'
        }])
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
        if (error.code === '23505') {
          throw new Error('You already have an appointment at this time');
        } else {
          throw new Error(`Failed to schedule appointment: ${error.message}`);
        }
      }

      if (!data) {
        throw new Error('No data returned from appointment creation');
      }

      toast.success('Appointment scheduled successfully');
      return data;
    },
    onError: (error) => {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      console.error('Appointment scheduling error:', errorMessage);
      toast.error(errorMessage);
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
  };
}
