<script lang="ts">
	let {
		path,
		size = 24,
		color = 'currentColor',
		// TODO: FIX THIS
		// eslint-disable-next-line svelte/valid-compile
		...props
	} = $props<{
		path: string;
		size?: number;
		color?: string;
		class?: string;
	}>();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill={color} {...props}>
	<path d={path} />
</svg>
