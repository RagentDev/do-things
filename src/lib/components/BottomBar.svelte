<script lang="ts">
	import MrButton from '$lib/components/common/MrButton.svelte';
	import MrIcon from '$lib/components/common/MrIcon.svelte';
</script>

<!-- $lib/components/BottomBar.svelte -->
<div class="flex items-center justify-center gap-4 h-16 border-fade-top border-white/20">
	<MrButton class="active-icon" variant="text" color="secondary" size="extra-large" icon>
		<MrIcon class="text-emerald-500" icon="mdi-home" size="extra-large" />
	</MrButton>
	<MrButton variant="text" color="secondary" size="extra-large" icon disabled>
		<MrIcon class="text-red-500" icon="mdi-list-box-outline" size="extra-large" />
	</MrButton>
	<MrButton variant="text" color="secondary" size="extra-large" icon disabled>
		<MrIcon class="text-purple-500" icon="mdi-plus" size="extra-large" />
	</MrButton>
	<MrButton variant="text" color="secondary" size="extra-large" icon disabled>
		<MrIcon class="text-orange-500" icon="mdi-account" size="extra-large" />
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
