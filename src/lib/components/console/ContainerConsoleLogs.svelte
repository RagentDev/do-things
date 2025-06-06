<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import TextConsoleLogEntry from '$lib/components/console/TextConsoleLogEntry.svelte';

	interface Props {
		autoScroll: boolean;
	}

	let { autoScroll }: Props = $props();
	let logContainer: HTMLDivElement | undefined = $state();

	function scrollToBottom(): void {
		if (autoScroll && logContainer) {
			requestAnimationFrame(() => {
				if (logContainer) {
					logContainer.scrollTop = logContainer.scrollHeight;
				}
			});
		}
	}

	$effect(() => {
		if (logger) {
			const logsLength = logger.logs.length;
			if (logsLength > 0) {
				scrollToBottom();
			}
		}
	});

	$effect(() => {
		if (autoScroll) {
			scrollToBottom();
		}
	});
</script>

{#if logger}
	<div
		bind:this={logContainer}
		class="log-container flex-1 overflow-y-auto p-2 bg-gray-50 rounded-b-lg scroll-smooth"
		role="log"
		aria-live="polite"
	>
		{#each logger.logs as log (log.id)}
			<TextConsoleLogEntry {log} />
		{/each}

		{#if logger.logs.length === 0}
			<div class="text-center text-gray-500 p-5 italic">No logs yet...</div>
		{/if}
	</div>
{/if}
