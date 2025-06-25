<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.scss';
	// import InstallPrompt from '$lib/components/InstallPrompt.svelte';
	import BottomBar from '$lib/components/BottomBar.svelte';
	import DialogConsole from '$lib/components/console/DialogConsole.svelte';
	import { isDev } from '$lib/config.js';
	import { dailyGoals } from '$lib/runes/dailyGoalsRunes.svelte';
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import { theme } from '$lib/runes/themeStore.svelte.js';
	import TopBar from '$lib/components/TopBar.svelte';

	// Initialize persistence when component mounts
	onMount(() => {
		logger?.initialize();
		dailyGoals.initialize();
		theme.initialize();
	});
</script>

<svelte:head>
	<title>Do Things</title>
</svelte:head>

<!-- Floating Orbs -->
<div class="floating-orbs"></div>

<div class="flex flex-col h-screen overflow-hidden">
	<!-- Safe Area Spacer -->
	<div class="w-full flex-shrink-0" style="height: var(--sat);"></div>

	<!-- Top Bar -->
	<div class="fixed" style="left: 0; right: 0; top: var(--sat); z-index: 50">
		<TopBar />
	</div>

	<!-- Content Area - NOW SCROLLABLE -->
	<div class="flex-1 overflow-y-auto content-fade">
		<div style="margin-top: var(--header-bar-height)">
			<!--		<div class="z-10" style="top: 0px">-->
			<!--			<InstallPrompt />-->
			<!--		</div>-->
			<slot />
			<!-- Bottom spacing to allow content to scroll past the fixed bottom bar -->
			<div style="height: 120px;"></div>
		</div>
	</div>

	<!-- Bottom Bar - Now Fixed -->
	<div class="fixed" style="left: 0; right: 0; bottom: var(--sab); z-index: 50">
		<BottomBar />
	</div>

	<!-- Bottom Safe Area -->
	<div class="w-full flex-shrink-0" style="height: var(--sab);"></div>
</div>

{#if isDev}
	<DialogConsole />
{/if}

<style>
	.content-fade {
		mask: linear-gradient(to bottom, transparent 0%, black 10%, black 95%, transparent 100%);
		-webkit-mask: linear-gradient(
			to bottom,
			transparent 0%,
			black 10%,
			black 90%,
			transparent 100%
		);
	}

	.floating-orbs {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: -1;
		background-image:
            /* 6 Big orbs */
			radial-gradient(
				circle 120px at 15% 20%,
				color-mix(in srgb, var(--bg-top-primary) 25%, transparent) 0%,
				color-mix(in srgb, var(--bg-top-primary) 8%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 110px at 80% 30%,
				color-mix(in srgb, var(--bg-bottom-primary) 30%, transparent) 0%,
				color-mix(in srgb, var(--bg-bottom-primary) 10%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 130px at 30% 70%,
				color-mix(
						in srgb,
						oklch(from var(--bg-top-primary) calc(l - 0.1) c h) 28%,
						transparent
					)
					0%,
				color-mix(
						in srgb,
						oklch(from var(--bg-top-primary) calc(l - 0.1) c h) 9%,
						transparent
					)
					50%,
				transparent 70%
			),
			radial-gradient(
				circle 100px at 75% 80%,
				color-mix(in srgb, var(--bg-top-primary) 32%, transparent) 0%,
				color-mix(in srgb, var(--bg-top-primary) 11%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 115px at 10% 60%,
				color-mix(in srgb, var(--bg-bottom-primary) 26%, transparent) 0%,
				color-mix(in srgb, var(--bg-bottom-primary) 8%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 125px at 90% 15%,
				color-mix(
						in srgb,
						oklch(from var(--bg-bottom-primary) calc(l + 0.1) c h) 29%,
						transparent
					)
					0%,
				color-mix(
						in srgb,
						oklch(from var(--bg-bottom-primary) calc(l + 0.1) c h) 10%,
						transparent
					)
					50%,
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
				color-mix(in srgb, var(--bg-top-primary) 18%, transparent) 0%,
				color-mix(in srgb, var(--bg-top-primary) 5%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 35px at 70% 40%,
				color-mix(in srgb, var(--bg-bottom-primary) 22%, transparent) 0%,
				color-mix(in srgb, var(--bg-bottom-primary) 6%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 45px at 20% 50%,
				color-mix(
						in srgb,
						oklch(from var(--bg-top-primary) calc(l - 0.15) c h) 20%,
						transparent
					)
					0%,
				color-mix(
						in srgb,
						oklch(from var(--bg-top-primary) calc(l - 0.15) c h) 6%,
						transparent
					)
					50%,
				transparent 70%
			),
			radial-gradient(
				circle 38px at 85% 65%,
				color-mix(in srgb, var(--bg-top-primary) 16%, transparent) 0%,
				color-mix(in srgb, var(--bg-top-primary) 4%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 42px at 25% 85%,
				color-mix(in srgb, var(--bg-bottom-primary) 19%, transparent) 0%,
				color-mix(in srgb, var(--bg-bottom-primary) 5%, transparent) 50%,
				transparent 70%
			),
			radial-gradient(
				circle 36px at 60% 10%,
				color-mix(
						in srgb,
						oklch(from var(--bg-bottom-primary) calc(l + 0.15) c h) 17%,
						transparent
					)
					0%,
				color-mix(
						in srgb,
						oklch(from var(--bg-bottom-primary) calc(l + 0.15) c h) 5%,
						transparent
					)
					50%,
				transparent 70%
			);
	}
</style>
