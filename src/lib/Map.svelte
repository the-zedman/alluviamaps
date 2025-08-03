<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import { initializeMap, addTracksLayer, addGoldSitesLayer, cleanupMap, toggleLayer, flyToLocation } from './map'
  import type { Track, GoldSite } from './supabase'
  import 'mapbox-gl/dist/mapbox-gl.css'

  // Props
  export let tracks: Track[] = []
  export let goldSites: GoldSite[] = []
  export let showTracks = true
  export let showGoldSites = true
  export let center: [number, number] = [-36.7589, 144.2802] // Bendigo
  export let zoom = 10

  let mapContainer: HTMLDivElement
  let map: any

  // Layer visibility
  $: if (map) {
    toggleLayer('tracks-layer', showTracks)
    toggleLayer('gold-sites-symbols', showGoldSites)
  }

  // Update tracks when data changes
  $: if (map && tracks.length > 0 && showTracks) {
    addTracksLayer(tracks)
  }

  // Update gold sites when data changes
  $: if (map && goldSites.length > 0 && showGoldSites) {
    addGoldSitesLayer(goldSites)
  }

  onMount(() => {
    if (mapContainer) {
      map = initializeMap(mapContainer)
      
      if (map) {
        // Add initial data if available
        if (tracks.length > 0 && showTracks) {
          addTracksLayer(tracks)
        }
        
        if (goldSites.length > 0 && showGoldSites) {
          addGoldSitesLayer(goldSites)
        }

        // Fly to center if provided
        if (center) {
          flyToLocation(center, zoom)
        }
      }
    }
  })

  onDestroy(() => {
    cleanupMap()
  })

  // Expose map methods
  export function flyTo(coordinates: [number, number], zoomLevel: number = 14) {
    flyToLocation(coordinates, zoomLevel)
  }

  export function toggleTracksLayer(visible: boolean) {
    showTracks = visible
  }

  export function toggleGoldSitesLayer(visible: boolean) {
    showGoldSites = visible
  }
</script>

<div 
  bind:this={mapContainer} 
  class="w-full h-full min-h-[400px] rounded-lg shadow-lg"
  role="application"
  aria-label="Interactive map showing tracks and gold sites"
>
  <!-- Map will be rendered here -->
</div>

<style>
  :global(.mapboxgl-ctrl-top-right) {
    top: 1rem;
    right: 1rem;
  }
  
  :global(.mapboxgl-ctrl-group) {
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }
</style> 