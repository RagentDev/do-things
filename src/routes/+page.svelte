<script>
	// Any component logic can go here
</script>

<div class="container">
	<div class="content">
		<h1 class="title">Do Things<span class="accent">.</span></h1>
		<p class="slogan">In life<span class="accent">.</span></p>
	</div>
</div>

<style>
	.container {
		width: 100%;
		min-height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(135deg, #0575e6, #00f260);
		font-family: 'Montserrat', sans-serif;
		margin: 0;
		padding: 0;
	}

	.content {
		text-align: center;
		padding: 2rem;
		border-radius: 12px;
		background-color: rgba(255, 255, 255, 0.1);
		backdrop-filter: blur(10px);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
	}

	.title {
		font-size: 5rem;
		font-weight: 700;
		color: white;
		margin-bottom: 0.5rem;
		letter-spacing: -0.05em;
	}

	.slogan {
		font-size: 2.5rem;
		color: rgba(255, 255, 255, 0.9);
		font-weight: 300;
		margin-top: 0;
	}

	.accent {
		color: #ffd700;
		font-weight: 700;
	}

	/* Responsive adjustments */
	@media (max-width: 768px) {
		.title {
			font-size: 3.5rem;
		}

		.slogan {
			font-size: 1.8rem;
		}
	}
</style>
