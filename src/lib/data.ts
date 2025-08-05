import { supabase } from './supabase'
import type { Track, GoldSite } from './supabase'

// Cache for data
let tracksCache: Track[] | null = null
let goldSitesCache: GoldSite[] | null = null
let lastFetch = 0
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

// Fetch tracks from Supabase
export async function fetchTracks(useCache = true): Promise<Track[]> {
  console.log('🔍 fetchTracks called, useCache:', useCache)
  
  // Return cached data if available and fresh
  if (useCache && tracksCache && Date.now() - lastFetch < CACHE_DURATION) {
    console.log('📦 Returning cached tracks:', tracksCache.length)
    return tracksCache
  }

  // Return empty array if supabase is not available
  if (!supabase) {
    console.warn('❌ Supabase client not available')
    return []
  }

  try {
    console.log('🔍 Querying Supabase for tracks...')
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching tracks:', error)
      return tracksCache || []
    }

    console.log('✅ Tracks query successful, data:', data)
    console.log('📊 Tracks data details:', data?.map(track => ({
      id: track.id,
      title: track.title,
      coordinates: track.coordinates,
      coordinates_length: track.coordinates?.length
    })))
    
    tracksCache = data as Track[]
    lastFetch = Date.now()
    return tracksCache
  } catch (error) {
    console.error('❌ Error fetching tracks:', error)
    return tracksCache || []
  }
}

// Fetch gold sites from Supabase
export async function fetchGoldSites(useCache = true): Promise<GoldSite[]> {
  console.log('🔍 fetchGoldSites called, useCache:', useCache)
  
  // Return cached data if available and fresh
  if (useCache && goldSitesCache && Date.now() - lastFetch < CACHE_DURATION) {
    console.log('📦 Returning cached gold sites:', goldSitesCache.length)
    return goldSitesCache
  }

  // Return empty array if supabase is not available
  if (!supabase) {
    console.warn('❌ Supabase client not available')
    return []
  }

  try {
    console.log('🔍 Querying Supabase for gold sites...')
    const { data, error } = await supabase
      .from('gold_sites')
      .select('*')
      .eq('is_public', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error fetching gold sites:', error)
      return goldSitesCache || []
    }

    console.log('✅ Gold sites query successful, data:', data)
    console.log('📊 Gold sites data details:', data?.map(site => ({
      id: site.id,
      name: site.name,
      coordinates: site.coordinates,
      gold_found: site.gold_found
    })))
    
    goldSitesCache = data as GoldSite[]
    lastFetch = Date.now()
    return goldSitesCache
  } catch (error) {
    console.error('❌ Error fetching gold sites:', error)
    return goldSitesCache || []
  }
}

// Fetch data within a bounding box
export async function fetchDataInBounds(
  bounds: { north: number; south: number; east: number; west: number }
): Promise<{ tracks: Track[]; goldSites: GoldSite[] }> {
  try {
    // For now, fetch all data and filter client-side
    // In production, you'd want to use PostGIS for proper spatial queries
    const [tracks, goldSites] = await Promise.all([
      fetchTracks(),
      fetchGoldSites()
    ])

    // Filter tracks within bounds
    const filteredTracks = tracks.filter(track => {
      return track.coordinates.some(coord => {
        const [lng, lat] = coord
        return lat >= bounds.south && lat <= bounds.north && 
               lng >= bounds.west && lng <= bounds.east
      })
    })

    // Filter gold sites within bounds
    const filteredGoldSites = goldSites.filter(site => {
      const [lng, lat] = site.coordinates
      return lat >= bounds.south && lat <= bounds.north && 
             lng >= bounds.west && lng <= bounds.east
    })

    return { tracks: filteredTracks, goldSites: filteredGoldSites }
  } catch (error) {
    console.error('Error fetching data in bounds:', error)
    return { tracks: [], goldSites: [] }
  }
}

// Clear cache
export function clearCache() {
  tracksCache = null
  goldSitesCache = null
  lastFetch = 0
}

// Search tracks by title or description
export async function searchTracks(query: string): Promise<Track[]> {
  if (!supabase) {
    console.warn('❌ Supabase client not available')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('tracks')
      .select('*')
      .eq('is_public', true)
      .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error searching tracks:', error)
      return []
    }

    return data as Track[]
  } catch (error) {
    console.error('❌ Error searching tracks:', error)
    return []
  }
}

// Search gold sites by name or description
export async function searchGoldSites(query: string): Promise<GoldSite[]> {
  if (!supabase) {
    console.warn('❌ Supabase client not available')
    return []
  }

  try {
    const { data, error } = await supabase
      .from('gold_sites')
      .select('*')
      .eq('is_public', true)
      .or(`name.ilike.%${query}%,description.ilike.%${query}%`)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('❌ Error searching gold sites:', error)
      return []
    }

    return data as GoldSite[]
  } catch (error) {
    console.error('❌ Error searching gold sites:', error)
    return []
  }
} 