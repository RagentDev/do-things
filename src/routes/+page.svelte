<script lang="ts">
	import GlassCard from '$lib/components/common/GlassCard.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';
	import { goto } from '$app/navigation';

	const testPages = [
		{ name: 'Empty', path: '/_test/empty' },
		{ name: 'Goals', path: '/_test/goals' },
		{ name: 'Goals List', path: '/_test/goals-list' },
		{ name: 'MR Showcase', path: '/_test/mr-showcase' }
	];
</script>

<div class="h-full flex justify-center items-center">
	<div>
		<div>
			<GlassCard>
				<h1 class="font-bold text-inverse mb-2 px-2">Test Pages</h1>
				<div class="flex flex-col gap-2 p-2">
					{#each testPages as page}
						<MrButton
							variant="outlined"
							size="sm"
							color="primary"
							onclick={() => goto(page.path)}
						>
							{page.name}
						</MrButton>
					{/each}
				</div>
			</GlassCard>
		</div>
		<br />
		<div class="text-center">
			<GlassCard>
				<h1 class="font-bold text-inverse mb-2 px-2">
					Do Things<span class="text-warning font-bold">.</span>
				</h1>
				<p class="text-inverse font-light mt-0 px-2">
					In life<span class="text-warning font-bold">.</span>
				</p>
			</GlassCard>
		</div>
	</div>
</div>
