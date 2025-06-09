<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import MrIcon from '$lib/components/common/MrIcon.svelte';
	import {
		mdiArrowDownBox,
		mdiClose,
		mdiLock,
		mdiMouseScrollWheel,
		mdiPauseBox,
		mdiPlayBox,
		mdiTrashCan
	} from '@mdi/js';
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
		class="bg-gray-100 border-b border-black cursor-move flex justify-between items-center rounded-t-lg py-1"
		onmousedown={handleMouseDown}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
	>
		<span class="pl-2 font-bold text-gray-800">Custom Console ({logCount})</span>
		<div class="flex gap-1">
			<MrButton variant="text" icon onclick={() => logger?.toggle()}>
				<MrIcon
					path={isPlaying ? mdiPauseBox : mdiPlayBox}
					class={isPlaying ? 'text-primary' : 'text-error'}
				/>
			</MrButton>
			<MrButton variant="text" icon onclick={() => logger?.clear()}>
				<MrIcon path={mdiTrashCan} class="text-gray-400" />
			</MrButton>
			<MrButton variant="text" icon onclick={onToggleAutoScroll}>
				<MrIcon
					path={autoScroll ? mdiMouseScrollWheel : mdiLock}
					class={autoScroll ? 'text-primary' : 'text-error'}
				/>
			</MrButton>
			<MrButton variant="text" icon onclick={scrollToBottom}>
				<MrIcon path={mdiArrowDownBox} class="text-primary" />
			</MrButton>
			<MrButton variant="text" icon color="error" onclick={onClose} class="ml-5">
				<MrIcon path={mdiClose} class="text-error" />
			</MrButton>
		</div>
	</div>
{/if}
