import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from './database.types';

// Create a single supabase client for interacting with your database
export const supabase = createClientComponentClient<Database>();

// Export types for use in other files
export type { Database };
export type Tables = Database['public']['Tables'];
