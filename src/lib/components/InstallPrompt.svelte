<script>
	import { onMount } from 'svelte';

	let deferredPrompt;
	let showInstallButton = false;

	onMount(() => {
		window.addEventListener('beforeinstallprompt', (e) => {
			// Prevent the mini-infobar from appearing on mobile
			e.preventDefault();
			// Stash the event so it can be triggered later
			deferredPrompt = e;
			// Update UI to show the install button
			showInstallButton = true;
		});

		window.addEventListener('appinstalled', () => {
			// Hide the install button
			showInstallButton = false;
			// Clear the deferredPrompt
			deferredPrompt = null;
			// Log installation to analytics
			console.log('PWA was installed');
		});
	});

	function installApp() {
		if (!deferredPrompt) return;

		// Show the install prompt
		deferredPrompt.prompt();

		// Wait for the user to respond to the prompt
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === 'accepted') {
				console.log('User accepted the install prompt');
			} else {
				console.log('User dismissed the install prompt');
			}
			// We no longer need the prompt, clear it
			deferredPrompt = null;
			showInstallButton = false;
		});
	}
</script>

{#if showInstallButton}
	<div class="install-banner">
		<p>Install this app on your device</p>
		<button on:click={installApp}>Install</button>
	</div>
{/if}

<style>
	.install-banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #f0f0f0;
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
		z-index: 1000;
	}

	button {
		background: #ff3e00;
		color: white;
		border: none;
		padding: 0.5rem 1rem;
		border-radius: 4px;
		cursor: pointer;
	}
</style>
