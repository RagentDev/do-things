<script lang="ts">
	import { dailyGoals } from '$lib/runes/dailyGoalsRunes.svelte';
	import * as dateFns from 'date-fns';
	import type { IDailyGoal, IDailyGoalSetup, IDaysActive } from '$lib/types';

	// State for the form
	let goalName = $state('');
	let goalIcon = $state('fa:FaRunning');
	let requiredAmount = $state(1);
	let startDate = $state(dateFns.format(new Date(), 'yyyy-MM-dd'));

	// Days active state
	let daysActive: IDaysActive = {
		monday: true,
		tuesday: true,
		wednesday: true,
		thursday: true,
		friday: true,
		saturday: true,
		sunday: true
	};

	// State for displaying goals
	let displayDate = $state(new Date());
	let currentGoals = $derived(dailyGoals.getGoals(displayDate));

	function handleSubmit() {
		// TODO: Create helper function for this in the rune
		const newGoalSetup: IDailyGoalSetup = {
			id: Date.now().toString(), // Simple ID generation
			name: goalName,
			icon: goalIcon,
			startDate: new Date(startDate),
			frequency: { ...daysActive }, // Clone the days active object
			requiredAmount: requiredAmount
		};

		dailyGoals.addGoalSetup(newGoalSetup);

		// Reset form
		goalName = '';
		goalIcon = 'fa:FaRunning';
		requiredAmount = 1;
		startDate = dateFns.format(new Date(), 'yyyy-MM-dd');
		daysActive = {
			monday: true,
			tuesday: true,
			wednesday: true,
			thursday: true,
			friday: true,
			saturday: true,
			sunday: true
		} as IDaysActive;
	}

	function changeDate(days: number) {
		displayDate = new Date(displayDate);
		displayDate.setDate(displayDate.getDate() + days);
		dailyGoals.ensureGoalsForDate(displayDate);
	}

	function isDayActive(day: string, frequency: IDaysActive): boolean {
		return frequency[day as keyof IDaysActive];
	}

	function resetStore() {
		if (confirm('Are you sure you want to reset all goals data?')) {
			dailyGoals.reset();
		}
	}

	function getDayNameForDate(date: Date): string {
		const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		return days[date.getDay()];
	}

	function isGoalActiveForToday(goal: IDailyGoal): boolean {
		const today = getDayNameForDate(displayDate);
		return isDayActive(today, goal.frequency);
	}

	// Icons for selection
	const iconOptions = [
		{ value: 'fa:FaRunning', label: 'Running' },
		{ value: 'fa:FaWater', label: 'Water' },
		{ value: 'fa:FaBook', label: 'Reading' },
		{ value: 'fa:FaDumbbell', label: 'Exercise' },
		{ value: 'fa:FaMeditation', label: 'Meditation' }
	];

	// Day labels
	const dayLabels = [
		{ key: 'monday', label: 'Mon' },
		{ key: 'tuesday', label: 'Tue' },
		{ key: 'wednesday', label: 'Wed' },
		{ key: 'thursday', label: 'Thu' },
		{ key: 'friday', label: 'Fri' },
		{ key: 'saturday', label: 'Sat' },
		{ key: 'sunday', label: 'Sun' }
	];

	// Add these new functions for increasing/decreasing goal values
	function increaseGoalValue(goalId: string, amount: number = 1) {
		dailyGoals.addValueToGoal(goalId, displayDate, amount);
	}

	function decreaseGoalValue(goalId: string, amount: number = 1) {
		dailyGoals.addValueToGoal(goalId, displayDate, -amount);
	}

	// Get completion percentage for styling
	function getCompletionPercentage(goal: IDailyGoal): number {
		return Math.min((goal.currentAmount / goal.maxAmount) * 100, 100);
	}

	// Check if goal is completed
	function isGoalCompleted(goal: IDailyGoal): boolean {
		return goal.currentAmount >= goal.maxAmount;
	}
</script>

