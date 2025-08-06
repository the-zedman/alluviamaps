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

  // Disable Mapbox analytics to prevent CORS errors
  mapboxgl.setRTLTextPlugin = () => {}
  
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
    attributionControl: true,
    trackResize: true,
    // Disable Mapbox events to prevent CORS errors
    cooperativeGestures: false
  })

  // Wait for map to load before adding controls
  map?.on('load', () => {
    // Add navigation controls
    map?.addControl(new mapboxgl.NavigationControl(), 'top-right')
    
    // Add fullscreen control
    map?.addControl(new mapboxgl.FullscreenControl(), 'top-right')
  })

  // Handle missing images
  map?.on('styleimagemissing', (e) => {
    if (e.id === 'marker-15') {
      // Create a simple custom marker using a data URL
      const canvas = document.createElement('canvas')
      canvas.width = 32
      canvas.height = 32
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        // Draw a simple circle marker
        ctx.fillStyle = '#ff0000'
        ctx.beginPath()
        ctx.arc(16, 16, 12, 0, 2 * Math.PI)
        ctx.fill()
        
        // Add white border
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2
        ctx.stroke()
        
        // Convert to data URL
        const dataURL = canvas.toDataURL()
        
        // Add the image to the map
        map?.addImage('marker-15', canvas as any, { pixelRatio: 1 })
        console.log('✅ Custom marker icon created and added')
      }
    }
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
    addTracksLayerInternal(tracks)
  } else {
    map.once('style.load', () => {
      addTracksLayerInternal(tracks)
    })
  }
}

// Fly to data area
export function flyToDataArea() {
  if (!map) return
  
  console.log('🗺️ Flying to data area...')
  
  // Fly to Victoria, Australia (where our sample data is)
  map.flyTo({
    center: [144.2802, -36.7589], // Bendigo area
    zoom: 8,
    duration: 2000
  })
  
  console.log('✅ Flew to data area')
}

// Fly to test data area
export function flyToTestData() {
  if (!map) return
  
  // Fly to Bendigo where our test data is
  map.flyTo({
    center: [144.2802, -36.7589], // Bendigo coordinates
    zoom: 12, // Closer zoom to see the markers
    duration: 2000
  })
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



  try {
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
      layout: {
        visibility: 'visible'
      },
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


  } catch (error) {
    console.error('❌ Error adding tracks layer:', error)
  }
}

// Add gold sites layer
export function addGoldSitesLayer(goldSites: GoldSite[]) {
  if (!map) return

  // Check if map style is already loaded
  if (map.isStyleLoaded()) {
    addGoldSitesLayerInternal(goldSites)
  } else {
    map.once('style.load', () => {
      addGoldSitesLayerInternal(goldSites)
    })
  }
}





// Internal function to add gold sites layer (called after style is loaded)
function addGoldSitesLayerInternal(goldSites: GoldSite[]) {
  if (!map) return

  // Remove existing layer if it exists
  if (map.getLayer(LAYER_IDS.GOLD_SITES_SYMBOL)) {
    map.removeLayer(LAYER_IDS.GOLD_SITES_SYMBOL)
  }
  if (map.getSource(SOURCE_IDS.GOLD_SITES)) {
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



  try {
    // Add source
    map.addSource(SOURCE_IDS.GOLD_SITES, {
      type: 'geojson',
      data: goldSitesGeoJSON
    })

    // Add circle layer instead of symbol layer
    map.addLayer({
      id: LAYER_IDS.GOLD_SITES_SYMBOL,
      type: 'circle',
      source: SOURCE_IDS.GOLD_SITES,
      layout: {
        visibility: 'visible'
      },
      paint: {
        'circle-radius': 8, // Normal size for gold markers
        'circle-color': [
          'case',
          ['==', ['get', 'gold_found'], true], '#fbbf24',
          '#78716c'
        ],
        'circle-stroke-color': '#ffffff',
        'circle-stroke-width': 3
      }
    })

    // Add text layer for labels
    map.addLayer({
      id: 'gold-sites-labels',
      type: 'symbol',
      source: SOURCE_IDS.GOLD_SITES,
      layout: {
        visibility: 'visible',
        'text-field': ['get', 'name'],
        'text-font': ['Open Sans Regular'],
        'text-offset': [0, 1.5],
        'text-anchor': 'top'
      },
      paint: {
        'text-color': '#374151',
        'text-halo-color': '#ffffff',
        'text-halo-width': 1
      }
    })


    
    // Fly to test data area to make sure we can see the markers
    setTimeout(() => {
      flyToTestData()
    }, 1000)
  } catch (error) {
    console.error('❌ Error adding gold sites layer:', error)
  }
}

// Toggle layer visibility
export function toggleLayer(layerId: string, visible: boolean) {
  if (!map) return
  
  const layer = map.getLayer(layerId)
  if (layer) {
    map.setLayoutProperty(layerId, 'visibility', visible ? 'visible' : 'none')
  }
}

// Set layer opacity
export function setLayerOpacity(layerId: string, opacity: number) {
  if (!map) return
  
  const layer = map.getLayer(layerId)
  if (layer) {
    // Update opacity based on layer type
    if (layer.type === 'line') {
      map.setPaintProperty(layerId, 'line-opacity', opacity)
    } else if (layer.type === 'circle') {
      map.setPaintProperty(layerId, 'circle-opacity', opacity)
    } else if (layer.type === 'symbol') {
      map.setPaintProperty(layerId, 'icon-opacity', opacity)
      map.setPaintProperty(layerId, 'text-opacity', opacity)
    }
  }
}

// Update color scheme
export function updateColorScheme(scheme: string) {
  if (!map) return
  
  const colorSchemes = {
    default: {
      tracks: '#3b82f6',
      goldSites: '#fbbf24',
      goldFound: '#f59e0b'
    },
    historical: {
      tracks: '#8b5cf6',
      goldSites: '#dc2626',
      goldFound: '#b91c1c'
    },
    accessibility: {
      tracks: '#059669',
      goldSites: '#dc2626',
      goldFound: '#7c2d12'
    }
  }
  
  const colors = colorSchemes[scheme as keyof typeof colorSchemes]
  
  // Update tracks layer color
  if (map.getLayer('tracks-layer')) {
    map.setPaintProperty('tracks-layer', 'line-color', colors.tracks)
  }
  
  // Update gold sites layer color
  if (map.getLayer('gold-sites-symbols')) {
    map.setPaintProperty('gold-sites-symbols', 'circle-color', [
      'case',
      ['==', ['get', 'gold_found'], true], colors.goldFound,
      colors.goldSites
    ])
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

 