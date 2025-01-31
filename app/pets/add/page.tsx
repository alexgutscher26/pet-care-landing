import { AddPetForm } from '@/components/pets/add-pet-form';

export const metadata = {
  title: 'Add Pet - Pet Care',
  description: 'Add your pet details to our system',
};

export default function AddPetPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-2xl mx-auto">
        <AddPetForm />
      </div>
    </div>
  );
}
