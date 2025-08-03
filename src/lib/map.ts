import mapboxgl from 'mapbox-gl'
import type { Track, GoldSite } from './supabase'

// Initialize Mapbox
const mapboxToken = import.meta.env.PUBLIC_MAPBOX_ACCESS_TOKEN
if (mapboxToken) {
  mapboxgl.accessToken = mapboxToken
}

// Map configuration
export const MAP_CONFIG = {
  defaultCenter: [-36.7589, 144.2802], // Bendigo, Victoria
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
  if (!mapboxgl.accessToken) {
    console.warn('Mapbox access token not available')
    return null
  }

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

  // Add navigation controls
  map.addControl(new mapboxgl.NavigationControl(), 'top-right')
  
  // Add fullscreen control
  map.addControl(new mapboxgl.FullscreenControl(), 'top-right')

  return map
}

// Get map instance
export function getMap(): mapboxgl.Map | null {
  return map
}

// Add tracks layer
export function addTracksLayer(tracks: Track[]) {
  if (!map) return

  // Remove existing layer if it exists
  if (map.getLayer(LAYER_IDS.TRACKS)) {
    map.removeLayer(LAYER_IDS.TRACKS)
  }
  if (map.getSource(SOURCE_IDS.TRACKS)) {
    map.removeSource(SOURCE_IDS.TRACKS)
  }

  // Convert tracks to GeoJSON
  const tracksGeoJSON = {
    type: 'FeatureCollection',
    features: tracks.map(track => ({
      type: 'Feature',
      geometry: {
        type: 'LineString',
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
}

// Add gold sites layer
export function addGoldSitesLayer(goldSites: GoldSite[]) {
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
    type: 'FeatureCollection',
    features: goldSites.map(site => ({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: site.coordinates
      },
      properties: {
        id: site.id,
        name: site.name,
        description: site.description,
        current_status: site.current_status,
        gold_found: site.gold_found,
        site_type: site.site_type
      }
    }))
  }

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