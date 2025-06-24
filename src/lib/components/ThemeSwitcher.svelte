<script lang="ts">
	import { theme } from '$lib/runes/themeStore.svelte.js';
</script>

<button onclick={theme.toggle}>
	{theme.currentTheme === 'light' ? '🌙' : '☀️'}
</button>

<style>
	button {
		background: var(--surface);
		border: none;
		padding: 8px 12px;
		border-radius: 6px;
		cursor: pointer;
		font-size: 16px;
	}
</style>
