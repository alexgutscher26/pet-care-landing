import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline"

interface HealthRecord {
  id: string
  type: string
  date: string
  nextDue?: string
  notes?: string
}

const mockRecords: HealthRecord[] = [
  {
    id: "1",
    type: "Vaccination - Rabies",
    date: "May 15, 2023",
    nextDue: "May 15, 2024",
  },
  {
    id: "2",
    type: "Vet Visit - Annual Checkup",
    date: "June 1, 2023",
    notes: "Regular checkup completed. All vitals normal.",
  },
  {
    id: "3",
    type: "Medication - Heartworm Prevention",
    date: "Monthly Schedule",
  },
]

export function HealthRecordsList() {
  return (
    <div className="space-y-4">
      {mockRecords.map((record) => (
        <div
          key={record.id}
          className="border-b pb-4 last:border-b-0"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900">{record.type}</h3>
              <p className="text-sm text-gray-500">Date: {record.date}</p>
              {record.nextDue && (
                <p className="text-sm text-gray-500">Next due: {record.nextDue}</p>
              )}
              {record.notes && (
                <p className="text-sm text-gray-500">Notes: {record.notes}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon">
                <PencilIcon className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
