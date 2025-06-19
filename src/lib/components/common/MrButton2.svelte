<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		variant?: 'filled' | 'outlined' | 'text';
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
		disabled?: boolean;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		class: className = '',
		variant = 'filled',
		size = 'md',
		color = 'primary',
		disabled = false,
		onclick,
		children
	}: Props = $props();
</script>

<button
	class="mr-button mr-button-size-{size} mr-button-variant-{variant} {className}"
	style="--btn-color: var(--color-{color})"
	{disabled}
	{onclick}
>
	{#if children}
		{@render children()}
	{/if}
</button>

<style>
	.mr-button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
		border-radius: 0.375rem;
		font-weight: 500;
	}

	.mr-button:active {
		transform: scale(0.95);
	}

	.mr-button:disabled {
		opacity: 0.5;
		filter: saturate(0.5);
		cursor: not-allowed;
	}

	.mr-button:disabled:active {
		transform: scale(1);
	}

	/* Size modifiers */
	.mr-button-size-xs {
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		line-height: 1rem;
	}

	.mr-button-size-sm {
		padding: 0.375rem 0.75rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.mr-button-size-md {
		padding: 0.5rem 1rem;
		font-size: 0.875rem;
		line-height: 1.25rem;
	}

	.mr-button-size-lg {
		padding: 0.625rem 1.25rem;
		font-size: 1rem;
		line-height: 1.5rem;
	}

	.mr-button-size-xl {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
		line-height: 1.75rem;
	}

	/* Dynamic variant styles */
	.mr-button-variant-filled {
		background-color: var(--btn-color);
		color: white;
	}

	.mr-button-variant-outlined {
		border: 2px solid var(--btn-color);
		color: var(--btn-color);
		background-color: transparent;
	}

	.mr-button-variant-text {
		color: var(--btn-color);
		background-color: transparent;
	}

	/* Hover effects */
	.mr-button-variant-filled:hover:not(:disabled) {
		opacity: 0.7;
	}
	.mr-button-variant-outlined:hover:not(:disabled) {
		background-color: color-mix(in srgb, var(--btn-color) 20%, transparent);
	}
	.mr-button-variant-text:hover:not(:disabled) {
		background-color: color-mix(in srgb, var(--btn-color) 20%, transparent);
	}
</style>
