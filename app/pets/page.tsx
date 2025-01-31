import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import { PetList } from '@/components/pets/pet-list';

export const metadata = {
  title: 'My Pets - Pet Care',
  description: 'Manage your pets information',
};

export default function PetsPage() {
  return (
    <div className="h-full p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">My Pets</h2>
        <Link href="/pets/add">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Pet
          </Button>
        </Link>
      </div>
      <PetList />
    </div>
  );
}
