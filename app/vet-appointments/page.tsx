import { ScheduleAppointment } from "@/components/appointments/schedule-appointment";
import { AppointmentsList } from "@/components/appointments/appointments-list";

export default function AppointmentsPage() {
  return (
    <div className="container mx-auto py-8 max-w-3xl">
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold">Vet Appointments</h1>
          <p className="text-muted-foreground">
            Schedule and manage your pet's veterinary appointments
          </p>
        </div>
        <ScheduleAppointment />
        <AppointmentsList />
      </div>
    </div>
  );
}