<div class="container bg-primary">
	<h1>Daily Goals Test Page</h1>

	<div class="card">
		<h2>Create New Goal</h2>
		<form onsubmit={handleSubmit}>
			<div class="form-group">
				<label for="goalName">Goal Name</label>
				<input id="goalName" type="text" bind:value={goalName} required />
			</div>

			<div class="form-group">
				<label for="goalIcon">Icon</label>
				<select id="goalIcon" bind:value={goalIcon}>
					{#each iconOptions as option}
						<option value={option.value}>{option.label}</option>
					{/each}
				</select>
			</div>

			<!--			<div class="form-group">-->
			<!--				<label>Active Days</label>-->
			<!--				<div class="days-selector">-->
			<!--					{#each dayLabels as day}-->
			<!--						<div class="day-checkbox">-->
			<!--							<input-->
			<!--								type="checkbox"-->
			<!--								id={day.key}-->
			<!--								bind:checked={daysActive[day.key]}-->
			<!--							/>-->
			<!--							<label for={day.key}>{day.label}</label>-->
			<!--						</div>-->
			<!--					{/each}-->
			<!--				</div>-->
			<!--			</div>-->

			<div class="form-group">
				<label for="requiredAmount">Required Amount</label>
				<input
					id="requiredAmount"
					type="number"
					bind:value={requiredAmount}
					min="1"
					required
				/>
			</div>

			<div class="form-group">
				<label for="startDate">Start Date</label>
				<input id="startDate" type="date" bind:value={startDate} required />
			</div>

			<button type="submit" class="btn primary">Create Goal</button>
		</form>
	</div>

	<div class="card">
		<div class="date-navigator">
			<button onclick={() => changeDate(-1)} class="btn">← Previous Day</button>
			<h2>{displayDate.toLocaleDateString()} ({getDayNameForDate(displayDate)})</h2>
			<button onclick={() => changeDate(1)} class="btn">Next Day →</button>
		</div>

		<h3>Goals for this date</h3>
		{#if currentGoals.length === 0}
			<p class="empty-state">No goals found for this date.</p>
		{:else}
			<div class="goals-list">
				{#each currentGoals as goal}
					<div
						class="goal-item {!isGoalActiveForToday(goal)
							? 'inactive'
							: ''} {isGoalCompleted(goal) ? 'completed' : ''}"
					>
						<div class="goal-icon">
							<span>{goal.icon}</span>
						</div>
						<div class="goal-details">
							<h4>{goal.name}</h4>
							<div class="active-days">
								{#each dayLabels as day}
									<span
										class="day-indicator {isDayActive(day.key, goal.frequency)
											? 'active'
											: 'inactive'}"
									>
										{day.label}
									</span>
								{/each}
							</div>
							<div class="progress-container">
								<div
									class="progress-bar {isGoalCompleted(goal) ? 'completed' : ''}"
									style="width: {getCompletionPercentage(goal)}%"
								></div>
							</div>
							<div class="progress-text">
								{goal.currentAmount} / {goal.maxAmount}
								{#if isGoalCompleted(goal)}
									<span class="completion-badge">✅ Completed!</span>
								{/if}
							</div>
							{#if !isGoalActiveForToday(goal)}
								<div class="inactive-notice">Not active today</div>
							{/if}
						</div>

						<!-- Add control buttons for active goals -->
						{#if isGoalActiveForToday(goal)}
							<div class="goal-controls">
								<button
									class="btn control-btn decrease"
									onclick={() => decreaseGoalValue(goal.goalSetupId)}
									disabled={goal.currentAmount <= 0}
									title="Decrease by 1"
								>
									−
								</button>
								<span class="current-value">{goal.currentAmount}</span>
								<button
									class="btn control-btn increase"
									onclick={() => increaseGoalValue(goal.goalSetupId)}
									title="Increase by 1"
								>
									+
								</button>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}
	</div>

	<div class="card">
		<h2>Debugging</h2>
		<div class="debug-section">
			<h3>Active Goal Setups</h3>
			{#if dailyGoals.goalSetups.length === 0}
				<p class="empty-state">No goal setups defined.</p>
			{:else}
				<ul class="debug-list">
					{#each dailyGoals.goalSetups as setup}
						<li>
							<strong>{setup.name}</strong>
							<br />
							Start Date: {new Date(setup.startDate).toLocaleDateString()}
							<br />
							Required: {setup.requiredAmount}
							<br />
							Active days:
							{#each dayLabels as day}
								<span
									class="day-debug {isDayActive(day.key, setup.frequency)
										? 'active'
										: ''}"
								>
									{day.label}
								</span>
							{/each}
						</li>
					{/each}
				</ul>
			{/if}
		</div>
		<button onclick={resetStore} class="btn danger">Reset Store</button>
	</div>
</div>

<style>
	.container {
		max-width: 800px;
		margin: 0 auto;
		padding: 20px;
		font-family:
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			Roboto,
			sans-serif;
	}

	h1,
	h2,
	h3,
	h4 {
		color: #333;
	}

	.card {
		background: #fff;
		border-radius: 8px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-bottom: 20px;
	}

	.form-group {
		margin-bottom: 15px;
	}

	label {
		display: block;
		margin-bottom: 5px;
		font-weight: 500;
	}

	input,
	select {
		width: 100%;
		padding: 8px;
		border: 1px solid #ddd;
		border-radius: 4px;
		font-size: 16px;
	}

	.btn {
		background: #e0e0e0;
		border: none;
		padding: 10px 15px;
		border-radius: 4px;
		cursor: pointer;
		font-size: 14px;
		margin-right: 5px;
	}

	.btn.primary {
		background: #4a7bff;
		color: white;
	}

	.btn.danger {
		background: #ff4a4a;
		color: white;
	}

	.date-navigator {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 15px;
	}

	.goals-list {
		display: grid;
		gap: 15px;
	}

	.goal-item {
		display: flex;
		align-items: center;
		padding: 10px;
		border: 1px solid #eee;
		border-radius: 6px;
		background: #f9f9f9;
	}

	.goal-item.inactive {
		opacity: 0.6;
	}

	.goal-icon {
		width: 40px;
		height: 40px;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 15px;
		color: #4a7bff;
	}

	.goal-details {
		flex: 1;
	}

	.goal-details h4 {
		margin: 0 0 5px 0;
	}

	.active-days {
		display: flex;
		gap: 5px;
		margin-bottom: 8px;
	}

	.day-indicator {
		font-size: 10px;
		padding: 2px 4px;
		border-radius: 3px;
		background: #f0f0f0;
	}

	.day-indicator.active {
		background: #c8e6c9;
		color: #2e7d32;
	}

	.day-indicator.inactive {
		color: #9e9e9e;
	}

	.progress-container {
		width: 100%;
		height: 8px;
		background: #eee;
		border-radius: 4px;
		overflow: hidden;
		margin-bottom: 5px;
	}

	.progress-bar {
		height: 100%;
		background: #4a7bff;
	}

	.progress-text {
		font-size: 12px;
		color: #666;
	}

	.inactive-notice {
		margin-top: 5px;
		font-size: 12px;
		color: #f44336;
		font-style: italic;
	}

	.debug-section {
		margin-bottom: 15px;
	}

	.debug-list {
		padding-left: 20px;
		margin-top: 5px;
	}

	.debug-list li {
		margin-bottom: 10px;
	}

	.day-debug {
		display: inline-block;
		padding: 2px 4px;
		margin: 2px;
		border-radius: 3px;
		background: #f0f0f0;
		color: #9e9e9e;
	}

	.day-debug.active {
		background: #c8e6c9;
		color: #2e7d32;
	}

	.empty-state {
		color: #888;
		font-style: italic;
		text-align: center;
		margin: 20px 0;
	}

	.goal-item {
		display: flex;
		align-items: center;
		padding: 10px;
		border: 1px solid #eee;
		border-radius: 6px;
		background: #f9f9f9;
		transition: all 0.2s ease;
	}

	.goal-item.inactive {
		opacity: 0.6;
	}

	.goal-item.completed {
		border-color: #4caf50;
		background: #f1f8e9;
	}

	.goal-controls {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-left: 15px;
		flex-shrink: 0;
	}

	.control-btn {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 18px;
		font-weight: bold;
		padding: 0;
		margin: 0;
		transition: all 0.2s ease;
	}

	.control-btn.increase {
		background: #4caf50;
		color: white;
	}

	.control-btn.increase:hover:not(:disabled) {
		background: #45a049;
		transform: scale(1.05);
	}

	.control-btn.decrease {
		background: #f44336;
		color: white;
	}

	.control-btn.decrease:hover:not(:disabled) {
		background: #da190b;
		transform: scale(1.05);
	}

	.control-btn:disabled {
		opacity: 0.3;
		cursor: not-allowed;
		transform: none;
	}

	.current-value {
		font-weight: bold;
		font-size: 16px;
		min-width: 30px;
		text-align: center;
		color: #333;
	}

	.progress-bar {
		height: 100%;
		background: #4a7bff;
		transition: all 0.3s ease;
	}

	.progress-bar.completed {
		background: #4caf50;
	}

	.completion-badge {
		color: #4caf50;
		font-weight: bold;
		margin-left: 10px;
		font-size: 14px;
	}

	/* Responsive adjustments */
	@media (max-width: 600px) {
		.goal-item {
			flex-direction: column;
			align-items: flex-start;
		}

		.goal-controls {
			margin-left: 0;
			margin-top: 10px;
			align-self: stretch;
			justify-content: center;
		}
	}
</style>
