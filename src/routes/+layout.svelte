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

<!-- Floating Orbs -->
<div class="floating-orbs"></div>

<div class="flex flex-col h-screen overflow-hidden">
	<!-- Safe Area Spacer -->
	<div class="top-safe-area w-full flex-shrink-0" style="height: var(--sat);"></div>

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
	<div class="bottom-safe-area w-full flex-shrink-0" style="height: var(--sab);"></div>
</div>

{#if isDev}
	<DialogConsole />
{/if}

<style>
	.top-safe-area {
		color: var(--bg-top-primary);
	}

	.bottom-safe-area {
		color: var(--bg-bottom-primary);
	}

	.floating-orbs {
		--orb-primary: #bb62ff;
		--orb-secondary: #0077ff;
		--orb-tertiary: #1622ff;

		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1;
		background-image:
            /* 6 Big orbs */
			radial-gradient(
				circle 120px at 15% 20%,
				color-mix(in srgb, var(--orb-primary) 25%, transparent) 0%,
				color-mix(in srgb, var(--orb-primary) 8%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 110px at 80% 30%,
				color-mix(in srgb, var(--orb-secondary) 30%, transparent) 0%,
				color-mix(in srgb, var(--orb-secondary) 10%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 130px at 30% 70%,
				color-mix(in srgb, var(--orb-tertiary) 28%, transparent) 0%,
				color-mix(in srgb, var(--orb-tertiary) 9%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 100px at 75% 80%,
				color-mix(in srgb, var(--orb-primary) 32%, transparent) 0%,
				color-mix(in srgb, var(--orb-primary) 11%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 115px at 10% 60%,
				color-mix(in srgb, var(--orb-secondary) 26%, transparent) 0%,
				color-mix(in srgb, var(--orb-secondary) 8%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 125px at 90% 15%,
				color-mix(in srgb, var(--orb-tertiary) 29%, transparent) 0%,
				color-mix(in srgb, var(--orb-tertiary) 10%, transparent) 50%,
				transparent 70%
			);
	}

	.floating-orbs::before {
		content: '';
		position: absolute;
		inset: 0;
		background-image:
            /* 6 Small orbs */
			radial-gradient(
				circle 40px at 40% 25%,
				color-mix(in srgb, var(--orb-primary) 18%, transparent) 0%,
				color-mix(in srgb, var(--orb-primary) 5%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 35px at 70% 40%,
				color-mix(in srgb, var(--orb-secondary) 22%, transparent) 0%,
				color-mix(in srgb, var(--orb-secondary) 6%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 45px at 20% 50%,
				color-mix(in srgb, var(--orb-tertiary) 20%, transparent) 0%,
				color-mix(in srgb, var(--orb-tertiary) 6%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 38px at 85% 65%,
				color-mix(in srgb, var(--orb-primary) 16%, transparent) 0%,
				color-mix(in srgb, var(--orb-primary) 4%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 42px at 25% 85%,
				color-mix(in srgb, var(--orb-secondary) 19%, transparent) 0%,
				color-mix(in srgb, var(--orb-secondary) 5%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 36px at 60% 10%,
				color-mix(in srgb, var(--orb-tertiary) 17%, transparent) 0%,
				color-mix(in srgb, var(--orb-tertiary) 5%, transparent) 50%,
				transparent 70%
			);
	}
</style>
