<script lang="ts">
	import '../app.css';
	import InstallPrompt from '$lib/components/InstallPrompt.svelte';
</script>

<svelte:head>
	<title>Do Things</title>
</svelte:head>

<InstallPrompt />
<slot></slot>
