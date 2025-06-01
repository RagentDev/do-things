import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
	plugins: [
		sveltekit(),
		eslint({
			// Specify these options to ensure Prettier errors are included
			include: ['src/**/*.{js,ts,jsx,tsx,svelte}'],
			cache: false, // Disabling cache can help during setup to ensure rules are always fresh
			emitWarning: true,
			emitError: true
		}),
		VitePWA({
			// Register service worker with correct base URL
			registerType: 'autoUpdate',

			// Development mode configuration
			devOptions: {
				enabled: true,
				type: 'module',
				navigateFallback: '/'
			},

			// Manifest configuration
			manifest: {
				name: 'My SvelteKit PWA',
				short_name: 'SKPWA',
				description: 'My awesome Progressive Web App!',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				scope: '/',
				start_url: '/',
				icons: [
					{
						src: 'icons/icon-72x72.png',
						sizes: '72x72',
						type: 'image/png'
					},
					{
						src: 'icons/icon-96x96.png',
						sizes: '96x96',
						type: 'image/png'
					},
					{
						src: 'icons/icon-128x128.png',
						sizes: '128x128',
						type: 'image/png'
					},
					{
						src: 'icons/icon-144x144.png',
						sizes: '144x144',
						type: 'image/png'
					},
					{
						src: 'icons/icon-152x152.png',
						sizes: '152x152',
						type: 'image/png'
					},
					{
						src: 'icons/icon-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'icons/icon-384x384.png',
						sizes: '384x384',
						type: 'image/png'
					},
					{
						src: 'icons/icon-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'icons/maskable-icon.png',
						sizes: '192x192',
						type: 'image/png',
						purpose: 'maskable'
					}
				]
			},

			// Workbox configuration for service worker
			workbox: {
				globPatterns: ['**/*.{js,css,html,svg,png,jpg,jpeg,gif,webp}'],
				// Cache additional routes
				runtimeCaching: [
					{
						urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
						handler: 'CacheFirst',
						options: {
							cacheName: 'google-fonts-cache',
							expiration: {
								maxEntries: 10,
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							},
							cacheableResponse: {
								statuses: [0, 200]
							}
						}
					}
				]
			}
		})
	]
});
