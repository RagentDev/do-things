<script lang="ts">
	import { dailyGoals } from '$lib/runes/dailyGoalsRunes.svelte';
	import type { IDailyGoal, IDaysActive } from '$lib/types';
	import MrIcon from '$lib/components/common/MrIcon.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';

	// State for displaying goals
	let displayDate = $state(new Date());
	let currentGoals = $derived(dailyGoals.getGoals(displayDate));

	function changeDate(days: number) {
		displayDate = new Date(displayDate);
		displayDate.setDate(displayDate.getDate() + days);
		dailyGoals.ensureGoalsForDate(displayDate);
	}

	function isDayActive(day: string, frequency: IDaysActive): boolean {
		return frequency[day as keyof IDaysActive];
	}

	function getDayNameForDate(date: Date): string {
		const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
		return days[date.getDay()];
	}

	function isGoalActiveForToday(goal: IDailyGoal): boolean {
		const today = getDayNameForDate(displayDate);
		return isDayActive(today, goal.frequency);
	}

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

<div class="w-5/6 m-auto p-4">
	<div>
		<div class="flex items-center justify-between mb-4">
			<MrButton onclick={() => changeDate(-1)}>← Previous Day</MrButton>
			<span class="text-white">
				{displayDate.toLocaleDateString()} ({getDayNameForDate(displayDate)})
			</span>
			<MrButton onclick={() => changeDate(1)}>Next Day →</MrButton>
		</div>

		{#if currentGoals.length === 0}
			<span class="text-white">No goals found for this date.</span>
		{:else}
			<div class="grid gap-2">
				{#each currentGoals as goal}
					<div
						class="flex items-center p-2.5 border rounded-md transition-all duration-200 ease-in-out {!isGoalActiveForToday(
							goal
						)
							? 'opacity-60 border-gray-200 bg-gray-50'
							: isGoalCompleted(goal)
								? 'border-green-500 bg-green-50'
								: 'border-gray-200 bg-gray-50'}"
					>
						<div class="w-10 h-10 flex items-center justify-center mr-4 text-blue-500">
							<MrIcon icon={goal.icon} size="extra-large" />
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
</div>

<style>
	h4 {
		color: #333;
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
		.goal-controls {
			margin-left: 0;
			margin-top: 10px;
			align-self: stretch;
			justify-content: center;
		}
	}
</style>
