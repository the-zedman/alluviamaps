<script lang="ts">
  import { createEventDispatcher } from 'svelte'
  
  const dispatch = createEventDispatcher()
  
  // Props
  export let showTracks = true
  export let showGoldSites = true
  export let tracksOpacity = 1.0
  export let goldSitesOpacity = 1.0
  export let colorScheme = 'default' // default, historical, accessibility
  
  // Color schemes
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
  
  // Layer groups
  const layerGroups = [
    {
      id: 'tracks',
      name: 'Walking Trails',
      description: 'Historic and modern walking trails',
      icon: 'path',
      color: colorSchemes[colorScheme].tracks
    },
    {
      id: 'gold-sites',
      name: 'Gold Mining Sites',
      description: 'Historical and current gold mining locations',
      icon: 'circle',
      color: colorSchemes[colorScheme].goldSites
    }
  ]
  
  // Handle layer toggle
  function toggleLayer(layerId: string) {
    if (layerId === 'tracks') {
      showTracks = !showTracks
      dispatch('tracksToggle', { visible: showTracks })
    } else if (layerId === 'gold-sites') {
      showGoldSites = !showGoldSites
      dispatch('goldSitesToggle', { visible: showGoldSites })
    }
  }
  
  // Handle opacity change
  function updateOpacity(layerId: string, value: number) {
    if (layerId === 'tracks') {
      tracksOpacity = value
      dispatch('tracksOpacity', { opacity: value })
    } else if (layerId === 'gold-sites') {
      goldSitesOpacity = value
      dispatch('goldSitesOpacity', { opacity: value })
    }
  }

  // Handle close button click
  function handleClose(event: MouseEvent) {
    event.preventDefault()
    event.stopPropagation()
    dispatch('close')
  }
  
  // Handle color scheme change
  function changeColorScheme(scheme: string) {
    colorScheme = scheme
    dispatch('colorSchemeChange', { scheme })
  }
</script>

<div class="bg-white rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto" on:click={(e) => e.stopPropagation()}>
  <!-- Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-semibold text-sediment-900">Map Layers</h3>
    <button 
      class="text-sediment-400 hover:text-sediment-600"
      on:click={handleClose}
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
      </svg>
    </button>
  </div>
  
  <!-- Color Scheme Selector -->
  <div class="mb-4">
    <label class="block text-sm font-medium text-sediment-700 mb-2">Color Scheme</label>
    <div class="flex space-x-2">
      {#each Object.keys(colorSchemes) as scheme}
        <button
          class="px-3 py-1 text-xs rounded-full border transition-colors {colorScheme === scheme ? 'bg-alluvia-100 border-alluvia-300 text-alluvia-700' : 'bg-white border-sediment-300 text-sediment-600 hover:border-sediment-400'}"
          on:click={() => changeColorScheme(scheme)}
        >
          {scheme.charAt(0).toUpperCase() + scheme.slice(1)}
        </button>
      {/each}
    </div>
  </div>
  
  <!-- Layer Groups -->
  <div class="space-y-4">
    {#each layerGroups as group}
      <div class="border border-sediment-200 rounded-lg p-3">
        <!-- Layer Header -->
        <div class="flex items-center justify-between mb-2">
          <div class="flex items-center space-x-2">
            <div 
              class="w-4 h-4 rounded-full border-2 border-white shadow-sm"
              style="background-color: {group.color}"
            ></div>
            <span class="text-sm font-medium text-sediment-900">{group.name}</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={group.id === 'tracks' ? showTracks : showGoldSites}
              on:change={() => toggleLayer(group.id)}
              class="sr-only peer"
            />
            <div class="w-9 h-5 bg-sediment-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-alluvia-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-alluvia-600"></div>
          </label>
        </div>
        
        <!-- Layer Description -->
        <p class="text-xs text-sediment-600 mb-3">{group.description}</p>
        
        <!-- Opacity Slider -->
        <div class="space-y-2">
          <div class="flex justify-between text-xs text-sediment-600">
            <span>Opacity</span>
            <span>{Math.round((group.id === 'tracks' ? tracksOpacity : goldSitesOpacity) * 100)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={group.id === 'tracks' ? tracksOpacity : goldSitesOpacity}
            on:input={(e) => updateOpacity(group.id, parseFloat(e.target.value))}
            on:click={(e) => e.stopPropagation()}
            class="w-full h-2 bg-sediment-200 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
      </div>
    {/each}
  </div>
  
  <!-- Legend -->
  <div class="mt-4 pt-4 border-t border-sediment-200">
    <h4 class="text-sm font-medium text-sediment-900 mb-2">Legend</h4>
    <div class="space-y-2 text-xs">
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" style="background-color: {colorSchemes[colorScheme].tracks}"></div>
        <span class="text-sediment-700">Walking Trail</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" style="background-color: {colorSchemes[colorScheme].goldSites}"></div>
        <span class="text-sediment-700">Gold Mining Site</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 rounded-full" style="background-color: {colorSchemes[colorScheme].goldFound}"></div>
        <span class="text-sediment-700">Gold Found Here</span>
      </div>
    </div>
  </div>
  
  <!-- Quick Actions -->
  <div class="mt-4 pt-4 border-t border-sediment-200">
    <div class="flex space-x-2">
      <button
        class="flex-1 px-3 py-2 text-xs bg-alluvia-50 text-alluvia-700 rounded-md hover:bg-alluvia-100 transition-colors"
        on:click={() => {
          showTracks = true
          showGoldSites = true
          dispatch('showAll')
        }}
      >
        Show All
      </button>
      <button
        class="flex-1 px-3 py-2 text-xs bg-sediment-50 text-sediment-700 rounded-md hover:bg-sediment-100 transition-colors"
        on:click={() => {
          showTracks = false
          showGoldSites = false
          dispatch('hideAll')
        }}
      >
        Hide All
      </button>
    </div>
  </div>
</div>

<style>
  .slider::-webkit-slider-thumb {
    appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #0ea5e9;
    cursor: pointer;
  }
  
  .slider::-moz-range-thumb {
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #0ea5e9;
    cursor: pointer;
    border: none;
  }
</style> 