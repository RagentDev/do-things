﻿<script lang="ts">
	import ButtonToggleConsole from '$lib/components/console/ButtonToggleConsole.svelte';
	import ContainerConsole from '$lib/components/console/ContainerConsole.svelte';

	let floatingConsole: ContainerConsole;
	let isVisible = $state<boolean>(false);

	function toggleConsole(): void {
		isVisible = !isVisible;
		floatingConsole.isVisible = isVisible;
	}
</script>

<ContainerConsole bind:this={floatingConsole} bind:isVisible />
<ButtonToggleConsole onToggle={toggleConsole} />
