'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PlusIcon, XMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useVeterinarians } from "@/hooks/use-veterinarians";
import { useAuth } from "@/lib/auth-context";

export function ManageVeterinarians() {
  const { user } = useAuth();
  const {
    veterinarians,
    isLoading,
    addVeterinarian,
    isAdding,
    editVeterinarian,
    isEditing,
    deleteVeterinarian,
    isDeleting,
  } = useVeterinarians();
  const [isExpanded, setIsExpanded] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    specialty: "",
    clinic_name: "",
    phone: "",
    email: "",
    address: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      specialty: "",
      clinic_name: "",
      phone: "",
      email: "",
      address: "",
    });
    setEditingId(null);
    setIsExpanded(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;

    try {
      if (editingId) {
        await editVeterinarian({
          id: editingId,
          ...formData,
        });
      } else {
        await addVeterinarian({
          ...formData,
          user_id: user.id,
        });
      }
      resetForm();
    } catch (error) {
      console.error("Error saving veterinarian:", error);
    }
  };

  const handleEdit = (vet: any) => {
    setFormData({
      name: vet.name,
      specialty: vet.specialty || "",
      clinic_name: vet.clinic_name || "",
      phone: vet.phone || "",
      email: vet.email || "",
      address: vet.address || "",
    });
    setEditingId(vet.id);
    setIsExpanded(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this veterinarian?")) {
      try {
        await deleteVeterinarian(id);
      } catch (error) {
        console.error("Error deleting veterinarian:", error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-b pb-4 last:border-b-0 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {!isExpanded ? (
        <Button
          onClick={() => setIsExpanded(true)}
          className="w-full bg-blue-500 hover:bg-blue-600"
        >
          <PlusIcon className="h-4 w-4 mr-2" />
          Add New Veterinarian
        </Button>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg p-6 shadow-sm border">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              {editingId ? "Edit Veterinarian" : "Add New Veterinarian"}
            </h2>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                resetForm();
                setIsExpanded(false);
              }}
            >
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                Name *
              </label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="specialty" className="text-sm font-medium">
                Specialty
              </label>
              <Input
                id="specialty"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="clinic" className="text-sm font-medium">
                Clinic Name
              </label>
              <Input
                id="clinic"
                value={formData.clinic_name}
                onChange={(e) =>
                  setFormData({ ...formData, clinic_name: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  Phone
                </label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">
                Address
              </label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsExpanded(false);
                }}
                disabled={isAdding || isEditing}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600"
                disabled={isAdding || isEditing || !formData.name}
              >
                {isAdding || isEditing ? "Saving..." : "Save Veterinarian"}
              </Button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {veterinarians.map((vet) => (
          <div
            key={vet.id}
            className="bg-white rounded-lg p-4 shadow-sm border space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium">{vet.name}</h3>
                {vet.specialty && (
                  <p className="text-sm text-gray-500">
                    Specialty: {vet.specialty}
                  </p>
                )}
                {vet.clinic_name && (
                  <p className="text-sm text-gray-500">{vet.clinic_name}</p>
                )}
                {(vet.phone || vet.email) && (
                  <p className="text-sm text-gray-500">
                    {vet.phone} {vet.phone && vet.email && "•"} {vet.email}
                  </p>
                )}
                {vet.address && (
                  <p className="text-sm text-gray-500">{vet.address}</p>
                )}
              </div>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleEdit(vet)}
                >
                  <PencilIcon className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-red-500 hover:text-red-600"
                  onClick={() => handleDelete(vet.id)}
                  disabled={isDeleting}
                >
                  <TrashIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {veterinarians.length === 0 && !isExpanded && (
          <div className="text-center py-8 text-muted-foreground">
            No veterinarians added yet. Add one to get started.
          </div>
        )}
      </div>
    </div>
  );
}
