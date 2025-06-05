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
			log: 'text-gray-800',
			info: 'text-blue-600',
			success: 'text-green-800',
			warn: 'text-yellow-600',
			error: 'text-red-600',
			debug: 'text-purple-600'
		};
		return classes[level] || classes.log;
	}

	function getBackgroundClass(level: LogLevel): string {
		const classes: Record<LogLevel, string> = {
			log: '',
			info: 'bg-blue-50',
			success: 'bg-green-50',
			warn: 'bg-yellow-50',
			error: 'bg-red-50',
			debug: 'bg-purple-50'
		};
		return classes[level] || '';
	}
</script>

<div
	class="flex mb-0.5 px-1 py-0.5 rounded-sm leading-relaxed hover:bg-gray-100 {getBackgroundClass(
		log.level
	)}"
	role="listitem"
>
	<span class="text-gray-600 mr-2 min-w-[70px]">{formatTime(log.timestamp)}</span>
	<span class="mr-2 font-bold min-w-[50px] {getLevelClass(log.level)}">
		[{log.level.toUpperCase()}]
	</span>
	<span class="flex-1 break-words">
		{#each log.messages as message, i}
			{#if i > 0}<span class="mr-2"> </span>{/if}
			<span class="mr-2">{formatMessage(message)}</span>
		{/each}
	</span>
</div>
