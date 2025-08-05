<script lang="ts">
	console.log('🚀 +page.svelte script is loading...')
	
	import { onMount } from 'svelte'
	
	let testMessage = 'Hello World'
	
	onMount(() => {
		console.log('🚀 onMount called with test message:', testMessage)
	})
</script>

<svelte:head>
	<title>AlluviaMaps - Test Page</title>
</svelte:head>

<div class="min-h-screen bg-sediment-50 p-8">
	<h1 class="text-4xl font-bold text-sediment-900 mb-4">AlluviaMaps Test Page</h1>
	<p class="text-lg text-sediment-600 mb-8">If you can see this, the page is loading correctly.</p>
	
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