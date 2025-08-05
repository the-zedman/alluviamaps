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
  let mapError = false
  let mapLoading = true
  let tracksAdded = false
  let goldSitesAdded = false

  // Handle layer visibility changes
  $: if (map && tracksAdded) {
    setTimeout(() => {
      toggleLayer('tracks-layer', showTracks)
    }, 100) // Small delay to ensure layer is fully added
  }

  $: if (map && goldSitesAdded) {
    setTimeout(() => {
      toggleLayer('gold-sites-symbols', showGoldSites)
    }, 100) // Small delay to ensure layer is fully added
  }

  // Handle tracks data changes - only add once
  $: if (map && tracks.length > 0 && showTracks && !tracksAdded) {
    addTracksLayer(tracks)
    tracksAdded = true
  }

  // Handle gold sites data changes - only add once
  $: if (map && goldSites.length > 0 && showGoldSites && !goldSitesAdded) {
    addGoldSitesLayer(goldSites)
    goldSitesAdded = true
  }

  onMount(() => {
    if (mapContainer) {
      map = initializeMap(mapContainer)
      
      if (map) {
        mapLoading = false
        
        // Add initial data if available
        if (tracks.length > 0 && showTracks) {
          addTracksLayer(tracks)
          tracksAdded = true
        }
        
        if (goldSites.length > 0 && showGoldSites) {
          addGoldSitesLayer(goldSites)
          goldSitesAdded = true
        }

        // Fly to center if provided
        if (center) {
          flyToLocation(center, zoom)
        }
      } else {
        mapError = true
        mapLoading = false
        console.error('Failed to initialize map - Mapbox token may be missing')
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
  {#if mapError}
    <div class="flex items-center justify-center h-full bg-sediment-100 rounded-lg">
      <div class="text-center">
        <div class="w-16 h-16 bg-sediment-300 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8 text-sediment-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-sediment-900 mb-2">Map Unavailable</h3>
        <p class="text-sm text-sediment-600">Mapbox configuration is required to display the interactive map.</p>
      </div>
    </div>
  {:else if mapLoading}
    <div class="flex items-center justify-center h-full bg-sediment-100 rounded-lg">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-alluvia-600 mx-auto mb-4"></div>
        <p class="text-sediment-600">Initializing map...</p>
      </div>
    </div>
  {:else}
    <!-- Map will be rendered here -->
  {/if}
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