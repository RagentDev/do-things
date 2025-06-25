<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';
	import { goto } from '$app/navigation';
</script>

<div
	class="top-bar relative w-full border-fade-bottom"
	style="min-height: var(--header-bar-height)"
>
	<div class="flex items-center justify-between px-4">
		<MrButton variant="text" size="xs" onclick={() => goto('/')}>Do Things</MrButton>
		<ThemeSwitcher />
	</div>
</div>

<style>
	.top-bar {
		backdrop-filter: blur(3px);
		-webkit-backdrop-filter: blur(3px);
		mask: linear-gradient(to top, black 0%, black 80%, transparent 100%);
		-webkit-mask: linear-gradient(to top, black 0%, black 80%, transparent 100%);
	}
</style>
