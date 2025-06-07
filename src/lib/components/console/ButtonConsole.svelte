<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		onclick: () => void;
		class?: string;
		title?: string;
		children: Snippet;
	}

	let { onclick, class: className = '', title, children }: Props = $props();
</script>

<button
	{onclick}
	class="bg-transparent cursor-pointer rounded transition-colors hover:bg-gray-300 {className}"
	{title}
	type="button"
>
	{@render children()}
</button>
