<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';
	import MrIcon from '$lib/components/common/MrIcon.svelte';

	interface Props {
		onToggle: () => void;
	}

	let { onToggle }: Props = $props();
</script>

{#if logger}
	<div class="fixed" style="bottom: 120px; right: 20px;">
		<MrButton variant="filled" color="secondary" icon onclick={onToggle}>
			<MrIcon icon="mdi-console" class="text-primary" size="lg" />
			<span
				class="absolute bg-error rounded-full flex items-center justify-center font-bold"
				style="top: -2px; right: -2px; min-width: 25px"
			>
				{logger.logs.length}
			</span>
		</MrButton>
	</div>
{/if}
