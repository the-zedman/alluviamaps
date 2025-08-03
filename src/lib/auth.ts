import { writable } from 'svelte/store'
import { supabase, type User } from './supabase'
import type { User as SupabaseUser } from '@supabase/supabase-js'

// Create a writable store for the user
export const user = writable<User | null>(null)
export const loading = writable(true)

// Initialize auth state
export async function initializeAuth() {
  if (!supabase) {
    console.warn('Supabase client not available')
    loading.set(false)
    return
  }

  try {
    // Get initial session
    const { data: { session } } = await supabase.auth.getSession()
    
    if (session?.user) {
      await loadUserProfile(session.user)
    }
  } catch (error) {
    console.error('Error initializing auth:', error)
  } finally {
    loading.set(false)
  }
}

// Load user profile from database
async function loadUserProfile(supabaseUser: SupabaseUser) {
  if (!supabase) {
    console.warn('Supabase client not available')
    return
  }

  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', supabaseUser.id)
      .single()

    if (error) {
      console.error('Error loading user profile:', error)
      return
    }

    user.set(data as User)
  } catch (error) {
    console.error('Error loading user profile:', error)
  }
}

// Sign up
export async function signUp(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) throw error

    if (data.user) {
      // Create user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert({
          id: data.user.id,
          email: data.user.email,
          subscription_tier: 'free'
        })

      if (profileError) throw profileError

      await loadUserProfile(data.user)
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Sign in
export async function signIn(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) throw error

    if (data.user) {
      await loadUserProfile(data.user)
    }

    return { data, error: null }
  } catch (error) {
    return { data: null, error }
  }
}

// Sign out
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    
    user.set(null)
    return { error: null }
  } catch (error) {
    return { error }
  }
}

// Listen for auth changes
supabase.auth.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' && session?.user) {
    await loadUserProfile(session.user)
  } else if (event === 'SIGNED_OUT') {
    user.set(null)
  }
}) 