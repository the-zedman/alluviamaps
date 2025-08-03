import mapboxgl from 'mapbox-gl'
import type { Track, GoldSite } from './supabase'

// Initialize Mapbox - will be set in initializeMap function

// Map configuration
export const MAP_CONFIG = {
  defaultCenter: [144.2802, -36.7589], // Bendigo, Victoria (longitude, latitude)
  defaultZoom: 10,
  minZoom: 5,
  maxZoom: 18
}

// Layer IDs
export const LAYER_IDS = {
  TRACKS: 'tracks-layer',
  GOLD_SITES: 'gold-sites-layer',
  TRACKS_SYMBOL: 'tracks-symbols',
  GOLD_SITES_SYMBOL: 'gold-sites-symbols'
}

// Source IDs
export const SOURCE_IDS = {
  TRACKS: 'tracks-source',
  GOLD_SITES: 'gold-sites-source'
}

// Map instance
let map: mapboxgl.Map | null = null

// Initialize map
export function initializeMap(container: string | HTMLElement): mapboxgl.Map | null {
  // Debug: log all available environment variables
  console.log('All import.meta.env keys:', Object.keys(import.meta.env))
  console.log('PUBLIC_MAPBOX_ACCESS_TOKEN value:', import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN)
  
  // Try multiple ways to get the token
  let mapboxToken = import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN || import.meta.env.VITE_PUBLIC_MAPBOX_ACCESS_TOKEN
  
  // Fallback to hardcoded token for now
  if (!mapboxToken) {
    mapboxToken = 'pk.eyJ1IjoiemVkbWFuIiwiYSI6ImNtZHYxdWtxczBxYTQybHBsZmY1b3ViZm0ifQ.z3FPyxaZAsejHhtypPjHsw'
    console.log('Using fallback token - environment variable not loaded')
  } else {
    console.log('Using environment variable token')
  }
  
  console.log('Mapbox token check:', mapboxToken ? 'Token found' : 'Token missing')
  
  if (!mapboxToken) {
    console.warn('Mapbox access token not available')
    return null
  }
  
  mapboxgl.accessToken = mapboxToken

  if (map) {
    map.remove()
  }

  map = new mapboxgl.Map({
    container,
    style: 'mapbox://styles/mapbox/outdoors-v12', // Outdoor style for bushwalking
    center: MAP_CONFIG.defaultCenter as [number, number],
    zoom: MAP_CONFIG.defaultZoom,
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom,
    attributionControl: true
  })

  // Wait for map to load before adding controls
  map.on('load', () => {
    // Add navigation controls
    map.addControl(new mapboxgl.NavigationControl(), 'top-right')
    
    // Add fullscreen control
    map.addControl(new mapboxgl.FullscreenControl(), 'top-right')
  })

  return map
}

// Get map instance
export function getMap(): mapboxgl.Map | null {
  return map
}

// Add tracks layer
export function addTracksLayer(tracks: Track[]) {
  console.log('🗺️ addTracksLayer called with tracks:', tracks.length, tracks)
  
  if (!map) {
    console.warn('❌ Map not available for tracks layer')
    return
  }

  // Check if map style is already loaded
  if (map.isStyleLoaded()) {
    console.log('✅ Map style already loaded, adding tracks layer...')
    addTracksLayerInternal(tracks)
  } else {
    console.log('⏳ Map style not loaded, waiting...')
    map.once('style.load', () => {
      console.log('✅ Map style loaded, adding tracks layer...')
      addTracksLayerInternal(tracks)
    })
  }
}

