// src/lib/stores/dailyGoalsStore.ts
import { writable, derived, type Writable, type Readable } from 'svelte/store';

// Define the store state interface
interface IDailyGoalsState {
	goals: IDailyGoal[];
}

// Initial state
const initialState: IDailyGoalsState = {
	goals: []
};

const storeName = 'dailyGoalsStore';

// Check local storage for existing data
const storedUser: IDailyGoalsState =
	typeof localStorage !== 'undefined'
		? JSON.parse(localStorage.getItem(storeName) || 'null') || initialState
		: initialState;

// Define the store interface with its actions
interface DailyGoalsStore extends Readable<IDailyGoalsState> {
	changeValue: (newVal: boolean) => Promise<void>;
	reset: () => void;
}

// Create the store
function createDailyGoalsStore(): DailyGoalsStore {
	const { subscribe, set, update }: Writable<IDailyGoalsState> =
		writable<IDailyGoalsState>(storedUser);

	// Subscribe to changes and store them in localStorage
	if (typeof window !== 'undefined') {
		subscribe((state: IDailyGoalsState) => {
			localStorage.setItem(storeName, JSON.stringify(state));
		});
	}

	return {
		subscribe,

		// Actions
		changeValue: async (newVal: boolean): Promise<void> => {
			update((state) => ({ ...state, testVar2: newVal }));
		},

		addGoal: async (goalSetup: IDailyGoalSetup): Promise<void> => {
			const completeGoal: IDailyGoal = {
				name: goalSetup.name,
				icon: goalSetup.icon,
				currentAmount: 0,
				maxAmount: goalSetup.requiredAmount,
				frequency: goalSetup.frequency
			};

			update((state) => ({
				...state,
				goals: [...state.goals, completeGoal]
			}));
		},

		// For testing/debugging
		reset: (): void => set(initialState)
	};
}

// Create and export the store
export const dailyGoalsStore: DailyGoalsStore = createDailyGoalsStore();

// Export derived stores for convenience
export const isTestVar: Readable<boolean> = derived<DailyGoalsStore, boolean>(
	dailyGoalsStore,
	($store) => $store.testVar2
);
