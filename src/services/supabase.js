import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://hoqgklytliogrmxtgiur.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhvcWdrbHl0bGlvZ3JteHRnaXVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkzNTAzNzIsImV4cCI6MjAyNDkyNjM3Mn0.tc-wwx8B29D-_Vpk5qn5hhYrViaULtCYWS0p9WWiARM';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