// Internal function to add tracks layer (called after style is loaded)
function addTracksLayerInternal(tracks: Track[]) {
  if (!map) return

  // Remove existing layer if it exists
  if (map.getLayer(LAYER_IDS.TRACKS)) {
    console.log('🗑️ Removing existing tracks layer')
    map.removeLayer(LAYER_IDS.TRACKS)
  }
  if (map.getSource(SOURCE_IDS.TRACKS)) {
    console.log('🗑️ Removing existing tracks source')
    map.removeSource(SOURCE_IDS.TRACKS)
  }

  // Convert tracks to GeoJSON
  const tracksGeoJSON = {
    type: 'FeatureCollection' as const,
    features: tracks.map(track => ({
      type: 'Feature' as const,
      geometry: {
        type: 'LineString' as const,
        coordinates: track.coordinates
      },
      properties: {
        id: track.id,
        title: track.title,
        description: track.description,
        difficulty: track.difficulty,
        distance_km: track.distance_km,
        tags: track.tags
      }
    }))
  }

  console.log('📊 Tracks GeoJSON:', tracksGeoJSON)

  // Add source
  map.addSource(SOURCE_IDS.TRACKS, {
    type: 'geojson',
    data: tracksGeoJSON
  })

  // Add layer
  map.addLayer({
    id: LAYER_IDS.TRACKS,
    type: 'line',
    source: SOURCE_IDS.TRACKS,
    paint: {
      'line-color': [
        'case',
        ['==', ['get', 'difficulty'], 'easy'], '#10b981',
        ['==', ['get', 'difficulty'], 'medium'], '#f59e0b',
        '#ef4444'
      ],
      'line-width': 3,
      'line-opacity': 0.8
    }
  })

  console.log('✅ Tracks layer added successfully')
}

// Add gold sites layer
export function addGoldSitesLayer(goldSites: GoldSite[]) {
  console.log('🗺️ addGoldSitesLayer called with gold sites:', goldSites.length, goldSites)
  
  if (!map) {
    console.warn('❌ Map not available for gold sites layer')
    return
  }

  // Check if map style is already loaded
  if (map.isStyleLoaded()) {
    console.log('✅ Map style already loaded, adding gold sites layer...')
    addGoldSitesLayerInternal(goldSites)
  } else {
    console.log('⏳ Map style not loaded, waiting...')
    map.once('style.load', () => {
      console.log('✅ Map style loaded, adding gold sites layer...')
      addGoldSitesLayerInternal(goldSites)
    })
  }
}

// Internal function to add gold sites layer (called after style is loaded)
function addGoldSitesLayerInternal(goldSites: GoldSite[]) {
  if (!map) return

  // Remove existing layer if it exists
  if (map.getLayer(LAYER_IDS.GOLD_SITES_SYMBOL)) {
    console.log('🗑️ Removing existing gold sites layer')
    map.removeLayer(LAYER_IDS.GOLD_SITES_SYMBOL)
  }
  if (map.getSource(SOURCE_IDS.GOLD_SITES)) {
    console.log('🗑️ Removing existing gold sites source')
    map.removeSource(SOURCE_IDS.GOLD_SITES)
  }

  // Convert gold sites to GeoJSON
  const goldSitesGeoJSON = {
    type: 'FeatureCollection' as const,
    features: goldSites.map(site => ({
      type: 'Feature' as const,
      geometry: {
        type: 'Point' as const,
        coordinates: site.coordinates
      },
      properties: {
        id: site.id,
        name: site.name,
        description: site.description,
        current_status: site.current_status,
        gold_found: site.gold_found
      }
    }))
  }

  console.log('📊 Gold sites GeoJSON:', goldSitesGeoJSON)

  // Add source
  map.addSource(SOURCE_IDS.GOLD_SITES, {
    type: 'geojson',
    data: goldSitesGeoJSON
  })

  // Add symbol layer
  map.addLayer({
    id: LAYER_IDS.GOLD_SITES_SYMBOL,
    type: 'symbol',
    source: SOURCE_IDS.GOLD_SITES,
    layout: {
      'icon-image': 'marker-15',
      'icon-size': 1.5,
      'text-field': ['get', 'name'],
      'text-font': ['Open Sans Regular'],
      'text-offset': [0, 1.5],
      'text-anchor': 'top'
    },
    paint: {
      'icon-color': [
        'case',
        ['==', ['get', 'gold_found'], true], '#fbbf24',
        '#78716c'
      ],
      'text-color': '#374151',
      'text-halo-color': '#ffffff',
      'text-halo-width': 1
    }
  })

  console.log('✅ Gold sites layer added successfully')
}

// Toggle layer visibility
export function toggleLayer(layerId: string, visible: boolean) {
  if (!map) return
  
  const layer = map.getLayer(layerId)
  if (layer) {
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
  }
}

// Fly to location
export function flyToLocation(coordinates: [number, number], zoom: number = 14) {
  if (!map) return
  
  map.flyTo({
    center: coordinates,
    zoom,
    duration: 2000
  })
}

// Get map bounds
export function getMapBounds(): mapboxgl.LngLatBounds | null {
  if (!map) return null
  return map.getBounds()
}

// Clean up map
export function cleanupMap() {
  if (map) {
    map.remove()
    map = null
  }
} 