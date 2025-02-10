
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
export const supabase = createClient(
  'https://your-project-url.supabase.co',  // Replace with your actual Supabase URL
  'your-anon-key'  // Replace with your actual Supabase anon/public key
);
