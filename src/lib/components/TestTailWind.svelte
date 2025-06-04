<!-- $lib/components/TopBar.svelte -->
<div class="relative bg-gray-500 w-full z-10">
	<div class="flex items-center justify-between px-4 h-14">
		<!-- Left Side -->
		<div class="flex items-center">
			<button class="px-2 py-1 text-white focus:outline-none font-medium"> Back </button>
		</div>

		<!-- Title -->
		<h1 class="text-base font-semibold text-white">Do Things</h1>

		<!-- Right Side -->
		<div class="flex items-center space-x-3">
			<button class="px-2 py-1 text-white text-sm font-medium focus:outline-none">
				Search
			</button>
			<div class="relative">
				<button class="px-2 py-1 text-white text-sm font-medium focus:outline-none">
					Menu
				</button>
				<!-- Notification Badge -->
				<span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
			</div>
		</div>
	</div>
</div>
