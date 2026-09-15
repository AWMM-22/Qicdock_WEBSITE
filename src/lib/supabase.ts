import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  import.meta.env.VITE_SUPABASE_URL || 
  'https://sqkdwltnkgjbylwykbsb.supabase.co';

const supabaseAnonKey = 
  import.meta.env.VITE_SUPABASE_ANON_KEY || 
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNxa2R3bHRua2dqYnlsd3lrYnNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkwMzg4MTEsImV4cCI6MjEwNDYxNDgxMX0.8uYJ8KDXN1wikXv2oOwMcgEUI4LcVjRjiVeN2Bxnasc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


