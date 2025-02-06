'use client';

import { Button } from "@/components/ui/button"
import { PencilIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useHealthRecords } from "@/hooks/use-health-records"
import { usePets } from "@/hooks/use-pets"
import { format } from "date-fns"
import { useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import type { HealthRecord } from "@/hooks/use-health-records";

export function HealthRecordsList() {
  const { healthRecords, isLoading, deleteHealthRecord, editHealthRecord, isEditing, isDeleting } = useHealthRecords();
  const { pets } = usePets();
  const [editingRecord, setEditingRecord] = useState<HealthRecord | null>(null);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-4 last:border-b-0 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/5" />
          </div>
        ))}
      </div>
    );
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this health record?')) {
      await deleteHealthRecord(id);
    }
  };

  const handleEdit = async (record: HealthRecord) => {
    if (editingRecord?.id === record.id) {
      await editHealthRecord({
        id: record.id,
        record_type: record.record_type,
        record_date: record.record_date,
        description: record.description,
        notes: record.notes,
        veterinarian_id: record.veterinarian_id
      });
      setEditingRecord(null);
    } else {
      setEditingRecord(record);
    }
  };

  const handleCancelEdit = () => {
    setEditingRecord(null);
  };

  return (
    <div className="space-y-4">
      {healthRecords.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No health records found.</p>
      ) : (
        healthRecords.map((record) => (
          <div key={record.id} className="border-b pb-4 last:border-b-0">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">
                  {record.pets.name} - {record.record_type}
                </h3>
                <p className="text-sm text-gray-500">
                  {format(new Date(record.record_date), 'PPP')}
                </p>
                {record.veterinarians && (
                  <p className="text-sm text-gray-500">
                    Vet: {record.veterinarians.name}
                    {record.veterinarians.clinic_name && ` (${record.veterinarians.clinic_name})`}
                  </p>
                )}
                <p className="text-sm">{record.description}</p>
                {record.notes && <p className="text-sm text-gray-600">{record.notes}</p>}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(record)}
                  disabled={isEditing}
                >
                  {editingRecord?.id === record.id ? (
                    <XMarkIcon className="h-4 w-4" />
                  ) : (
                    <PencilIcon className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(record.id)}
                  disabled={isDeleting}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {editingRecord?.id === record.id && (
              <div className="mt-4 space-y-4">
                <Select
                  value={editingRecord.record_type}
                  onValueChange={(value) =>
                    setEditingRecord({ ...editingRecord, record_type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select record type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Vaccination">Vaccination</SelectItem>
                    <SelectItem value="Check-up">Check-up</SelectItem>
                    <SelectItem value="Surgery">Surgery</SelectItem>
                    <SelectItem value="Medication">Medication</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  value={editingRecord.description}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />
                <Textarea
                  value={editingRecord.notes || ''}
                  onChange={(e) =>
                    setEditingRecord({
                      ...editingRecord,
                      notes: e.target.value,
                    })
                  }
                  placeholder="Notes (optional)"
                />
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelEdit}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleEdit(editingRecord)}>
                    Save Changes
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}
