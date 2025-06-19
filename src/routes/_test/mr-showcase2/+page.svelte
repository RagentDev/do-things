<script lang="ts">
	import MrButton from '$lib/components/common/MrButton2.svelte';
	import MrIcon from '$lib/components/common/MrIcon.svelte';

	const variants = ['filled', 'outlined', 'text'] as const;
	const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
</script>

<div class="p-8 space-y-12">
	<h1 class="text-white text-3xl font-bold mb-8">Button Component Showcase</h1>

	<!-- Variants -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Variants</h2>
		<div class="flex gap-4 items-center flex-wrap">
			{#each variants as variant}
				<MrButton {variant}>{variant}</MrButton>
			{/each}
		</div>
		<div class="pt-2 flex gap-4 items-center flex-wrap">
			{#each variants as variant}
				<MrButton {variant} color="secondary">{variant}</MrButton>
			{/each}
		</div>
		<div class="pt-2 flex gap-4 items-center flex-wrap">
			{#each variants as variant}
				<MrButton {variant} color="success">{variant}</MrButton>
			{/each}
		</div>
		<div class="pt-2 flex gap-4 items-center flex-wrap">
			{#each variants as variant}
				<MrButton {variant} color="warning">{variant}</MrButton>
			{/each}
		</div>
		<div class="pt-2 flex gap-4 items-center flex-wrap">
			{#each variants as variant}
				<MrButton {variant} color="error">{variant}</MrButton>
			{/each}
		</div>
	</section>

	<!-- Sizes -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Sizes</h2>
		<div class="flex gap-4 items-center flex-wrap">
			{#each sizes as size}
				<MrButton {size}>{size}</MrButton>
			{/each}
		</div>
	</section>

	<!-- Icon Buttons -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Icon Buttons</h2>
		<div class="space-y-4">
			{#each variants as variant}
				<div class="space-y-2">
					<h3 class="text-white text-lg font-medium capitalize">{variant}</h3>
					<div class="flex gap-4 items-center flex-wrap">
						{#each sizes as size}
							<MrButton {variant} {size} icon>
								<MrIcon icon="mdi-heart" class="text-secondary" {size} />
							</MrButton>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Prepend Icon Buttons -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Prepend Icon Buttons</h2>
		<div class="space-y-4">
			{#each variants as variant}
				<div class="space-y-2">
					<h3 class="text-white text-lg font-medium capitalize">{variant}</h3>
					<div class="flex gap-4 items-center flex-wrap">
						{#each sizes as size}
							<MrButton {variant} {size}>
								<MrIcon icon="mdi-content-save" class="mr-2" {size} />
								Save
							</MrButton>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Append Icon Buttons -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Append Icon Buttons</h2>
		<div class="space-y-4">
			{#each variants as variant}
				<div class="space-y-2">
					<h3 class="text-white text-lg font-medium capitalize">{variant}</h3>
					<div class="flex gap-4 items-center flex-wrap">
						{#each sizes as size}
							<MrButton {variant} {size}>
								Download
								<MrIcon icon="mdi-download" class="ml-2" {size} />
							</MrButton>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Disabled States -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Disabled States</h2>
		<div class="space-y-4">
			{#each variants as variant}
				<div class="flex gap-4 items-center flex-wrap">
					<MrButton {variant} disabled>{variant} disabled</MrButton>

					<MrButton {variant} disabled class="!p-2 rounded-full aspect-square">
						<MrIcon icon="mdi-heart" class="text-current" />
					</MrButton>

					<MrButton {variant} disabled>
						<MrIcon icon="mdi-share" class="mr-2" />
						Share
					</MrButton>
				</div>
			{/each}
		</div>
	</section>

	<!-- Real-world Examples -->
	<section>
		<h2 class="text-white text-2xl font-semibold mb-4">Real-world Examples</h2>
		<div class="space-y-6">
			<!-- Action buttons -->
			<div class="space-y-2">
				<h3 class="text-white text-lg font-medium">Action Buttons</h3>
				<div class="flex gap-4 flex-wrap">
					<MrButton variant="filled">
						<MrIcon icon="mdi-plus" class="mr-2" />
						Create New
					</MrButton>

					<MrButton variant="outlined">
						<MrIcon icon="mdi-content-save" class="mr-2" />
						Save Draft
					</MrButton>

					<MrButton variant="text">
						<MrIcon icon="mdi-delete" class="mr-2" />
						Delete
					</MrButton>
				</div>
			</div>

			<!-- Icon only buttons -->
			<div class="space-y-2">
				<h3 class="text-white text-lg font-medium">Icon Only Buttons</h3>
				<div class="flex gap-4 flex-wrap">
					<MrButton variant="filled" class="!p-3 rounded-full">
						<MrIcon icon="mdi-heart" class="text-current" />
					</MrButton>

					<MrButton variant="outlined" class="!p-3 rounded-full">
						<MrIcon icon="mdi-share" class="text-current" />
					</MrButton>

					<MrButton variant="text" class="!p-3 rounded-full">
						<MrIcon icon="mdi-download" class="text-current" />
					</MrButton>
				</div>
			</div>

			<!-- Size variations with icons -->
			<div class="space-y-2">
				<h3 class="text-white text-lg font-medium">Size Variations</h3>
				<div class="flex gap-4 items-center flex-wrap">
					<MrButton size="xs">
						<MrIcon icon="mdi-plus" class="mr-1" />
						Add
					</MrButton>

					<MrButton size="small">
						<MrIcon icon="mdi-content-save" class="mr-2" />
						Save
					</MrButton>

					<MrButton size="medium">
						<MrIcon icon="mdi-download" class="mr-2" />
						Download
					</MrButton>

					<MrButton size="large">
						<MrIcon icon="mdi-share" class="mr-2" />
						Share File
					</MrButton>

					<MrButton size="extra-large">
						<MrIcon icon="mdi-heart" class="mr-3" />
						Add to Favorites
					</MrButton>
				</div>
			</div>
		</div>
	</section>
</div>
