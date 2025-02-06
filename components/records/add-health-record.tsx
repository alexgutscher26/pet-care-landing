"use client"

import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { useHealthRecords } from "@/hooks/use-health-records"
import { usePets } from "@/hooks/use-pets"
import { format } from "date-fns"

export function AddHealthRecord() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [petId, setPetId] = useState<string>("")
  const [type, setType] = useState<string>("")
  const [date, setDate] = useState<string>("")
  const [nextDue, setNextDue] = useState<string>("")
  const [notes, setNotes] = useState<string>("")
  
  const { addRecord, isLoading } = useHealthRecords()
  const { pets, isLoading: isPetsLoading } = usePets()

  const handleSubmit = async () => {
    if (!petId || !type || !date) return

    await addRecord({
      pet_id: petId,
      type,
      date,
      next_due: nextDue || null,
      notes: notes || null,
    })

    // Reset form
    setPetId("")
    setType("")
    setDate("")
    setNextDue("")
    setNotes("")
    setIsExpanded(false)
  }

  return (
    <div className="mt-8 border-t pt-6">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-violet-600 hover:bg-violet-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Health Record
        </Button>
      ) : (
        <div className="space-y-6">
          <h2 className="text-lg font-semibold">Add New Health Record</h2>
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
              <label htmlFor="record-type" className="text-sm font-medium">
                Record Type
              </label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vaccination">Vaccination</SelectItem>
                  <SelectItem value="vet-visit">Vet Visit</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="next-due" className="text-sm font-medium">
                Next Due Date (Optional)
              </label>
              <input
                type="date"
                id="next-due"
                value={nextDue}
                onChange={(e) => setNextDue(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="notes" className="text-sm font-medium">
                Notes
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
                disabled={isLoading || isPetsLoading}
              >
                Cancel
              </Button>
              <Button 
                className="bg-violet-600 hover:bg-violet-700"
                onClick={handleSubmit}
                disabled={isLoading || isPetsLoading || !petId || !type || !date}
              >
                {isLoading ? "Saving..." : "Save Record"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
