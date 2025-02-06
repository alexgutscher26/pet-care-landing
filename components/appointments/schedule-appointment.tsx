'use client';

import { Button } from "@/components/ui/button";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useVetAppointments } from "@/hooks/use-vet-appointments";
import { usePets } from "@/hooks/use-pets";
import { useVeterinarians } from "@/hooks/use-veterinarians";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { addHours, format, parse, startOfHour } from "date-fns";
import { toast } from "sonner";

const APPOINTMENT_TIMES = Array.from({ length: 12 }, (_, i) => {
  const time = addHours(startOfHour(new Date().setHours(9)), i);
  return format(time, 'HH:mm');
});

export function ScheduleAppointment() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [petId, setPetId] = useState("");
  const [vetId, setVetId] = useState("");
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");

  const router = useRouter();
  const { addAppointment, isAdding } = useVetAppointments();
  const { pets, isLoading: isPetsLoading } = usePets();
  const { veterinarians, isLoading: isVetsLoading } = useVeterinarians();

  const handleSubmit = async () => {
    if (!petId || !vetId || !purpose || !date || !time) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const appointmentDate = parse(
        `${date} ${time}`,
        'yyyy-MM-dd HH:mm',
        new Date()
      );

      // Validate the appointment date is in the future
      if (appointmentDate <= new Date()) {
        toast.error('Please select a future date and time');
        return;
      }

      // Find the selected veterinarian to get their name
      const selectedVet = veterinarians.find(v => v.id === vetId);
      if (!selectedVet) {
        toast.error('Selected veterinarian not found');
        return;
      }

      await addAppointment({
        pet_id: petId,
        vet_name: selectedVet.name,
        purpose,
        appointment_date: appointmentDate.toISOString(),
        notes: notes || null,
      });

      // Reset form
      setPetId("");
      setVetId("");
      setPurpose("");
      setDate("");
      setTime("");
      setNotes("");
      setIsExpanded(false);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Failed to schedule appointment:', error.message);
      } else {
        console.error('Failed to schedule appointment:', error);
      }
      // Error is handled by the hook with toast, but we can add a fallback
      toast.error('Failed to schedule appointment. Please try again.');
    }
  };

  return (
    <div>
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Schedule Appointment
        </Button>
      ) : (
        <div className="space-y-6 bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Schedule New Appointment</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="pet" className="text-sm font-medium">
                Pet
              </label>
              <Select value={petId} onValueChange={setPetId}>
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
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="vet-name" className="text-sm font-medium">
                  Veterinarian
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-500 hover:text-blue-600"
                  onClick={() => router.push('/veterinarians')}
                >
                  Manage Vets
                </Button>
              </div>
              <Select value={vetId} onValueChange={setVetId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select veterinarian" />
                </SelectTrigger>
                <SelectContent>
                  {veterinarians.map((vet) => (
                    <SelectItem key={vet.id} value={vet.id}>
                      {vet.name} {vet.clinic_name ? `(${vet.clinic_name})` : ''}
                    </SelectItem>
                  ))}
                  {veterinarians.length === 0 && (
                    <SelectItem value="" disabled>
                      No veterinarians added yet
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="purpose" className="text-sm font-medium">
                Purpose
              </label>
              <Select value={purpose} onValueChange={setPurpose}>
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="date" className="text-sm font-medium">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  min={format(new Date(), 'yyyy-MM-dd')}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="time" className="text-sm font-medium">
                  Time
                </label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    {APPOINTMENT_TIMES.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes (Optional)
              </label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add any additional notes..."
                className="resize-none"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsExpanded(false)}
                disabled={isAdding}
              >
                Cancel
              </Button>
              <Button
                className="bg-blue-500 hover:bg-blue-600"
                onClick={handleSubmit}
                disabled={isAdding || !petId || !vetId || !purpose || !date || !time}
              >
                {isAdding ? "Scheduling..." : "Schedule Appointment"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
