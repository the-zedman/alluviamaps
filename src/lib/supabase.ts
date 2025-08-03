import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

// Debug environment variables
console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Missing')
console.log('Supabase Anon Key:', supabaseAnonKey ? 'Found' : 'Missing')

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// Database types
export interface User {
  id: string
  email: string
  created_at: string
  updated_at: string
  subscription_tier: 'free' | 'basic' | 'premium'
  profile: {
    display_name?: string
    avatar_url?: string
    bio?: string
  }
}

export interface Track {
  id: string
  title: string
  description: string
  coordinates: number[][]
  created_by: string
  created_at: string
  updated_at: string
  is_public: boolean
  tags: string[]
  difficulty: 'easy' | 'medium' | 'hard'
  distance_km: number
}

export interface GoldSite {
  id: string
  name: string
  description: string
  coordinates: [number, number]
  created_by: string
  created_at: string
  updated_at: string
  is_public: boolean
  historical_context: string
  current_status: 'active' | 'abandoned' | 'restricted'
  gold_found: boolean
} 