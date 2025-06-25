<script lang="ts">
	import { browser } from '$app/environment';
	import { logger } from '$lib/runes/loggerRunes.svelte';
	import ContainerConsoleLogs from '$lib/components/console/ContainerConsoleLogs.svelte';
	import ContainerConsoleHeader from '$lib/components/console/ContainerConsoleHeader.svelte';

	interface Position {
		x: number;
		y: number;
	}

	let { isVisible = $bindable() } = $props<{ isVisible: boolean }>();
	let isDragging = $state<boolean>(false);
	let isResizing = $state<boolean>(false);
	let position = $state<Position>({ x: 0, y: 0 });
	let size = $state<{ width: number; height: number }>({
		width: browser ? Math.min(600, window.innerWidth - 40) : 600,
		height: browser ? Math.min(384, window.innerHeight - 40) : 384
	});
	let dragOffset = $state<Position>({ x: 0, y: 0 });
	let resizeOffset = $state<Position>({ x: 0, y: 0 });
	let autoScroll = $state<boolean>(true);
	let wasVisible = $state<boolean>(false);

	// Reset position and size when console becomes visible
	$effect(() => {
		if (browser && isVisible && !wasVisible) {
			// Responsive sizing
			const maxWidth = Math.min(600, window.innerWidth - 40);
			const maxHeight = Math.min(384, window.innerHeight - 40);

			size = { width: maxWidth, height: maxHeight };
			position = {
				x: Math.max(20, (window.innerWidth - maxWidth) / 2),
				y: Math.max(20, (window.innerHeight - maxHeight) / 2)
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
		document.addEventListener('touchmove', handleTouchMove, { passive: false });
		document.addEventListener('touchend', handleTouchEnd);
		e.preventDefault();
	}

	function handleTouchStart(e: TouchEvent): void {
		if (e.touches.length === 1) {
			const touch = e.touches[0];
			isDragging = true;
			dragOffset = {
				x: touch.clientX - position.x,
				y: touch.clientY - position.y
			};

			document.addEventListener('touchmove', handleTouchMove, { passive: false });
			document.addEventListener('touchend', handleTouchEnd);
			e.preventDefault();
		}
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
		if (!browser) return;
		
		if (isDragging) {
			position = {
				x: Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x)),
				y: Math.max(0, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y))
			};
		} else if (isResizing) {
			size = {
				width: Math.max(
					300,
					Math.min(window.innerWidth - position.x, e.clientX - resizeOffset.x)
				),
				height: Math.max(
					200,
					Math.min(window.innerHeight - position.y, e.clientY - resizeOffset.y)
				)
			};
		}
	}

	function handleTouchMove(e: TouchEvent): void {
		if (!browser || e.touches.length !== 1) return;
		
		const touch = e.touches[0];
		if (isDragging) {
			position = {
				x: Math.max(
					0,
					Math.min(window.innerWidth - size.width, touch.clientX - dragOffset.x)
				),
				y: Math.max(
					0,
					Math.min(window.innerHeight - size.height, touch.clientY - dragOffset.y)
				)
			};
			e.preventDefault();
		}
	}

	function handleMouseUp(): void {
		isDragging = false;
		isResizing = false;
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
		document.removeEventListener('touchmove', handleTouchMove);
		document.removeEventListener('touchend', handleTouchEnd);
	}

	function handleTouchEnd(): void {
		isDragging = false;
		isResizing = false;
		document.removeEventListener('touchmove', handleTouchMove);
		document.removeEventListener('touchend', handleTouchEnd);
	}

	function handleKeyDown(e: KeyboardEvent): void {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
		}
	}

	export { isVisible };
</script>

{#if isVisible && logger}
	<div
		class="fixed bg-surface rounded-lg flex flex-col"
		style="left: {position.x}px; top: {position.y}px; width: {size.width}px; height: {size.height}px; z-index: 10000;"
		role="dialog"
	>
		<ContainerConsoleHeader
			{handleMouseDown}
			{handleTouchStart}
			{handleKeyDown}
			logCount={logger.logs.length}
			isPlaying={logger.isPlaying}
			{autoScroll}
			onToggleAutoScroll={() => (autoScroll = !autoScroll)}
			onClose={() => (isVisible = false)}
		/>

		{#if !logger.isPlaying}
			<div class="bg-warning px-3 py-3">
				<span class="text-primary"> ⚠️ Logging paused - new logs will be discarded </span>
			</div>
		{/if}

		<ContainerConsoleLogs {autoScroll} />

		<!-- Resize handle -->
		<div
			class="absolute cursor-se-resize bg-secondary"
			style="bottom: 0; right: 0; width: 16px; height: 16px; clip-path: polygon(100% 0%, 0% 100%, 100% 100%);"
			onmousedown={handleResizeMouseDown}
			role="button"
			tabindex="0"
			aria-label="Resize console"
		></div>
	</div>
{/if}
