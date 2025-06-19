import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import { svelteCheckPlugin } from './vite-plugin-svelte-check';
export default defineConfig({
	plugins: [
		sveltekit(),
		svelteCheckPlugin(),
		eslint({
			include: ['src/**/*.{js,ts,jsx,tsx,svelte}'],
			cache: false,
			emitWarning: true,
			emitError: true
		})
	],
	css: {
		preprocessorOptions: {
			scss: {}
		}
	}
});
