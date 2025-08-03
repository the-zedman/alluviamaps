import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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