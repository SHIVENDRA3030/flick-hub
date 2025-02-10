
import { createClient } from '@supabase/supabase-js';

// Initialize the Supabase client
export const supabase = createClient(
  'https://xdmmoudmqdlhqtcxlvbw.supabase.co',  // Your Supabase project URL
  'your-anon-key'  // Replace with your anon/public key (NOT the JWT token)
);
