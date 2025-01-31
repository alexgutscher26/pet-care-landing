export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: number;
  weight: number;
  photo_url?: string;
  description?: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}
