<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getIconByName } from '$lib/utils/iconRegistry';

	interface $$Props extends HTMLButtonAttributes {
		class?: string;
		icon: string;
		size?: 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
	}

	let className: string = '';
	export { className as class };

	export let icon: $$Props['icon'] = 'mdi-help-circle';
	export let size: $$Props['size'] = 'medium';

	function getSizeValue(size: $$Props['size']): number {
		const sizeMap = {
			'extra-small': 12,
			small: 16,
			medium: 24,
			large: 32,
			'extra-large': 48
		} as const;

		return sizeMap[size || 'medium'];
	}

	$: sizeValue = getSizeValue(size);
</script>

<svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor" class={className}>
	<path d="{getIconByName(icon)};" />
</svg>
