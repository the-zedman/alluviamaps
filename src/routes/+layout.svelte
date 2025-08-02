<script lang="ts">
	import '../app.css';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<svelte:head>
	<title>AlluviaMaps - Advanced Mapping for Bushwalking & Gold Fossicking</title>
	<meta name="description" content="Discover hidden tracks, trails, and historical mining sites with AlluviaMaps. Advanced mapping for bushwalking and gold fossicking enthusiasts in Australia." />
</svelte:head>

<div class="min-h-screen bg-sediment-50">
	<slot />
</div> 