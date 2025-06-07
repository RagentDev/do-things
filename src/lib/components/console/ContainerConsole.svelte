<script lang="ts">
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import type { Position } from '$lib/types';
	import ContainerConsoleLogs from '$lib/components/console/ContainerConsoleLogs.svelte';
	import ContainerConsoleHeader from '$lib/components/console/ContainerConsoleHeader.svelte';

	let { isVisible = $bindable() } = $props<{ isVisible: boolean }>();
	let isDragging = $state<boolean>(false);
	let isResizing = $state<boolean>(false);
	let position = $state<Position>({ x: 0, y: 0 });
	let size = $state<{ width: number; height: number }>({ width: 600, height: 384 });
	let dragOffset = $state<Position>({ x: 0, y: 0 });
	let resizeOffset = $state<Position>({ x: 0, y: 0 });
	let autoScroll = $state<boolean>(true);
	let wasVisible = $state<boolean>(false);

	// Reset position to center when console becomes visible
	$effect(() => {
		if (isVisible && !wasVisible) {
			position = {
				x: (window.innerWidth - size.width) / 2,
				y: (window.innerHeight - size.height) / 2
			};
		}
		wasVisible = isVisible;
	});

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

	function handleResizeMouseDown(e: MouseEvent): void {
		isResizing = true;
		resizeOffset = {
			x: e.clientX - size.width,
			y: e.clientY - size.height
		};

		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
		e.preventDefault();
		e.stopPropagation();
	}

	function handleMouseMove(e: MouseEvent): void {
		if (isDragging) {
			position = {
				x: e.clientX - dragOffset.x,
				y: e.clientY - dragOffset.y
			};
		} else if (isResizing) {
			size = {
				width: Math.max(300, e.clientX - resizeOffset.x),
				height: Math.max(200, e.clientY - resizeOffset.y)
			};
		}
	}

	function handleMouseUp(): void {
		isDragging = false;
		isResizing = false;
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
		class="fixed bg-white border border-black rounded-lg z-[10000] flex flex-col font-mono text-xs"
		style="left: {position.x}px; top: {position.y}px; width: {size.width}px; height: {size.height}px;"
		role="dialog"
	>
		<ContainerConsoleHeader
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

		<!-- Resize handle -->
		<div
			class="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-gray-300 hover:bg-gray-400 transition-colors"
			style="clip-path: polygon(100% 0%, 0% 100%, 100% 100%);"
			onmousedown={handleResizeMouseDown}
			role="button"
			tabindex="0"
			aria-label="Resize console"
		></div>
	</div>
{/if}
