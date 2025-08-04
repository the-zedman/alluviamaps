<script lang="ts">
	import { onMount } from 'svelte'
	import Map from '$lib/Map.svelte'
	import { fetchTracks, fetchGoldSites } from '$lib/data'
	import { addTestMarker } from '$lib/map'
	import type { Track, GoldSite } from '$lib/supabase'

	let tracks: Track[] = []
	let goldSites: GoldSite[] = []
	let loading = true
	let showTracks = true
	let showGoldSites = true
	let searchQuery = ''

	onMount(async () => {
		console.log('🚀 Page mounted, fetching data...')
		
		try {
			const [tracksData, goldSitesData] = await Promise.all([
				fetchTracks(),
				fetchGoldSites()
			])
			
			tracks = tracksData
			goldSites = goldSitesData
			
			console.log('✅ Data loading complete')
			loading = false
			
			// Add very obvious test marker - DEPLOYMENT TRIGGER - UPDATED
			setTimeout(() => {
				addTestMarker()
			}, 2000) // Wait 2 seconds for map to load
			
		} catch (error) {
			console.error('❌ Error loading data:', error)
			loading = false
		}
	})
</script>

<svelte:head>
	<title>AlluviaMaps - Discover Hidden Tracks & Historical Mining Sites</title>
			<!-- Force redeploy - Test marker deployment trigger -->
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
				center={[144.2802, -36.7589]}
				zoom={10}
			/>
		{/if}
	</div>

	<!-- Layer Controls -->
	<div class="absolute top-24 left-4 z-20">
		<div class="bg-white rounded-lg shadow-lg p-4 space-y-3">
			<h3 class="text-sm font-semibold text-sediment-900 mb-2">Layers</h3>
			
			<label class="flex items-center space-x-2 cursor-pointer">
				<input 
					type="checkbox" 
					bind:checked={showTracks}
					class="rounded border-sediment-300 text-alluvia-600 focus:ring-alluvia-500"
				/>
				<span class="text-sm text-sediment-700">Tracks</span>
			</label>
			
			<label class="flex items-center space-x-2 cursor-pointer">
				<input 
					type="checkbox" 
					bind:checked={showGoldSites}
					class="rounded border-sediment-300 text-alluvia-600 focus:ring-alluvia-500"
				/>
				<span class="text-sm text-sediment-700">Gold Sites</span>
			</label>
		</div>
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