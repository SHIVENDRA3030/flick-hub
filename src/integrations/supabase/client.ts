
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xdmmoudmqdlhqtcxlvbw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhkbW1vdWRtcWRsaHF0Y3hsdmJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NzIyMTgsImV4cCI6MjA1MzA0ODIxOH0.GmBA7O9L71lqDMvuID_qhOe0G87HD_Nf5piIIzM5zpg";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
