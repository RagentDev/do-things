// src/hooks.client.js
import { registerSW } from 'virtual:pwa-register';

// This registers the service worker
const updateSW = registerSW({
	onNeedRefresh() {
		// Show a prompt to the user to refresh/reload the app
		if (confirm('New content available. Reload?')) {
			updateSW();
		}
	},
	onOfflineReady() {
		console.log('App ready to work offline');
		// Optionally show a notification to the user
	}
});
