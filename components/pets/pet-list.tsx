'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pet } from '@/lib/types';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, Dog, Scale, Calendar } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useQuery, useQueryClient } from '@tanstack/react-query';

export function PetList() {
  const { toast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: pets, isLoading } = useQuery<Pet[]>({
    queryKey: ['pets'],
    queryFn: async () => {
      const response = await fetch('/api/pets');
      if (!response.ok) {
        throw new Error('Failed to fetch pets');
      }
      return response.json();
    },
  });

  const handleDelete = async (petId: string) => {
    try {
      const response = await fetch(`/api/pets/${petId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete pet');
      }

      queryClient.invalidateQueries({ queryKey: ['pets'] });
      toast({
        title: "Success",
        description: "Pet has been deleted.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete pet. Please try again.",
      });
    }
  };

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

  if (!pets || pets.length === 0) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map((pet) => (
        <Card 
          key={pet.id} 
          className="overflow-hidden bg-white border shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="relative bg-amber-400 min-h-[12rem]">
            {pet.photo_url ? (
              <div className="relative w-full h-48">
                <Image
                  src={pet.photo_url}
                  alt={pet.name}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-48 flex items-center justify-center">
                <Dog className="h-12 w-12 text-amber-600" />
              </div>
            )}
            <div className="absolute top-2 right-2 flex gap-1">
              <Button
                variant="secondary"
                size="icon"
                onClick={() => router.push(`/pets/${pet.id}/edit`)}
                className="h-8 w-8 bg-white/90 hover:bg-white"
              >
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit {pet.name}</span>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete {pet.name}</span>
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete {pet.name}'s profile and all associated data.
                      This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(pet.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold mb-4">{pet.name}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Dog className="h-4 w-4" />
                <span>Breed: {pet.breed}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>Age: {pet.age} years</span>
              </div>
              <div className="flex items-center gap-2">
                <Scale className="h-4 w-4" />
                <span>Weight: {pet.weight} kg</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
