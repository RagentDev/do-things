<script lang="ts">
	import type { LogLevel } from '$lib/runes/loggerRunes.svelte';

	interface LogEntryData {
		id: string;
		level: LogLevel;
		timestamp: Date;
		messages: unknown[];
	}

	interface Props {
		log: LogEntryData;
	}

	let { log }: Props = $props();

	function formatMessage(message: unknown): string {
		if (typeof message === 'object' && message !== null) {
			try {
				return JSON.stringify(message, null, 2);
			} catch (ex: unknown) {
				console.error(ex);
				return String(message);
			}
		}
		return String(message);
	}

	function formatTime(timestamp: Date): string {
		return timestamp.toLocaleTimeString();
	}

	function getLevelClass(level: LogLevel): string {
		const classes: Record<LogLevel, string> = {
			log: 'text-secondary',
			info: 'text-primary',
			success: 'text-success',
			warn: 'text-warning',
			error: 'text-error',
			debug: 'text-accent'
		};
		return classes[level] || classes.log;
	}

	function getBackgroundClass(level: LogLevel): string {
		const classes: Record<LogLevel, string> = {
			log: '',
			info: 'bg-surface',
			success: 'bg-surface',
			warn: 'bg-surface',
			error: 'bg-surface',
			debug: 'bg-surface'
		};
		return classes[level] || '';
	}
</script>

<div
	class="flex mb-0.5 px-1 py-0.5 rounded-sm leading-relaxed hover:bg-surface {getBackgroundClass(
		log.level
	)}"
	role="listitem"
>
	<span class="text-muted mr-2" style="min-width: 70px">{formatTime(log.timestamp)}</span>
	<span class="mr-2 font-bold {getLevelClass(log.level)}" style="min-width: 50px">
		[{log.level.toUpperCase()}]
	</span>
	<span class="flex-1 break-words">
		{#each log.messages as message, i}
			{#if i > 0}<span class="mr-2"> </span>{/if}
			<span class="mr-2">{formatMessage(message)}</span>
		{/each}
	</span>
</div>
