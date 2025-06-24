import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

interface IThemeState {
	currentTheme: Theme;
}

const STORE_NAME = 'themeStore';
const INITIAL_STATE: IThemeState = {
	currentTheme: 'light'
};

const themeState = $state<IThemeState>(loadStateFromStorage());
let persistenceInitialized = false;

interface IThemeManager {
	readonly state: IThemeState;
	readonly currentTheme: Theme;

	initialize(): void;
	setTheme(theme: Theme): void;
	toggle(): void;
	applyTheme(): void;
}

function applyTheme() {
	if (browser) {
		console.log('Applying theme:', themeState.currentTheme);
		document.documentElement.setAttribute('data-theme', themeState.currentTheme);
	}
}

function setTheme(theme: Theme) {
	themeState.currentTheme = theme;
	applyTheme();
}

const themeImpl = {
	get state() {
		return themeState;
	},

	get currentTheme() {
		return themeState.currentTheme;
	},

	initialize() {
		if (browser && !persistenceInitialized) {
			persistenceInitialized = true;
			applyTheme();

			$effect(() => {
				saveStateToStorage(themeState);
			});

			// Listen for system theme changes
			window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
				if (!localStorage.getItem(STORE_NAME)) {
					setTheme(e.matches ? 'dark' : 'light');
				}
			});
		}
	},

	setTheme,

	toggle() {
		console.log('Toggling theme from:', themeState.currentTheme);
		setTheme(themeState.currentTheme === 'light' ? 'dark' : 'light');
		console.log('Theme is now:', themeState.currentTheme);
	},

	applyTheme
} satisfies IThemeManager;

export const theme: IThemeManager = themeImpl;

// Helper functions
function loadStateFromStorage(): IThemeState {
	if (!browser) return INITIAL_STATE;

	try {
		const savedState = localStorage.getItem(STORE_NAME);
		if (savedState) {
			return JSON.parse(savedState);
		}

		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		return {
			currentTheme: prefersDark ? 'dark' : 'light'
		};
	} catch (error) {
		console.error('Failed to load theme from localStorage:', error);
		return INITIAL_STATE;
	}
}

function saveStateToStorage(state: IThemeState): void {
	if (!browser) return;

	try {
		localStorage.setItem(STORE_NAME, JSON.stringify(state));
	} catch (error) {
		console.error('Failed to save theme to localStorage:', error);
	}
}
