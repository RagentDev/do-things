<script lang="ts">
	import { dailyGoals } from '$lib/runes/dailyGoalsRunes.svelte';
	import type { IDailyGoal, IDaysActive } from '$lib/types';
	import MrIcon from '$lib/components/common/MrIcon.svelte';
	import MrButton from '$lib/components/common/MrButton.svelte';
	import GlassCard from '$lib/components/common/GlassCard.svelte';

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

<div class="p-4" style="width: 83.333333%; margin: 0 auto;">
	<div>
		<div class="flex items-center justify-between mb-4">
			<MrButton onclick={() => changeDate(-1)}>← Previous Day</MrButton>
			<span>
				{displayDate.toLocaleDateString()} ({getDayNameForDate(displayDate)})
			</span>
			<MrButton onclick={() => changeDate(1)}>Next Day →</MrButton>
		</div>

		{#if currentGoals.length === 0}
			<span>No goals found for this date.</span>
		{:else}
			<div class="grid gap-2">
				{#each currentGoals as goal}
					<GlassCard>
						<div
							class="flex items-center p-2.5 transition-all duration-200 ease-in-out"
						>
							<div
								class="w-10 h-10 flex items-center justify-center mr-4 text-blue-500"
							>
								<MrIcon icon={goal.icon} size="xl" />
							</div>
							<div class="flex-1">
								<span>{goal.name}</span>
								<div class="flex gap-1 mb-2">
									{#each dayLabels as day}
										<span
											class="text-[10px] px-1 py-0.5 rounded-sm {isDayActive(
												day.key,
												goal.frequency
											)
												? 'bg-green-100 text-green-800'
												: 'bg-gray-100 text-gray-500'}"
										>
											{day.label}
										</span>
									{/each}
								</div>
								<div class="w-full h-2 bg-gray-200 rounded overflow-hidden mb-2">
									<div
										class="h-full transition-all duration-300 ease-in-out {isGoalCompleted(
											goal
										)
											? 'bg-green-500'
											: 'bg-blue-500'}"
										style="width: {getCompletionPercentage(goal)}%"
									></div>
								</div>
								<div class="flex">
									<span class="text-gray-500">
										{goal.currentAmount} / {goal.maxAmount}
									</span>
									{#if isGoalCompleted(goal)}
										<div class="ml-2 flex items-center text-success">
											<MrIcon icon="mdi-checkbox-marked" size="sm" />
										</div>
										<span>Completed</span>
									{/if}
								</div>
								{#if !isGoalActiveForToday(goal)}
									<div>Not active today</div>
								{/if}
							</div>

							<!-- Add control buttons for active goals -->
							{#if isGoalActiveForToday(goal)}
								<div class="flex items-center gap-2 ml-8 flex-shrink-0">
									<MrButton
										color="error"
										icon
										onclick={() => decreaseGoalValue(goal.goalSetupId)}
										disabled={goal.currentAmount <= 0}
									>
										<MrIcon size="sm" icon="mdi-minus" class="text-white" />
									</MrButton>
									<span class="w-8 text-center font-bold"
										>{goal.currentAmount}</span
									>
									<MrButton
										color="success"
										icon
										onclick={() => increaseGoalValue(goal.goalSetupId)}
									>
										<MrIcon size="sm" icon="mdi-plus" class="text-white" />
									</MrButton>
								</div>
							{/if}
						</div>
					</GlassCard>
				{/each}
			</div>
		{/if}
	</div>
</div>
