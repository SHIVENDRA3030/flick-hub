
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
export const supabase = createClient(
  'YOUR_SUPABASE_URL',  // Replace with your Supabase URL
  'YOUR_SUPABASE_ANON_KEY'  // Replace with your Supabase anon/public key
);
