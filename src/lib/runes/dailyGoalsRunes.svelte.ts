// src/lib/runes/dailyGoalsRunes.ts
import { formatDateToYYYYMMDD } from '$lib/utils/dateUtils';

// Define the state interface (same as before)
interface IDailyGoalsState {
	goalSetups: IDailyGoalSetup[];
	goals: Record<string, Record<string, IDailyGoal>>;
}

const STORE_NAME = 'dailyGoalsStore';
const INITIAL_STATE: IDailyGoalsState = {
	goalSetups: [],
	goals: {}
};

// Create the global state rune
const dailyGoalsState = $state<IDailyGoalsState>(loadStateFromStorage());

// Track if we've initialized persistence
let persistenceInitialized = false;

// public api
interface IDailyGoalsManager {
	// Reactive getters
	readonly state: IDailyGoalsState;
	readonly goalSetups: IDailyGoalSetup[];
	readonly allGoals: Record<string, Record<string, IDailyGoal>>;

	// Actions
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

	// Actions
	// Add initialization method
	initialize() {
		if (typeof window !== 'undefined' && !persistenceInitialized) {
			persistenceInitialized = true;
			$effect(() => {
				saveStateToStorage(dailyGoalsState);
			});
		}
	},

	reset() {
		dailyGoalsState.goalSetups.length = 0;
		Object.keys(dailyGoalsState.goals).forEach((key) => {
			delete dailyGoalsState.goals[key];
		});
	},

	addGoalSetup(goalSetup: IDailyGoalSetup) {
		dailyGoalsState.goalSetups.push(goalSetup);
	},

	getGoals(date: Date): IDailyGoal[] {
		// Same implementation as class version
		const formattedDate = formatDateToYYYYMMDD(date);
		let goalDateRecords = dailyGoalsState.goals[formattedDate] || {};

		const activeSetups = getActiveGoalSetups(date);

		console.log(`Goal Date Records for ${formattedDate}: ` + JSON.stringify(goalDateRecords));
		console.log(`Active Setups for ${formattedDate}: ` + JSON.stringify(activeSetups));

		for (const setup of activeSetups) {
			if (!goalDateRecords[setup.id]) {
				const newGoal = createDailyGoal(setup);
				const hasAdded = addGoalToState(newGoal, date);
				if (hasAdded) {
					goalDateRecords = { ...goalDateRecords, [setup.id]: newGoal };
				}
			}
		}

		return Object.values(goalDateRecords);
	},

	addValueToGoal(goalId: string, date: Date, increase: number) {
		const formattedDate = formatDateToYYYYMMDD(date);

		if (!dailyGoalsState.goals[formattedDate]) {
			dailyGoalsState.goals[formattedDate] = {};
		}

		const targetGoal = dailyGoalsState.goals[formattedDate][goalId];
		if (targetGoal) {
			targetGoal.currentAmount = Math.max(0, targetGoal.currentAmount + increase);
		}
	}
} satisfies IDailyGoalsManager;

export const dailyGoals: IDailyGoalsManager = dailyGoalsImpl;

// Helper functions
function getActiveGoalSetups(date: Date): IDailyGoalSetup[] {
	const targetDate = new Date(date);
	targetDate.setHours(0, 0, 0, 0);

	return dailyGoalsState.goalSetups.filter((setup) => {
		// Normalize setup date to start of day
		const setupDate = new Date(setup.startDate);
		setupDate.setHours(0, 0, 0, 0);

		return setupDate <= targetDate;
	});
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

	if (!dailyGoalsState.goals[formattedDate]) {
		dailyGoalsState.goals[formattedDate] = {};
	}

	if (dailyGoalsState.goals[formattedDate][goal.goalSetupId]) {
		return false;
	}

	dailyGoalsState.goals[formattedDate][goal.goalSetupId] = goal;
	return true;
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
