import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import tailwindcss from '@tailwindcss/vite';

process.env.NODE_ENV = 'production';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		eslint({
			// Specify these options to ensure Prettier errors are included
			include: ['src/**/*.{js,ts,jsx,tsx,svelte}'],
			cache: false, // Disabling cache can help during setup to ensure rules are always fresh
			emitWarning: true,
			emitError: true
		})
	],
	build: {
		rollupOptions: {
			external: (id) => {
				return id.includes('/routes/test/');
			}
		}
	}
});
