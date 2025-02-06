import { Metadata } from "next"
import { HealthRecordsList } from "@/components/records/health-records-list"
import { AddHealthRecord } from "@/components/records/add-health-record"

export const metadata: Metadata = {
  title: "Pet Health Records | Pet Care",
  description: "Manage your pet's health records and medical history",
}

export default function RecordsPage() {
  return (
    <div className="container mx-auto py-6 px-4">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h1 className="text-2xl font-semibold mb-6">Pet Health Records</h1>
        <HealthRecordsList />
        <AddHealthRecord />
      </div>
    </div>
  )
}
