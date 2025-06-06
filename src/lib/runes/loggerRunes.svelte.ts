// Define the state interfaces
import { isDev } from '$lib/config';

export type LogLevel = 'log' | 'info' | 'success' | 'warn' | 'error' | 'debug';

export interface ILogEntry {
	id: string;
	level: LogLevel;
	messages: unknown[];
	timestamp: Date;
}

interface ILoggerState {
	logs: ILogEntry[];
	isPlaying: boolean;
	maxLogs: number;
}

const INITIAL_STATE: ILoggerState = {
	logs: [],
	isPlaying: true,
	maxLogs: 1000
};

// Create the global state rune
const loggerState = $state<ILoggerState>({ ...INITIAL_STATE });

// Public API interface
interface ILoggerManager {
	// Reactive getters
	readonly state: ILoggerState;
	readonly logs: ILogEntry[];
	readonly isPlaying: boolean;
	readonly logCount: number;
	readonly hasLogs: boolean;
	readonly status: 'playing' | 'paused';

	// Actions
	initialize(): void;
	log(...messages: unknown[]): void;
	info(...messages: unknown[]): void;
	success(...messages: unknown[]): void;
	warn(...messages: unknown[]): void;
	error(...messages: unknown[]): void;
	debug(...messages: unknown[]): void;
	clear(): void;
	pause(): void;
	play(): void;
	toggle(): void;
	setMaxLogs(max: number): void;
	exportLogs(): string;
	reset(): void;
}

const loggerImpl = {
	// Reactive getters
	get state() {
		return loggerState;
	},
	get logs() {
		return loggerState.logs;
	},
	get isPlaying() {
		return loggerState.isPlaying;
	},
	get logCount() {
		return loggerState.logs.length;
	},
	get hasLogs() {
		return loggerState.logs.length > 0;
	},
	get status(): 'playing' | 'paused' {
		return loggerState.isPlaying ? 'playing' : 'paused';
	},

	initialize() {},

	// Actions
	log(...messages: unknown[]) {
		addLogToState('log', messages);
	},

	info(...messages: unknown[]) {
		addLogToState('info', messages);
	},

	success(...messages: unknown[]) {
		addLogToState('success', messages);
	},

	warn(...messages: unknown[]) {
		addLogToState('warn', messages);
	},

	error(...messages: unknown[]) {
		addLogToState('error', messages);
	},

	debug(...messages: unknown[]) {
		addLogToState('debug', messages);
	},

	clear() {
		loggerState.logs.length = 0;
	},

	pause() {
		loggerState.isPlaying = false;
	},

	play() {
		loggerState.isPlaying = true;
	},

	toggle() {
		loggerState.isPlaying = !loggerState.isPlaying;
	},

	setMaxLogs(max: number) {
		loggerState.maxLogs = Math.max(1, max);
		// Trim existing logs if necessary
		if (loggerState.logs.length > loggerState.maxLogs) {
			loggerState.logs.splice(0, loggerState.logs.length - loggerState.maxLogs);
		}
	},

	exportLogs(): string {
		return JSON.stringify(
			{
				exportedAt: new Date().toISOString(),
				logs: loggerState.logs
			},
			null,
			2
		);
	},

	reset() {
		loggerState.logs.length = 0;
		loggerState.isPlaying = true;
		loggerState.maxLogs = 1000;
	}
} satisfies ILoggerManager;

// For global access (similar to your pattern)
export const logger: ILoggerManager | null = isDev ? loggerImpl : null;

// Helper functions
function addLogToState(level: LogLevel, messages: unknown[]): void {
	if (!loggerState.isPlaying) return;

	const timestamp = new Date();
	const log: ILogEntry = {
		id: generateLogId(),
		level,
		messages,
		timestamp
	};

	loggerState.logs.push(log);

	// Keep only the last maxLogs entries
	if (loggerState.logs.length > loggerState.maxLogs) {
		loggerState.logs.splice(0, loggerState.logs.length - loggerState.maxLogs);
	}
}

function generateLogId(): string {
	return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
