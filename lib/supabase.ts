import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database.types';

// Create a single supabase client for interacting with your database
export const supabase = createClientComponentClient<Database>();

// Export database types for use in other files
export type { Database };

// Export table types
export type Tables = Database['public']['Tables'];
export type TableRow<T extends keyof Tables> = Tables[T]['Row'];
export type TableInsert<T extends keyof Tables> = Tables[T]['Insert'];
export type TableUpdate<T extends keyof Tables> = Tables[T]['Update'];
