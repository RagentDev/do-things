<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';
	import TestTailWind from '$lib/components/TestTailWind.svelte';
	import BottomBar from '$lib/components/BottomBar.svelte';
	import DialogConsole from '$lib/components/console/DialogConsole.svelte';
	import { isDev } from '$lib/config.js';
	import { dailyGoals } from '$lib/runes/dailyGoalsRunes.svelte';
	import { logger } from '$lib/runes/loggerRunes.svelte';

	// Initialize persistence when component mounts
	onMount(() => {
		logger?.initialize();
		dailyGoals.initialize();
	});
</script>

<svelte:head>
	<title>Do Things</title>
</svelte:head>

<div class="flex flex-col h-screen overflow-hidden">
	<!-- Safe Area Spacer -->
	<div class="w-full bg-gray-400 flex-shrink-0" style="height: var(--sat);"></div>

	<!-- Top Bar -->
	<div class="flex-shrink-0">
		<TestTailWind />
	</div>

	<!-- Content Area - NOW SCROLLABLE -->
	<div class="flex-1 overflow-y-auto">
		<div class="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-purple-600">
			<InstallPrompt />
		</div>
		<slot />
	</div>

	<!-- Bottom Bar -->
	<div class="flex-shrink-0">
		<BottomBar />
	</div>

	<!-- Bottom Safe Area -->
	<div class="w-full bg-gray-400 flex-shrink-0" style="height: var(--sab);"></div>
</div>

{#if isDev}
	<DialogConsole />
{/if}
