// vite-plugin-svelte-check.ts
import { spawn } from 'child_process';
import type { Plugin } from 'vite';

export function svelteCheckPlugin(): Plugin {
	let server: any;

	const runSvelteCheck = async (): Promise<void> => {
		console.log('🔍 Running svelte-check...');

		const child = spawn('npx', ['svelte-check'], {
			stdio: 'pipe',
			shell: true
		});

		let output = '';
		child.stdout?.on('data', (data) => (output += data.toString()));
		child.stderr?.on('data', (data) => (output += data.toString()));

		child.on('close', () => {
			if (output.includes('Error')) {
				console.log('Found errors, sending to overlay');
				server?.ws?.send({
					type: 'error',
					err: {
						message: `svelte-check found errors: ${output}`,
						stack: output,
						plugin: 'svelte-check'
					}
				});
			} else {
				console.log('No errors found');
			}
		});
	};

	return {
		name: 'svelte-check',
		apply: 'serve',

		configureServer(devServer) {
			server = devServer;

			// Run on startup
			setTimeout(runSvelteCheck, 2000);

			// Run on file changes
			devServer.watcher.on('change', (file) => {
				if (file.endsWith('.svelte') || file.endsWith('.ts')) {
					setTimeout(runSvelteCheck, 500);
				}
			});
		}
	};
}
