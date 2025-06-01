<script lang="ts">
	import '../app.css';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';
</script>

<svelte:head>
	<title>Do Things</title>
</svelte:head>

<div class="layout-container">
	<InstallPrompt />
	<slot />
</div>

<style>
	/* This wrapper ensures the gradient background in your components
       extends properly to the notch area without changing your components */
	.layout-container {
		/* Take up entire viewport */
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		/* Account for safe areas */
		padding-top: var(--sat, 0);
		padding-right: var(--sar, 0);
		padding-bottom: var(--sab, 0);
		padding-left: var(--sal, 0);
		/* Make sure this doesn't affect your page layout */
		box-sizing: border-box;
		/* Ensure content flows naturally */
		display: flex;
		flex-direction: column;
		/* This ensures the container doesn't interfere with your page content */
		pointer-events: none;
	}

	.layout-container :global(*) {
		/* Restore pointer events for all child elements */
		pointer-events: auto;
	}
</style>
