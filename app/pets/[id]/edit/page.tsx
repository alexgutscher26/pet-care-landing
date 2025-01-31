'use client';

import { useParams } from 'next/navigation';
import { EditPetForm } from '@/components/pets/edit-pet-form';

export default function EditPetPage() {
  const params = useParams();
  const petId = params.id as string;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold tracking-tight">Edit Pet</h1>
      <EditPetForm petId={petId} />
    </div>
  );
}
