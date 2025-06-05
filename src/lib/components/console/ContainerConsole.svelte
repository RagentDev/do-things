<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import ConsoleHeader from '$lib/components/console/ConsoleHeader.svelte';
	import type { Position } from '$lib/types';
	import ContainerConsoleLogs from '$lib/components/console/ContainerConsoleLogs.svelte';

	if (!logger) {
		throw new Error('Logger context not found');
	}

	let { isVisible = $bindable() } = $props<{ isVisible: boolean }>();
	let isDragging = $state<boolean>(false);
	let position = $state<Position>({ x: 20, y: 20 });
	let dragOffset = $state<Position>({ x: 0, y: 0 });
	let autoScroll = $state<boolean>(true);

	function handleMouseDown(e: MouseEvent): void {
		isDragging = true;
		dragOffset = {
			x: e.clientX - position.x,
			y: e.clientY - position.y
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		e.preventDefault();
	}

	function handleMouseMove(e: MouseEvent): void {
		if (isDragging) {
			position = {
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y
			};
		}
	}

	function handleMouseUp(): void {
		isDragging = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
		}
	}

	export { isVisible };
</script>

{#if isVisible}
	<div
		class="fixed w-[600px] h-96 bg-white border border-black rounded-lg z-[10000] flex flex-col font-mono text-xs"
		style="left: {position.x}px; top: {position.y}px;"
		role="dialog"
	>
		<ConsoleHeader
			{handleMouseDown}
			{handleKeyDown}
			logCount={logger.logs.length}
			isPlaying={logger.isPlaying}
			{autoScroll}
			onToggleAutoScroll={() => (autoScroll = !autoScroll)}
			onClose={() => (isVisible = false)}
		/>

		{#if !logger.isPlaying}
			<div class="bg-yellow-100 border border-gray-200 px-3 py-3">
				<span class="text-yellow-800">
					⚠️ Logging paused - new logs will be discarded
				</span>
			</div>
		{/if}

		<ContainerConsoleLogs {autoScroll} />
	</div>
{/if}
