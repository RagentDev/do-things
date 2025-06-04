<script lang="ts">
	import { logger, type LogLevel } from '$lib/runes/loggerRunes.svelte';

	interface Position {
		x: number;
		y: number;
	}
	if (!logger) {
		throw new Error('Logger context not found');
	}

	let isVisible = $state<boolean>(false);
	let isDragging = $state<boolean>(false);
	let position = $state<Position>({ x: 20, y: 20 });
	let dragOffset = $state<Position>({ x: 0, y: 0 });
	let consoleElement: HTMLDivElement | undefined = $state();
	let logContainer: HTMLDivElement | undefined = $state();
	let autoScroll = $state<boolean>(true);

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
			// Handle keyboard interaction for dragging initiation
		}
	}

	function scrollToBottom(): void {
		if (autoScroll && logContainer) {
			// Use requestAnimationFrame to ensure DOM is updated
			requestAnimationFrame(() => {
				if (logContainer) {
					logContainer.scrollTop = logContainer.scrollHeight;
				}
			});
		}
	}

	// Check if user has scrolled up manually
	function handleScroll(): void {
		if (logContainer && autoScroll) {
			const { scrollTop, scrollHeight, clientHeight } = logContainer;
			// If user scrolled away from bottom, disable auto-scroll temporarily
			if (scrollTop + clientHeight < scrollHeight - 10) {
				// User has scrolled up, but don't disable autoScroll permanently
				// Instead, we'll just not scroll this time
			}
		}
	}

	// Auto-scroll effect - triggered when logs change
	$effect(() => {
		// This effect runs whenever logger.logs changes
		const logsLength = logger.logs.length;
		if (logsLength > 0) {
			scrollToBottom();
		}
	});

	// Effect for when autoScroll is toggled
	$effect(() => {
		if (autoScroll) {
			scrollToBottom();
		}
	});
</script>

