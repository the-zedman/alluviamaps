<script lang="ts">
	console.log('🚀 +page.svelte script is loading...')
	
	// Test 1: Basic Svelte import
	import { onMount } from 'svelte'
	console.log('✅ onMount imported successfully')
	
	// Test 2: Map component import
	import Map from '$lib/Map.svelte'
	console.log('✅ Map component imported successfully')
	
	// Test 3: Data functions import
	import { fetchTracks, fetchGoldSites } from '$lib/data'
	console.log('✅ Data functions imported successfully')
	
	// Test 4: Map functions import
	import { addTestMarker } from '$lib/map'
	console.log('✅ Map functions imported successfully')
	
	// Test 5: Types import
	import type { Track, GoldSite } from '$lib/supabase'
	console.log('✅ Types imported successfully')

	let testMessage = 'Hello World - Testing imports'

	onMount(() => {
		console.log('🚀 onMount called with test message:', testMessage)
	})
</script>

<svelte:head>
	<title>AlluviaMaps - Import Test</title>
</svelte:head>

<div class="min-h-screen bg-sediment-50 p-8">
	<h1 class="text-4xl font-bold text-sediment-900 mb-4">Import Test Page</h1>
	<p class="text-lg text-sediment-600 mb-8">Testing which import is causing the issue...</p>
	
	<div class="bg-white rounded-lg shadow-lg p-6">
		<h2 class="text-2xl font-semibold text-sediment-900 mb-4">Test Message</h2>
		<p class="text-sediment-700">{testMessage}</p>
		<button 
			on:click={() => { testMessage = 'Button clicked!'; console.log('Button clicked!') }}
			class="mt-4 px-4 py-2 bg-alluvia-600 text-white rounded-lg hover:bg-alluvia-700"
		>
			Click Me
		</button>
	</div>
</div> 