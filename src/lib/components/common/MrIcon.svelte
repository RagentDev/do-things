<script lang="ts">
	interface Props {
		path: string;
		size?: number;
		color?: string;
		class?: string;
	}

	let { path, size = 24, color = 'currentColor', class: className }: Props = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill={color} class={className}>
	<path d={path} />
</svg>
