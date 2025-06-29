import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qpefqtbducwvyevxqdza.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFwZWZxdGJkdWN3dnlldnhxZHphIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEyMDkzNDYsImV4cCI6MjA2Njc4NTM0Nn0.-mVIeMftuSBhQeA4Maruk2cYAELLeYxlJufPWC4vNGQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface EmailSubscription {
  id?: number
  email: string
  created_at?: string
  source?: 'main' | 'bottom'
  is_active?: boolean
} 