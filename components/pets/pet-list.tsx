'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Pet } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PetList() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets');
        if (!response.ok) {
          throw new Error('Failed to fetch pets');
        }
        const data = await response.json();
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPets();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="overflow-hidden">
            <CardHeader className="space-y-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-24 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold mb-2">No pets found</h3>
        <p className="text-muted-foreground">
          Add your first pet to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {pets.map((pet) => (
        <Card key={pet.id} className="overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{pet.name}</span>
              <span className="text-sm font-normal text-muted-foreground">
                {pet.age} years old
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {pet.photo_url && (
              <div className="relative w-full h-48">
                <Image
                  src={pet.photo_url}
                  alt={pet.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
            )}
            <div className="space-y-1">
              <p className="text-sm font-medium">Breed: {pet.breed}</p>
              <p className="text-sm font-medium">Weight: {pet.weight} kg</p>
              {pet.description && (
                <p className="text-sm text-muted-foreground">{pet.description}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
