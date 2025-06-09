<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		class?: string;
		variant?: 'filled' | 'outlined' | 'text';
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
		color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
		icon?: boolean;
		disabled?: boolean;
	}

	let className: string = '';
	export { className as class };

	export let variant: $$Props['variant'] = 'filled';
	export let size: $$Props['size'] = 'medium';
	export let color: $$Props['color'] = 'primary';
	export let icon: $$Props['icon'] = false;
	export let disabled: $$Props['disabled'] = false;

	function getSizeClasses(size: $$Props['size']): string {
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

	function getVariantClasses(variant: $$Props['variant'], color: $$Props['color']): string {
		const classMap = {
			'primary-filled': 'bg-primary hover:bg-primary/80 text-white',
			'primary-outlined':
				'border-2 border-primary text-primary hover:bg-primary hover:text-white',
			'primary-text': 'text-primary hover:bg-primary/10',

			'secondary-filled': 'bg-secondary hover:bg-secondary/80 text-white',
			'secondary-outlined':
				'border-2 border-secondary text-secondary hover:bg-secondary hover:text-white',
			'secondary-text': 'text-secondary hover:bg-secondary/10',

			'success-filled': 'bg-green-600 hover:bg-green-700 text-white',
			'success-outlined':
				'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white',
			'success-text': 'text-green-600 hover:bg-green-50',

			'warning-filled': 'bg-yellow-600 hover:bg-yellow-700 text-white',
			'warning-outlined':
				'border-2 border-yellow-600 text-yellow-600 hover:bg-yellow-600 hover:text-white',
			'warning-text': 'text-yellow-600 hover:bg-yellow-50',

			'error-filled': 'bg-red-600 hover:bg-red-700 text-white',
			'error-outlined':
				'border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white',
			'error-text': 'text-red-600 hover:bg-red-50'
		} as const;

		const key = `${color || 'primary'}-${variant || 'filled'}` as keyof typeof classMap;
		return classMap[key];
	}

	$: sizeClasses = getSizeClasses(size);
	$: variantClasses = getVariantClasses(variant, color);

	$: baseClasses = `
    inline-flex items-center justify-center
    cursor-pointer
    font-medium
    ${icon ? 'rounded-full' : 'rounded-md'}
    transition-all duration-150
    active:scale-95 active:shadow-sm
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-current
    ${sizeClasses}
    ${variantClasses}
    ${className}
  `
		.trim()
		.replace(/\s+/g, ' ');
</script>

<button class={baseClasses} {disabled} on:click {...$$restProps}>
	<slot />
</button>
