<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';
	import { mdiConsole } from '@mdi/js';
	import MrIcon from '$lib/components/common/MrIcon.svelte';

	interface Props {
		onToggle: () => void;
	}

	let { onToggle }: Props = $props();
</script>

{#if logger}
	<MrButton
		class="fixed bottom-5 right-5"
		variant="filled"
		color="secondary"
		icon
		onclick={onToggle}
	>
		<MrIcon path={mdiConsole} class="text-primary" size="large" />
		<span
			class="absolute -top-2 -right-2 bg-error text-white rounded-full min-w-5 h-5 flex items-center justify-center text-[10px] font-bold"
		>
			{logger.logs.length}
		</span>
	</MrButton>
{/if}
