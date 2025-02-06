import { ManageVeterinarians } from "@/components/appointments/manage-veterinarians";

export default function VeterinariansPage() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">My Veterinarians</h1>
          <p className="text-muted-foreground">
            Manage your trusted veterinarians for scheduling appointments
          </p>
        </div>

        <ManageVeterinarians />
      </div>
    </div>
  );
}
