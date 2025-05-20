import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vtjbtkdwtaljjznwfblm.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0amJ0a2R3dGFsamp6bndmYmxtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1NzQ2MTcsImV4cCI6MjA2MzE1MDYxN30.XfzZLAqK801rwPC9AlmIsQkANswsjVk350X96MS6sEc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);