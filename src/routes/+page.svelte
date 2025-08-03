<script lang="ts">
	// Page component for AlluviaMaps homepage
</script>

<svelte:head>
	<title>AlluviaMaps - Discover Hidden Tracks & Historical Mining Sites</title>
</svelte:head>

<!-- Hero Section -->
<section class="relative bg-gradient-to-br from-alluvia-600 to-alluvia-800 text-white">
	<div class="absolute inset-0 bg-black opacity-20"></div>
	<div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
		<div class="text-center">
			<h1 class="text-4xl md:text-6xl font-bold mb-6">
				<span class="text-gradient">AlluviaMaps</span>
			</h1>
			<p class="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
				Discover hidden tracks, trails, and historical mining sites with advanced mapping technology
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center">
				<button class="btn-primary text-lg px-8 py-3">
					Start Exploring
				</button>
				<button class="btn-secondary text-lg px-8 py-3">
					Learn More
				</button>
			</div>
		</div>
	</div>
</section>

<!-- Features Section -->
<section class="py-16 bg-white">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-sediment-900 mb-4">
				Advanced Mapping Features
			</h2>
			<p class="text-lg text-sediment-600 max-w-2xl mx-auto">
				Uncover the hidden layers of Australia's landscape with cutting-edge GIS technology
			</p>
		</div>

		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
			<!-- LiDAR Data -->
			<div class="card">
				<div class="w-12 h-12 bg-alluvia-100 rounded-lg flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-alluvia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m-6 3l6-3"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-sediment-900 mb-2">LiDAR Data</h3>
				<p class="text-sediment-600">
					Reveal hidden tracks and historical mining sites under tree canopies with advanced LiDAR technology
				</p>
			</div>

			<!-- Gold Sites Database -->
			<div class="card">
				<div class="w-12 h-12 bg-alluvia-100 rounded-lg flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-alluvia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-sediment-900 mb-2">Gold Sites Database</h3>
				<p class="text-sediment-600">
					Crowdsourced fossicking locations with historical context and community insights
				</p>
			</div>

			<!-- Community Features -->
			<div class="card">
				<div class="w-12 h-12 bg-alluvia-100 rounded-lg flex items-center justify-center mb-4">
					<svg class="w-6 h-6 text-alluvia-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
					</svg>
				</div>
				<h3 class="text-xl font-semibold text-sediment-900 mb-2">Community Features</h3>
				<p class="text-sediment-600">
					Share tracks, discover new routes, and contribute to the community knowledge base
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Subscription Tiers -->
<section class="py-16 bg-sediment-50">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="text-center mb-16">
			<h2 class="text-3xl md:text-4xl font-bold text-sediment-900 mb-4">
				Choose Your Plan
			</h2>
			<p class="text-lg text-sediment-600 max-w-2xl mx-auto">
				Start exploring for free, or unlock premium features for advanced discovery
			</p>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			<!-- Free Tier -->
			<div class="card text-center">
				<h3 class="text-2xl font-bold text-sediment-900 mb-2">Free</h3>
				<p class="text-3xl font-bold text-alluvia-600 mb-6">$0<span class="text-lg text-sediment-600">/month</span></p>
				<ul class="text-left space-y-3 mb-8">
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Street maps & terrain
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						User-generated content
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Basic layer controls
					</li>
				</ul>
				<button class="btn-secondary w-full">Get Started</button>
			</div>

			<!-- Basic Tier -->
			<div class="card text-center border-2 border-alluvia-500 relative">
				<div class="absolute -top-3 left-1/2 transform -translate-x-1/2">
					<span class="bg-alluvia-500 text-white px-3 py-1 rounded-full text-sm font-medium">Popular</span>
				</div>
				<h3 class="text-2xl font-bold text-sediment-900 mb-2">Basic</h3>
				<p class="text-3xl font-bold text-alluvia-600 mb-6">$7.50<span class="text-lg text-sediment-600">/month</span></p>
				<ul class="text-left space-y-3 mb-8">
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Everything in Free
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Aerial imagery
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Advanced layer controls
					</li>
				</ul>
				<button class="btn-primary w-full">Start Basic</button>
			</div>

			<!-- Premium Tier -->
			<div class="card text-center">
				<h3 class="text-2xl font-bold text-sediment-900 mb-2">Premium</h3>
				<p class="text-3xl font-bold text-alluvia-600 mb-6">$12.50<span class="text-lg text-sediment-600">/month</span></p>
				<ul class="text-left space-y-3 mb-8">
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Everything in Basic
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						LiDAR data access
					</li>
					<li class="flex items-center">
						<svg class="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
							<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
						</svg>
						Gold sites database
					</li>
				</ul>
				<button class="btn-primary w-full">Start Premium</button>
			</div>
		</div>
	</div>
</section> 