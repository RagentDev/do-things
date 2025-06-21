<script lang="ts">
	import MrButton from '$lib/components/common/MrButton.svelte';
	import MrIcon from '$lib/components/common/MrIcon.svelte';
</script>

<!-- $lib/components/BottomBar.svelte -->
<div class="flex items-center justify-center gap-4 border-fade-top" style="min-height: 120px">
	<MrButton class="active-icon" variant="text" color="secondary" size="xl" icon>
		<MrIcon class="text-success" icon="mdi-home" size="xl" />
	</MrButton>
	<MrButton variant="text" color="secondary" size="xl" icon disabled>
		<MrIcon class="text-success" icon="mdi-list-box-outline" size="xl" />
	</MrButton>
	<MrButton variant="text" color="secondary" size="xl" icon disabled>
		<MrIcon class="text-success" icon="mdi-plus" size="xl" />
	</MrButton>
	<MrButton variant="text" color="secondary" size="xl" icon disabled>
		<MrIcon class="text-success" icon="mdi-account" size="xl" />
	</MrButton>
</div>

<style>
	:global(.active-icon) {
		position: relative;
	}

	:global(.active-icon::after) {
		content: '';
		position: absolute;
		bottom: 0;
		top: 85%;
		left: 50%;
		transform: translateX(-50%);
		width: 50%;
		height: 3px;
		background-color: #10b981;
		border-radius: 9999px;
	}
</style>
