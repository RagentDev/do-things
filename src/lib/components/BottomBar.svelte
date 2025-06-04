<!-- $lib/components/BottomBar.svelte -->
<div
	class="flex items-center justify-around h-16 bg-white/10 backdrop-blur-md border-t border-white/20"
>
	<!-- Home Button -->
	<button class="flex flex-col items-center justify-center p-2 text-white focus:outline-none">
		<div class="h-6 w-6 mb-1 flex items-center justify-center">
			<!-- Icon placeholder - replace with your icon or emoji -->
			🏠
		</div>
		<span class="text-xs">Home</span>
	</button>

	<!-- Search Button -->
	<button class="flex flex-col items-center justify-center p-2 text-white focus:outline-none">
		<div class="h-6 w-6 mb-1 flex items-center justify-center">
			<!-- Icon placeholder -->
			🔍
		</div>
		<span class="text-xs">Search</span>
	</button>

	<!-- Add Button (Primary action) -->
	<button class="flex flex-col items-center justify-center p-2 text-white focus:outline-none">
		<div
			class="h-8 w-8 mb-1 bg-white rounded-full flex items-center justify-center text-blue-500"
		>
			+
		</div>
		<span class="text-xs">Add</span>
	</button>

	<!-- Notifications Button -->
	<button class="flex flex-col items-center justify-center p-2 text-white focus:outline-none">
		<div class="h-6 w-6 mb-1 flex items-center justify-center relative">
			<!-- Icon placeholder -->
			🔔
			<!-- Badge for notifications -->
			<span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
		</div>
		<span class="text-xs">Alerts</span>
	</button>

	<!-- Profile Button -->
	<button class="flex flex-col items-center justify-center p-2 text-white focus:outline-none">
		<div class="h-6 w-6 mb-1 flex items-center justify-center">
			<!-- Icon placeholder -->
			👤
		</div>
		<span class="text-xs">Profile</span>
	</button>
</div>
