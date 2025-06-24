<script lang="ts">
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';
	import { goto } from '$app/navigation';
</script>

<div class="relative w-full border-fade-bottom">
	<div class="flex items-center justify-between px-4 h-14">
		<MrButton variant="text" size="xs" onclick={() => goto('/')}>Do Things</MrButton>
		<ThemeSwitcher />
	</div>
</div>
