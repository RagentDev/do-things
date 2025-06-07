<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';

	interface Props {
		isVisible: boolean;
		onToggle: () => void;
	}

	let { isVisible, onToggle }: Props = $props();
</script>

{#if logger}
	<button
		class="fixed bottom-5 right-5 w-12 h-12 rounded-full border-none bg-blue-500 text-white text-xl cursor-pointer shadow-lg z-[9999] transition-all duration-200 flex items-center justify-center hover:scale-110 hover:bg-blue-700 focus:outline-2 focus:outline-white focus:outline-offset-2 {logger
			.logs.length > 0
			? 'bg-green-500 hover:bg-green-700'
			: ''}"
		onclick={onToggle}
		title="Toggle Console ({logger.logs.length} logs)"
		aria-label={isVisible ? 'Hide console' : 'Show console'}
		type="button"
	>
		🖥️
		{#if logger.logs.length > 0}
			<span
				class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full min-w-5 h-5 flex items-center justify-center text-[10px] font-bold px-1"
			>
				{logger.logs.length}
			</span>
		{/if}
	</button>
{/if}
