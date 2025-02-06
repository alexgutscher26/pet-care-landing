export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      veterinarians: {
        Row: {
          id: string
          user_id: string
          name: string
          specialty: string | null
          clinic_name: string | null
          phone: string | null
          email: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          specialty?: string | null
          clinic_name?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          specialty?: string | null
          clinic_name?: string | null
          phone?: string | null
          email?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      pets: {
        Row: {
          id: string
          user_id: string
          name: string
          species: string
          breed: string | null
          birth_date: string | null
          weight: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          species: string
          breed?: string | null
          birth_date?: string | null
          weight?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          species?: string
          breed?: string | null
          birth_date?: string | null
          weight?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      vet_appointments: {
        Row: {
          id: string
          user_id: string
          pet_id: string
          veterinarian_id: string
          purpose: string
          appointment_date: string
          status: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_id: string
          veterinarian_id: string
          purpose: string
          appointment_date: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_id?: string
          veterinarian_id?: string
          purpose?: string
          appointment_date?: string
          status?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      health_records: {
        Row: {
          id: string
          user_id: string
          pet_id: string
          record_date: string
          record_type: string
          description: string
          veterinarian_id: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          pet_id: string
          record_date: string
          record_type: string
          description: string
          veterinarian_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          pet_id?: string
          record_date?: string
          record_type?: string
          description?: string
          veterinarian_id?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      profiles: {
        Row: {
          id: string
          user_id: string
          full_name: string | null
          avatar_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          full_name?: string | null
          avatar_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
