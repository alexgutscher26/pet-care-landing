'use client';

import { useState, useEffect, useMemo } from 'react';
import { useHealthRecords } from './use-health-records';
import { usePets } from './use-pets';
import { useVetAppointments } from './use-vet-appointments';

// TODO may change later IDS

type SearchResult = {
  type: 'pet' | 'record' | 'appointment';
  title: string;
  subtitle: string;
  date?: string;
  href: string;
};

export function useGlobalSearch(query: string) {
  const { pets = [] } = usePets() || {};
  const { appointments = [] } = useVetAppointments() || {};
  const { healthRecords = [] } = useHealthRecords() || {};
  const [isLoading, setIsLoading] = useState(false);

  // Handle loading state
  useEffect(() => {
    if (!query) {
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 300);
    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!query) return [];

    const lowerQuery = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search pets
    pets?.forEach((pet) => {
      if (
        pet.name.toLowerCase().includes(lowerQuery) ||
        pet.species.toLowerCase().includes(lowerQuery) ||
        pet.breed?.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: 'pet',
          title: pet.name,
          subtitle: `${pet.species}${pet.breed ? ` • ${pet.breed}` : ''}`,
          href: '/pets',
        });
      }
    });

    // Search health records
    healthRecords?.forEach((record) => {
      if (
        record.record_type.toLowerCase().includes(lowerQuery) ||
        record.description.toLowerCase().includes(lowerQuery) ||
        record.notes?.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: 'record',
          title: record.record_type,
          subtitle: record.description,
          date: new Date(record.record_date).toLocaleDateString(),
          href: '/records',
        });
      }
    });

    // Search appointments
    appointments?.forEach((appointment) => {
      if (
        appointment.purpose.toLowerCase().includes(lowerQuery) ||
        appointment.vet_name.toLowerCase().includes(lowerQuery) ||
        appointment.notes?.toLowerCase().includes(lowerQuery)
      ) {
        searchResults.push({
          type: 'appointment',
          title: appointment.purpose,
          subtitle: `With ${appointment.vet_name}`,
          date: new Date(appointment.appointment_date).toLocaleString(),
          href: '/vet-appointments',
        });
      }
    });

    return searchResults;
  }, [query, pets, appointments, healthRecords]);

  return {
    results,
    isLoading,
  };
}
