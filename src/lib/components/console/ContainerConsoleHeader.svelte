<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import ButtonConsole from '$lib/components/console/ButtonConsole.svelte';
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
		class="bg-gray-100 border-b border-black cursor-move flex justify-between items-center rounded-t-lg"
		onmousedown={handleMouseDown}
		onkeydown={handleKeyDown}
		role="button"
		tabindex="0"
	>
		<span class="pl-2 font-bold text-gray-800">Custom Console ({logCount})</span>
		<div class="flex gap-1">
			<ButtonConsole onclick={() => logger?.toggle()} class="p-1 px-2">
				<MrIcon
					path={isPlaying ? mdiPauseBox : mdiPlayBox}
					class={isPlaying ? 'text-blue-400' : 'text-red-400'}
				/>
			</ButtonConsole>
			<ButtonConsole onclick={() => logger?.clear()} class="py-1 px-2">
				<MrIcon path={mdiTrashCan} class="text-gray-400" />
			</ButtonConsole>
			<ButtonConsole onclick={onToggleAutoScroll} class="p-1 px-2">
				<MrIcon
					path={autoScroll ? mdiMouseScrollWheel : mdiLock}
					class={autoScroll ? 'text-blue-400' : 'text-red-400'}
				/>
			</ButtonConsole>
			<ButtonConsole onclick={scrollToBottom} class="p-1 px-2">
				<MrIcon path={mdiArrowDownBox} class="text-blue-400" />
			</ButtonConsole>
			<ButtonConsole onclick={onClose} class="p-2">
				<MrIcon path={mdiClose} class="text-gray-600" />
			</ButtonConsole>
		</div>
	</div>
{/if}
