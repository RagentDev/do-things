import { logger } from '$lib/runes/loggerRunes.svelte';
import * as dateFns from 'date-fns';
import type { IDailyGoal, IDailyGoalSetup } from '$lib/types';

interface IDailyGoalsState {
	goalSetups: IDailyGoalSetup[];
	goals: Record<string, Record<string, IDailyGoal>>;
}

const STORE_NAME = 'dailyGoalsStore';
const INITIAL_STATE: IDailyGoalsState = {
	goalSetups: [],
	goals: {}
};

const dailyGoalsState = $state<IDailyGoalsState>(loadStateFromStorage());
let persistenceInitialized = false;

interface IDailyGoalsManager {
	readonly state: IDailyGoalsState;
	readonly goalSetups: IDailyGoalSetup[];
	readonly allGoals: Record<string, Record<string, IDailyGoal>>;

	reset(): void;
	initialize(): void;
	addGoalSetup(goalSetup: IDailyGoalSetup): void;
	getGoals(date: Date): IDailyGoal[];
	addValueToGoal(goalId: string, date: Date, increase: number): void;
}

const dailyGoalsImpl = {
	// Reactive getters
	get state() {
		return dailyGoalsState;
	},
	get goalSetups() {
		return dailyGoalsState.goalSetups;
	},
	get allGoals() {
		return dailyGoalsState.goals;
	},

	initialize() {
		logger?.info('Daily Goals: Initializing rune store.');
		if (typeof window !== 'undefined' && !persistenceInitialized) {
			persistenceInitialized = true;
			logger?.success('Daily Goals: Rune store initialized.');
			$effect(() => {
				saveStateToStorage(dailyGoalsState);
			});
		}
	},

	reset() {
		logger?.info('Daily Goals: Resetting rune store.');
		dailyGoalsState.goalSetups.length = 0;
		Object.keys(dailyGoalsState.goals).forEach((key) => {
			delete dailyGoalsState.goals[key];
		});
		logger?.success('Daily Goals: Reset rune store.');
	},

	addGoalSetup(goalSetup: IDailyGoalSetup) {
		dailyGoalsState.goalSetups.push(goalSetup);
		logger?.info(`Daily Goals: Added new goal - ${JSON.stringify(goalSetup)}`);
	},

	getGoals(date: Date): IDailyGoal[] {
		// Same implementation as class version
		const formattedDate = formatDateToYYYYMMDD(date);
		let goalDateRecords = dailyGoalsState.goals[formattedDate] ?? {};

		const activeSetups = getActiveGoalSetups(date);
		logger?.info(`Daily Goals: Getting goals, found ${activeSetups.length} for today.`);

		for (const setup of activeSetups) {
			if (!(setup.id in goalDateRecords)) {
				logger?.info(`Daily Goals: Could not find '${setup.name}', creating...`);
				const newGoal = createDailyGoal(setup);
				const hasAdded = addGoalToState(newGoal, date);
				if (hasAdded) {
					goalDateRecords = { ...goalDateRecords, [setup.id]: newGoal };
					logger?.success(`Daily Goals: Successfully created '${setup.name}'.`);
				} else {
					logger?.error(`Daily Goals: Could not create '${setup.name}'.`);
				}
			}
		}

		return Object.values(goalDateRecords);
	},

	addValueToGoal(goalId: string, date: Date, increase: number) {
		const formattedDate = formatDateToYYYYMMDD(date);

		if (!(formattedDate in dailyGoalsState.goals)) {
			dailyGoalsState.goals[formattedDate] = {};
		}

		if (goalId in dailyGoalsState.goals[formattedDate]) {
			const targetGoal: IDailyGoal = dailyGoalsState.goals[formattedDate][goalId];
			logger?.info(`Daily Goals: Adding value '${increase}' to '${targetGoal.name}'.`);
			targetGoal.currentAmount = Math.max(0, targetGoal.currentAmount + increase);
		} else {
			logger?.error(`Daily Goals: Could not find target goal '${goalId}'`);
		}
	}
} satisfies IDailyGoalsManager;

export const dailyGoals: IDailyGoalsManager = dailyGoalsImpl;

// Helper functions
function getActiveGoalSetups(date: Date): IDailyGoalSetup[] {
	return dailyGoalsState.goalSetups.filter(
		(setup) => !dateFns.isAfter(new Date(setup.startDate), date)
	);
}

function createDailyGoal(setup: IDailyGoalSetup): IDailyGoal {
	return {
		goalSetupId: setup.id,
		name: setup.name,
		icon: setup.icon,
		currentAmount: 0,
		maxAmount: setup.requiredAmount,
		frequency: setup.frequency
	};
}

function addGoalToState(goal: IDailyGoal, date: Date): boolean {
	const formattedDate = formatDateToYYYYMMDD(date);

	if (!(formattedDate in dailyGoalsState.goals)) {
		dailyGoalsState.goals[formattedDate] = {};
	}

	if (goal.goalSetupId in dailyGoalsState.goals[formattedDate]) {
		return false;
	}

	dailyGoalsState.goals[formattedDate][goal.goalSetupId] = goal;
	return true;
}

function formatDateToYYYYMMDD(date: Date): string {
	return dateFns.format(date, 'yyyy-MM-dd');
}

function loadStateFromStorage(): IDailyGoalsState {
	if (typeof localStorage === 'undefined') return INITIAL_STATE;

	try {
		const savedState = localStorage.getItem(STORE_NAME);
		return savedState ? JSON.parse(savedState) : INITIAL_STATE;
	} catch (error) {
		console.error('Failed to load state from localStorage:', error);
		return INITIAL_STATE;
	}
}

function saveStateToStorage(state: IDailyGoalsState): void {
	if (typeof localStorage === 'undefined') return;

	try {
		localStorage.setItem(STORE_NAME, JSON.stringify(state));
	} catch (error) {
		console.error('Failed to save state to localStorage:', error);
	}
}
