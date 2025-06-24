<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { getIconByName } from '$lib/utils/iconRegistry';

	interface $$Props extends HTMLButtonAttributes {
		class?: string;
		icon: string;
		size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}

	let className: string = '';
	export { className as class };

	export let icon: $$Props['icon'] = 'mdi-help-circle';
	export let size: $$Props['size'] = 'md';

	function getSizeValue(size: $$Props['size']): number {
		const sizeMap = {
			xs: 12,
			sm: 16,
			md: 24,
			lg: 32,
			xl: 48
		} as const;

		return sizeMap[size || 'md'];
	}

	$: sizeValue = getSizeValue(size);
</script>

<svg width={sizeValue} height={sizeValue} viewBox="0 0 24 24" fill="currentColor" class={className}>
	<path d="{getIconByName(icon)};" />
</svg>
