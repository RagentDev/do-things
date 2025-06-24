<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import MrIcon from '$lib/components/common/MrIcon.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';

	interface Props {
		handleMouseDown: (e: MouseEvent) => void;
		handleKeyDown: (e: KeyboardEvent) => void;
		logCount: number;
		isPlaying: boolean;
		autoScroll: boolean;
		onToggleAutoScroll: () => void;
		onClose: () => void;
	}

	let {
		handleMouseDown,
		handleKeyDown,
		logCount,
		isPlaying,
		autoScroll,
		onToggleAutoScroll,
		onClose
	}: Props = $props();

	function scrollToBottom(): void {
		const logContainer = document.querySelector('.log-container');
		if (logContainer) {
			requestAnimationFrame(() => {
				logContainer.scrollTop = logContainer.scrollHeight;
			});
		}
	}
</script>

{#if logger}
	<div
		class="bg-surface border-b border-secondary cursor-move flex justify-between items-center rounded-lg py-1"
		onmousedown={handleMouseDown}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
	>
		<span class="pl-2 font-bold text-secondary">Custom Console ({logCount})</span>
		<div class="flex gap-1">
			<MrButton variant="text" icon onclick={() => logger?.toggle()}>
				<MrIcon
					icon={isPlaying ? 'mdi-pause-box' : 'mdi-play-box'}
					class={isPlaying ? 'text-primary' : 'text-error'}
				/>
			</MrButton>
			<MrButton variant="text" icon onclick={() => logger?.clear()}>
				<MrIcon icon="mdi-trash-can" class="text-muted" />
			</MrButton>
			<MrButton variant="text" icon onclick={onToggleAutoScroll}>
				<MrIcon
					icon={autoScroll ? 'mdi-mouse-scroll-wheel' : 'mdi-lock'}
					class={autoScroll ? 'text-primary' : 'text-error'}
				/>
			</MrButton>
			<MrButton variant="text" icon onclick={scrollToBottom}>
				<MrIcon icon="mdi-arrow-down-box" class="text-primary" />
			</MrButton>
			<MrButton variant="text" icon color="error" onclick={onClose} class="ml-5">
				<MrIcon icon="mdi-close" class="text-error" />
			</MrButton>
		</div>
	</div>
{/if}