<!-- Floating Console -->
{#if isVisible}
	<div
		bind:this={consoleElement}
		class="floating-console"
		style="left: {position.x}px; top: {position.y}px;"
		role="dialog"
		aria-label="Custom Console"
	>
		<!-- Header -->
		<div
			class="console-header"
			onmousedown={handleMouseDown}
			onkeydown={handleKeyDown}
			role="button"
			tabindex="0"
			aria-label="Drag to move console"
		>
			<span class="console-title">Custom Console ({logger.logs.length})</span>
			<div class="console-controls">
				<button
					onclick={() => logger.toggle()}
					class="control-btn"
					class:playing={logger.isPlaying}
					class:paused={!logger.isPlaying}
					aria-label={logger.isPlaying ? 'Pause logging' : 'Resume logging'}
					type="button"
				>
					{logger.isPlaying ? '⏸️' : '▶️'}
				</button>
				<button
					onclick={() => logger.clear()}
					class="control-btn"
					aria-label="Clear logs"
					type="button"
				>
					🗑️
				</button>
				<button
					onclick={() => (autoScroll = !autoScroll)}
					class="control-btn"
					class:active={autoScroll}
					aria-label={autoScroll ? 'Disable auto-scroll' : 'Enable auto-scroll'}
					type="button"
					title={autoScroll ? 'Auto-scroll enabled' : 'Auto-scroll disabled'}
				>
					{autoScroll ? '📌' : '📌'}
				</button>
				<button
					onclick={scrollToBottom}
					class="control-btn"
					aria-label="Scroll to bottom"
					type="button"
					title="Scroll to bottom"
				>
					⬇️
				</button>
				<button
					onclick={() => (isVisible = false)}
					class="control-btn close-btn"
					aria-label="Close console"
					type="button"
				>
					✕
				</button>
			</div>
		</div>

		<!-- Status Bar -->
		{#if !logger.isPlaying}
			<div class="status-bar">
				<span class="status-warning">⚠️ Logging paused - new logs will be discarded</span>
			</div>
		{/if}

		<!-- Log Container -->
		<div
			bind:this={logContainer}
			class="log-container"
			role="log"
			aria-live="polite"
			onscroll={handleScroll}
		>
			{#each logger.logs as log (log.id)}
				<div class="log-entry {log.level}" role="listitem">
					<span class="log-time">{formatTime(log.timestamp)}</span>
					<span class="log-level {getLevelClass(log.level)}"
						>[{log.level.toUpperCase()}]</span
					>
					<span class="log-message">
						{#each log.messages as message, i}
							{#if i > 0}<span class="message-separator"> </span>{/if}
							<span class="message-part">{formatMessage(message)}</span>
						{/each}
					</span>
				</div>
			{/each}

			{#if logger.logs.length === 0}
				<div class="no-logs">No logs yet...</div>
			{/if}
		</div>
	</div>
{/if}

<!-- Toggle Button (Bottom Right) -->
<button
	class="toggle-btn"
	class:has-logs={logger.logs.length > 0}
	onclick={() => (isVisible = !isVisible)}
	title="Toggle Console ({logger.logs.length} logs)"
	aria-label={isVisible ? 'Hide console' : 'Show console'}
	type="button"
>
	🖥️
	{#if logger.logs.length > 0}
		<span class="log-count">{logger.logs.length}</span>
	{/if}
</button>

<style>
	.floating-console {
		position: fixed;
		width: 600px;
		height: 400px;
		background: white;
		border: 1px solid #ccc;
		border-radius: 8px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
		z-index: 10000;
		display: flex;
		flex-direction: column;
		font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
		font-size: 12px;
	}

	.console-header {
		background: #f5f5f5;
		border-bottom: 1px solid #ddd;
		padding: 8px 12px;
		cursor: move;
		display: flex;
		justify-content: space-between;
		align-items: center;
		user-select: none;
		border-radius: 8px 8px 0 0;
	}

	.console-header:focus {
		outline: 2px solid #2196f3;
		outline-offset: -2px;
	}

	.console-title {
		font-weight: bold;
		color: #333;
	}

	.console-controls {
		display: flex;
		gap: 4px;
	}

	.status-bar {
		background: #fff3cd;
		border-bottom: 1px solid #e0e0e0;
		padding: 4px 12px;
		font-size: 11px;
		color: #856404;
		display: flex;
		align-items: center;
	}

	.status-warning {
		color: #856404;
		font-size: 10px;
	}

	.control-btn {
		background: none;
		border: none;
		cursor: pointer;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 12px;
		transition: background-color 0.2s;
	}

	.control-btn:hover {
		background: #e0e0e0;
	}

	.control-btn:focus {
		outline: 2px solid #2196f3;
		outline-offset: 1px;
	}

	.control-btn.playing {
		background: #4caf50;
		color: white;
	}

	.control-btn.paused {
		background: #ff9800;
		color: white;
	}

	.control-btn.active {
		background: #2196f3;
		color: white;
	}

	.control-btn.close-btn:hover {
		background: #f44336;
		color: white;
	}

	.log-container {
		flex: 1;
		overflow-y: auto;
		padding: 8px;
		background: #fafafa;
		border-radius: 0 0 8px 8px;
		scroll-behavior: smooth;
	}

	.log-entry {
		display: flex;
		margin-bottom: 2px;
		padding: 2px 4px;
		border-radius: 2px;
		line-height: 1.4;
	}

	.log-entry:hover {
		background: #f0f0f0;
	}

	.log-time {
		color: #666;
		margin-right: 8px;
		min-width: 70px;
	}

	.log-level {
		margin-right: 8px;
		font-weight: bold;
		min-width: 50px;
	}

	.log-message {
		flex: 1;
		word-break: break-word;
	}

	.message-part {
		margin-right: 8px;
	}

	.no-logs {
		text-align: center;
		color: #999;
		padding: 20px;
		font-style: italic;
	}

	.toggle-btn {
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: none;
		background: #2196f3;
		color: white;
		font-size: 20px;
		cursor: pointer;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
		z-index: 9999;
		transition:
			transform 0.2s,
			background-color 0.2s;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.toggle-btn:hover {
		transform: scale(1.1);
		background: #1976d2;
	}

	.toggle-btn:focus {
		outline: 2px solid #fff;
		outline-offset: 2px;
	}

	.toggle-btn.has-logs {
		background: #4caf50;
	}

	.toggle-btn.has-logs:hover {
		background: #388e3c;
	}

	.log-count {
		position: absolute;
		top: -8px;
		right: -8px;
		background: #f44336;
		color: white;
		border-radius: 50%;
		min-width: 20px;
		height: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 10px;
		font-weight: bold;
		padding: 0 4px;
	}

	/* Text color utilities */
	:global(.text-gray-800) {
		color: #1f2937;
	}
	:global(.text-blue-600) {
		color: #2563eb;
	}
	:global(.text-green-800) {
		color: #166534;
	}
	:global(.text-yellow-600) {
		color: #d97706;
	}
	:global(.text-red-600) {
		color: #dc2626;
	}
	:global(.text-purple-600) {
		color: #9333ea;
	}

	/* Log level specific styles */
	.log-entry.error {
		background: #ffebee;
	}

	.log-entry.warn {
		background: #fff8e1;
	}

	.log-entry.info {
		background: #e3f2fd;
	}

	.log-entry.success {
		background: #e8fde3;
	}

	.log-entry.debug {
		background: #f3e5f5;
	}
</style>
