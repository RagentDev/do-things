<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import LogEntry from '$lib/components/console/LogEntry.svelte';

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

	function handleScroll(): void {
		if (logContainer && autoScroll) {
			const { scrollTop, scrollHeight, clientHeight } = logContainer;
			// User has scrolled up, but don't disable autoScroll permanently
		}
	}

	$effect(() => {
		const logsLength = logger.logs.length;
		if (logsLength > 0) {
			scrollToBottom();
		}
	});

	$effect(() => {
		if (autoScroll) {
			scrollToBottom();
		}
	});
</script>

<div
	bind:this={logContainer}
	class="log-container flex-1 overflow-y-auto p-2 bg-gray-50 rounded-b-lg scroll-smooth"
	role="log"
	aria-live="polite"
	onscroll={handleScroll}
>
	{#each logger.logs as log (log.id)}
		<LogEntry {log} />
	{/each}

	{#if logger.logs.length === 0}
		<div class="text-center text-gray-500 p-5 italic">No logs yet...</div>
	{/if}
</div>
