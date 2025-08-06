<script lang="ts">
	import { onMount } from 'svelte'
	import Map from '$lib/Map.svelte'
	import MapLegend from '$lib/MapLegend.svelte'
	import { fetchTracks, fetchGoldSites } from '$lib/data'
	
	import type { Track, GoldSite } from '$lib/supabase'

	let tracks: Track[] = []
	let goldSites: GoldSite[] = []
	let loading = true
	let showTracks = true
	let showGoldSites = true
	let tracksOpacity = 1.0
	let goldSitesOpacity = 1.0
	let colorScheme = 'default'
	let showLegend = false
	let searchQuery = ''

	onMount(async () => {
		try {
			const [tracksData, goldSitesData] = await Promise.all([
				fetchTracks(),
				fetchGoldSites()
			])
			
			tracks = tracksData
			goldSites = goldSitesData
			loading = false
			
					// Map loaded successfully
		setTimeout(() => {
			// Map is ready
		}, 2000) // Wait 2 seconds for map to load
			
		} catch (error) {
			console.error('❌ Error loading data:', error)
			loading = false
		}
	})
</script>

<svelte:head>
	<title>AlluviaMaps - Discover Hidden Tracks & Historical Mining Sites</title>
		
</svelte:head>

<!-- Map-First Landing Page -->
<div class="relative h-screen bg-sediment-50">
	<!-- Header -->
	<header class="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm border-b border-sediment-200">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
			<div class="flex items-center justify-between">
				<!-- Logo -->
				<div class="flex items-center space-x-3">
					<div class="w-8 h-8 bg-alluvia-600 rounded-lg flex items-center justify-center">
						<svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
						</svg>
					</div>
					<h1 class="text-xl font-bold text-sediment-900">AlluviaMaps</h1>
				</div>

				<!-- Search Bar -->
				<div class="flex-1 max-w-md mx-8">
					<div class="relative">
						<input
							bind:value={searchQuery}
							type="text"
							placeholder="Search tracks, gold sites..."
							class="w-full px-4 py-2 pl-10 bg-white border border-sediment-300 rounded-lg focus:ring-2 focus:ring-alluvia-500 focus:border-transparent"
						/>
						<svg class="absolute left-3 top-2.5 w-4 h-4 text-sediment-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
						</svg>
					</div>
				</div>

				<!-- User Actions -->
				<div class="flex items-center space-x-4">
					<button class="btn-secondary text-sm px-4 py-2">
						Sign In
					</button>
					<button class="btn-primary text-sm px-4 py-2">
						Sign Up
					</button>
				</div>
			</div>
		</div>
	</header>

	<!-- Map Container -->
	<div class="absolute inset-0 pt-20">
		{#if loading}
			<div class="flex items-center justify-center h-full">
				<div class="text-center">
					<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-alluvia-600 mx-auto mb-4"></div>
					<p class="text-sediment-600">Loading map...</p>
				</div>
			</div>
		{:else}
			<Map 
				{tracks} 
				{goldSites} 
				{showTracks} 
				{showGoldSites}
				{tracksOpacity}
				{goldSitesOpacity}
				{colorScheme}
				center={[144.2802, -36.7589]}
				zoom={10}
			/>
		{/if}
	</div>

	<!-- Enhanced Map Legend & Controls -->
	<div class="absolute top-24 left-4 z-20">
		{#if showLegend}
			<!-- Backdrop to handle clicks outside the legend -->
			<div 
				class="fixed inset-0 z-10" 
				on:click={() => showLegend = false}
			></div>
			<MapLegend
				bind:showTracks
				bind:showGoldSites
				bind:tracksOpacity
				bind:goldSitesOpacity
				bind:colorScheme
				on:tracksToggle={(e) => showTracks = e.detail.visible}
				on:goldSitesToggle={(e) => showGoldSites = e.detail.visible}
				on:tracksOpacity={(e) => tracksOpacity = e.detail.opacity}
				on:goldSitesOpacity={(e) => goldSitesOpacity = e.detail.opacity}
				on:colorSchemeChange={(e) => colorScheme = e.detail.scheme}
				on:showAll={() => { showTracks = true; showGoldSites = true }}
				on:hideAll={() => { showGoldSites = false; showTracks = false }}
				on:close={() => showLegend = false}
			/>
		{:else}
			<button
				class="bg-white rounded-lg shadow-lg p-3 hover:shadow-xl transition-shadow"
				on:click={() => showLegend = true}
				title="Map Layers & Legend"
			>
				<svg class="w-6 h-6 text-sediment-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
				</svg>
			</button>
		{/if}
	</div>

	<!-- Info Panel -->
	<div class="absolute bottom-4 left-4 right-4 z-20">
		<div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
			<div class="flex items-center justify-between">
				<div>
					<h3 class="text-lg font-semibold text-sediment-900">Discover Hidden Tracks</h3>
					<p class="text-sm text-sediment-600">Explore historical mining sites and bushwalking trails across Australia</p>
				</div>
				<div class="flex space-x-2">
					<button class="btn-secondary text-sm px-3 py-1">
						Learn More
					</button>
					<button class="btn-primary text-sm px-3 py-1">
						Start Exploring
					</button>
				</div>
			</div>
		</div>
	</div>
</div> 