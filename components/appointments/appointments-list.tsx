'use client';

import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useVetAppointments } from "@/hooks/use-vet-appointments";
import { format } from "date-fns";
import { useState } from "react";
import { usePets } from "@/hooks/use-pets";
import { useVeterinarians } from "@/hooks/use-veterinarians";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface VetAppointment {
  id: string;
  pet_id: string;
  veterinarian_id: string;
  purpose: string;
  appointment_date: string;
  status: string;
  notes: string | null;
  pets?: {
    name: string;
  } | null;
  veterinarians?: {
    name: string;
    clinic_name: string | null;
  } | null;
}

interface EditingAppointment {
  id: string;
  pet_id: string;
  veterinarian_id: string;
  purpose: string;
  appointment_date: string;
  notes: string | null;
}

export function AppointmentsList() {
  const { appointments, editAppointment, deleteAppointment, isDeleting } = useVetAppointments();
  const { pets } = usePets();
  const { veterinarians } = useVeterinarians();
  const [editingAppointment, setEditingAppointment] = useState<EditingAppointment | null>(null);

  const upcomingAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) > new Date()
  );

  const pastAppointments = appointments.filter(
    (appointment) => new Date(appointment.appointment_date) <= new Date()
  );

  const handleEdit = async () => {
    if (!editingAppointment) return;

    try {
      await editAppointment(editingAppointment);
      setEditingAppointment(null);
    } catch (error) {
      console.error('Failed to edit appointment:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAppointment(id);
    } catch (error) {
      console.error('Failed to delete appointment:', error);
    }
  };

  const renderAppointment = (appointment: VetAppointment) => {
    const isEditing = editingAppointment?.id === appointment.id;
    const appointmentDate = new Date(appointment.appointment_date);
    const isPast = appointmentDate <= new Date();

    if (isEditing) {
      return (
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <div className="space-y-2">
            <label htmlFor="pet" className="text-sm font-medium">
              Pet
            </label>
            <Select
              value={editingAppointment.pet_id}
              onValueChange={(value) =>
                setEditingAppointment({ ...editingAppointment, pet_id: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select pet" />
              </SelectTrigger>
              <SelectContent>
                {pets.map((pet) => (
                  <SelectItem key={pet.id} value={pet.id}>
                    {pet.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="vet-name" className="text-sm font-medium">
              Veterinarian
            </label>
            <Select
              value={editingAppointment.veterinarian_id}
              onValueChange={(value) =>
                setEditingAppointment({ ...editingAppointment, veterinarian_id: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select veterinarian" />
              </SelectTrigger>
              <SelectContent>
                {veterinarians.map((vet) => (
                  <SelectItem key={vet.id} value={vet.id}>
                    {vet.name} {vet.clinic_name ? `(${vet.clinic_name})` : ''}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="purpose" className="text-sm font-medium">
              Purpose
            </label>
            <Select
              value={editingAppointment.purpose}
              onValueChange={(value) =>
                setEditingAppointment({ ...editingAppointment, purpose: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select purpose" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="General Checkup">General Checkup</SelectItem>
                <SelectItem value="Vaccination">Vaccination</SelectItem>
                <SelectItem value="Illness">Illness</SelectItem>
                <SelectItem value="Surgery">Surgery</SelectItem>
                <SelectItem value="Follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="notes" className="text-sm font-medium">
              Notes (Optional)
            </label>
            <Textarea
              value={editingAppointment.notes || ''}
              onChange={(e) =>
                setEditingAppointment({
                  ...editingAppointment,
                  notes: e.target.value,
                })
              }
              placeholder="Add any additional notes..."
              className="resize-none"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setEditingAppointment(null)}
            >
              Cancel
            </Button>
            <Button onClick={handleEdit}>Save Changes</Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium text-gray-900">
              {appointment.veterinarians?.name || "Unknown Veterinarian"}
              {appointment.veterinarians?.clinic_name && (
                <span className="text-sm text-gray-500 ml-1">
                  ({appointment.veterinarians.clinic_name})
                </span>
              )}
              {" - "}
              {appointment.purpose}
            </h3>
            <span className="text-sm text-gray-500">
              for {appointment.pets?.name || "Unknown Pet"}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            {format(appointmentDate, 'MMM d, yyyy - h:mm a')}
          </p>
          {appointment.notes && (
            <p className="text-sm text-gray-500 mt-1">
              Notes: {appointment.notes}
            </p>
          )}
        </div>
        {!isPast && (
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setEditingAppointment(appointment)}
            >
              Edit
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(appointment.id)}
              disabled={isDeleting}
              className="text-red-500 hover:text-red-600"
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold mb-4">Upcoming Appointments</h2>
        <div className="space-y-4">
          {upcomingAppointments.length === 0 ? (
            <p className="text-sm text-gray-500">No upcoming appointments</p>
          ) : (
            upcomingAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg p-4 shadow-sm border"
              >
                {renderAppointment(appointment)}
              </div>
            ))
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Past Appointments</h2>
        <div className="space-y-4">
          {pastAppointments.length === 0 ? (
            <p className="text-sm text-gray-500">No past appointments</p>
          ) : (
            pastAppointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-lg p-4 shadow-sm border"
              >
                {renderAppointment(appointment)}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
