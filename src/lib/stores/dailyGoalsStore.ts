// src/lib/stores/dailyGoalsStore.ts
import { writable, get, type Writable, type Readable } from 'svelte/store';
import { formatDateToYYYYMMDD } from '$lib/utils/dateUtils';

// Define the store state interface
interface IDailyGoalsState {
	goalSetups: IDailyGoalSetup[];
	goals: Record<string, Record<string, IDailyGoal>>;
}

const STORE_NAME = 'dailyGoalsStore';
const INITIAL_STATE: IDailyGoalsState = {
	goalSetups: [],
	goals: {}
};

interface IDailyGoalsStore extends Readable<IDailyGoalsState> {
	subscribe: (
		run: (value: IDailyGoalsState) => void,
		invalidate?: (value?: IDailyGoalsState) => void
	) => () => void;
	addGoalSetup: (goal: IDailyGoalSetup) => void;
	getGoals: (date: Date) => IDailyGoal[];
	addValueToGoal: (goalId: string, date: Date, increase: number) => void;
	reset: () => void;
}

class DailyGoalsStoreImpl implements IDailyGoalsStore {
	private readonly store: Writable<IDailyGoalsState>;

	constructor() {
		// Initialize store with data from localStorage
		this.store = writable<IDailyGoalsState>(this.loadStateFromStorage());

		// Set up localStorage persistence
		if (typeof window !== 'undefined') {
			this.store.subscribe((state) => {
				this.saveStateToStorage(state);
			});
		}
	}

	subscribe(
		run: (value: IDailyGoalsState) => void,
		invalidate?: (value?: IDailyGoalsState) => void
	) {
		return this.store.subscribe(run, invalidate);
	}

	reset(): void {
		this.store.set(INITIAL_STATE);
	}

	getGoals(date: Date): IDailyGoal[] {
		const formattedDate = formatDateToYYYYMMDD(date);
		const state = this.getState();

		// Return goals for the requested date
		let goalDateRecords = state.goals[formattedDate] || {};

		// Read goal setups
		const goalSetups = this.getGoalSetups(date);

		for (const setup of goalSetups) {
			// If this setup doesn't have a goal for this date, create one
			if (!goalDateRecords[setup.id]) {
				// Create a new daily goal instance
				const newGoal: IDailyGoal = {
					goalSetupId: setup.id,
					name: setup.name,
					icon: setup.icon,
					currentAmount: 0,
					maxAmount: setup.requiredAmount,
					frequency: setup.frequency
				};

				// Add the goal to the state
				const hasAddedGoal = this.addGoalToState(newGoal, date);

				// Update our local reference of goalDateRecords
				if (hasAddedGoal) {
					goalDateRecords = {
						...goalDateRecords,
						[setup.id]: newGoal
					};
				}
			}
		}

		// finally return all goals with the updated records
		return Object.values(goalDateRecords);
	}

	addValueToGoal(goalId: string, date: Date, increase: number): void {
		const formattedDate = formatDateToYYYYMMDD(date);

		this.store.update((state) => {
			const goalsForDate = state.goals[formattedDate] || {};
			const targetGoal = goalsForDate[goalId];

			if (!targetGoal) {
				// Goal doesn't exist for this date, return state unchanged
				return state;
			}

			// Create updated goal with new current amount
			const updatedGoal = {
				...targetGoal,
				currentAmount: Math.max(0, targetGoal.currentAmount + increase) // Prevent negative values
			};

			// Create updated goals for this date
			const updatedGoalsForDate = {
				...goalsForDate,
				[goalId]: updatedGoal
			};

			// Create updated goals dictionary
			const updatedGoals = {
				...state.goals,
				[formattedDate]: updatedGoalsForDate
			};

			// Return updated state
			return {
				...state,
				goals: updatedGoals
			};
		});
	}
	addGoalSetup(goalSetup: IDailyGoalSetup): void {
		this.store.update((state) => ({
			...state,
			goalSetups: [...state.goalSetups, goalSetup]
		}));
	}

	private getGoalSetups(date: Date): IDailyGoalSetup[] {
		const state = this.getState();
		return state.goalSetups.filter((setup) => setup.startDate <= date);
	}

	private addGoalToState(goal: IDailyGoal, date: Date): boolean {
		const formattedDate = formatDateToYYYYMMDD(date);
		let wasAdded = false;

		this.store.update((state) => {
			// Get existing goals for this date or create empty object
			const goalsForDate = state.goals[formattedDate] || {};

			// Check if this goal already exists (prevent duplicate)
			if (goalsForDate[goal.goalSetupId]) {
				// Goal already exists, don't add it
				wasAdded = false;
				return state; // Return state unchanged
			}

			wasAdded = true;

			// Create updated goals for this specific date
			const updatedGoalsForDate = {
				...goalsForDate,
				[goal.goalSetupId]: goal
			};

			// Create updated goals dictionary with new date entry
			const updatedGoals = {
				...state.goals,
				[formattedDate]: updatedGoalsForDate
			};

			// Return updated state
			return {
				...state,
				goals: updatedGoals
			};
		});

		return wasAdded;
	}

	private loadStateFromStorage(): IDailyGoalsState {
		if (typeof localStorage === 'undefined') return INITIAL_STATE;

		try {
			const savedState = localStorage.getItem(STORE_NAME);
			return savedState ? JSON.parse(savedState) : INITIAL_STATE;
		} catch (error) {
			console.error('Failed to load state from localStorage:', error);
			return INITIAL_STATE;
		}
	}

	private saveStateToStorage(state: IDailyGoalsState): void {
		if (typeof localStorage === 'undefined') return;

		try {
			localStorage.setItem(STORE_NAME, JSON.stringify(state));
		} catch (error) {
			console.error('Failed to save state to localStorage:', error);
		}
	}

	private getState(): IDailyGoalsState {
		return get(this.store);
	}
}

export const dailyGoalsStore: IDailyGoalsStore = new DailyGoalsStoreImpl();
