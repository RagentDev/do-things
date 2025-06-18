<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		class?: string;
		variant?: 'filled' | 'outlined' | 'text';
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
		color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
		icon?: boolean;
		disabled?: boolean;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		class: className = '',
		variant = 'filled',
		size = 'medium',
		color = 'primary',
		icon = false,
		disabled = false,
		onclick,
		children
	}: Props = $props();

	function getSizeClasses(size: Props['size']): string {
		let sizeMap;
		if (icon) {
			sizeMap = {
				'extra-small': 'p-1 text-xs',
				small: 'p-2 text-sm',
				medium: 'p-2 text-base',
				large: 'p-2 text-lg',
				'extra-large': 'p-2 text-xl'
			} as const;
		} else {
			sizeMap = {
				'extra-small': 'px-2 py-1 text-xs h-6',
				small: 'px-3 py-1.5 text-sm h-8',
				medium: 'px-4 py-2 text-base h-10',
				large: 'px-6 py-3 text-lg h-12',
				'extra-large': 'px-8 py-4 text-xl h-14'
			} as const;
		}

		return sizeMap[size || 'medium'];
	}

	function getVariantClasses(variant: Props['variant'], color: Props['color']): string {
		const colorKey = color || 'primary';
		const variantKey = variant || 'filled';

		const classes = {
			filled: {
				primary: 'bg-primary hover:bg-primary/80 disabled:hover:bg-primary text-white',
				secondary:
					'bg-secondary hover:bg-secondary/80 disabled:hover:bg-secondary text-white',
				success: 'bg-success hover:bg-success/80 disabled:hover:bg-success text-white',
				warning: 'bg-warning hover:bg-warning/80 disabled:hover:bg-warning text-white',
				error: 'bg-error hover:bg-error/80 disabled:hover:bg-error text-white'
			},
			outlined: {
				primary:
					'border-2 border-primary text-primary hover:bg-primary hover:text-white disabled:hover:bg-transparent disabled:hover:text-primary',
				secondary:
					'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white disabled:hover:bg-transparent disabled:hover:text-secondary',
				success:
					'border-2 border-success text-success hover:bg-success hover:text-white disabled:hover:bg-transparent disabled:hover:text-success',
				warning:
					'border-2 border-warning text-warning hover:bg-warning hover:text-white disabled:hover:bg-transparent disabled:hover:text-warning',
				error: 'border-2 border-error text-error hover:bg-error hover:text-white disabled:hover:bg-transparent disabled:hover:text-error'
			},
			text: {
				primary: 'text-primary hover:bg-primary/10 disabled:hover:bg-transparent',
				secondary: 'text-secondary hover:bg-secondary/10 disabled:hover:bg-transparent',
				success: 'text-success hover:bg-success/10 disabled:hover:bg-transparent',
				warning: 'text-warning hover:bg-warning/10 disabled:hover:bg-transparent',
				error: 'text-error hover:bg-error/10 disabled:hover:bg-transparent'
			}
		} as const;

		return classes[variantKey][colorKey];
	}

	const baseClasses = $derived(
		`
		inline-flex items-center justify-center
		cursor-pointer
		font-medium
		${icon ? 'rounded-full' : 'rounded-md'}
		transition-all duration-150
		active:scale-95
		disabled:opacity-50 disabled:saturate-50 disabled:cursor-not-allowed disabled:active:scale-100
		${getSizeClasses(size)}
		${getVariantClasses(variant, color)}
		${className}
	`
			.trim()
			.replace(/\s+/g, ' ')
	);
</script>

<button class={baseClasses} {disabled} {onclick}>
	{#if children}
		{@render children()}
	{/if}
</button>
