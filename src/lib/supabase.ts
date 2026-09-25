import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 
  (import.meta as any).env?.VITE_SUPABASE_URL || 'https://uicpztuhoyfxkjjueymz.supabase.co';

const SUPABASE_ANON_KEY = 
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpY3B6dHVob3lmeGtqanVleW16Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAwODI4OTAsImV4cCI6MjEwNTY1ODg5MH0.TLZOg_josTXlCjWptNkyR0ydlMF9bHQqV6C31DMPipk';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
