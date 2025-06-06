<script>
	import { onMount } from 'svelte';

	let shrinkingEnabled = true;

	function toggleShrinking() {
		shrinkingEnabled = !shrinkingEnabled;
	}

	// Fixed the content items creation
	let contentItems = Array(20)
		.fill(undefined, undefined, undefined)
		.map((_, i) => ({
			id: i, // Add proper id for each key
			text: `Item ${i + 1}`
		}));

	let contentVisible = false;

	onMount(() => {
		setTimeout(() => {
			contentVisible = true;
		}, 1000);
	});
</script>

<div class="flex flex-col min-h-screen bg-gray-100">
	<!-- Header area -->
	<div
		class={`bg-blue-500 p-4 text-white text-center ${shrinkingEnabled ? '' : 'flex-shrink-0'}`}
	>
		<h1 class="text-xl font-bold">Header</h1>
		<p class="text-sm">This area {shrinkingEnabled ? 'CAN' : 'CANNOT'} shrink</p>
	</div>

	<!-- Main content area - always grows/shrinks -->
	<div class="flex-1 overflow-y-auto bg-white p-4">
		<div class="bg-yellow-100 p-4 mb-4 rounded shadow">
			<button
				class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
				on:click={toggleShrinking}
			>
				Toggle Header/Footer Shrinking: {shrinkingEnabled ? 'ON' : 'OFF'}
			</button>

			<div class="mt-4 text-gray-700">
				<p class="font-bold">What's happening:</p>
				<p>
					• The blue header and footer {shrinkingEnabled ? 'CAN' : 'CANNOT'} shrink when content
					pushes against them
				</p>
				<p>
					• This demonstrates the effect of <code class="bg-gray-200 px-1 rounded"
						>flex-shrink-0</code
					>
				</p>
				<p>• Try scrolling down to see more content</p>
			</div>
		</div>

		<!-- Test content - properly structured with keys -->
		{#if contentVisible}
			<div class="space-y-4">
				{#each contentItems as item (item.id)}
					<div class="p-6 bg-gray-200 rounded shadow">
						<h2 class="text-lg font-bold">{item.text}</h2>
						<p>This is test content that creates pressure on the flex container.</p>
					</div>
				{/each}
			</div>
		{:else}
			<div class="text-center py-10 text-gray-500">Loading content...</div>
		{/if}
	</div>

	<!-- Footer area -->
	<div
		class={`bg-blue-500 p-4 text-white text-center ${shrinkingEnabled ? '' : 'flex-shrink-0'}`}
	>
		<p>Footer - This area {shrinkingEnabled ? 'CAN' : 'CANNOT'} shrink</p>
	</div>
</div>
