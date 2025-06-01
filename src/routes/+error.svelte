<script lang="ts">
	import { page } from '$app/state';
</script>

{#if page.status === 404}
	<div>
		<h1>Page Not Found</h1>
		<p>Sorry, the page you're looking for doesn't exist.</p>
		<a href="/">Go back home</a>
	</div>
{:else}
	<div>
		<h1>Error: {page.status}</h1>
		<p>{page.error?.message}</p>
	</div>
{/if}
