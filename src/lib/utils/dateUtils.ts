// src/lib/utils/dateUtils.ts

/**
 * Formats a date as YYYY-MM-DD in the user's local timezone
 */
export function formatDateToYYYYMMDD(date: Date): string {
	const year = date.getFullYear();
	// Add leading zeros to month and day
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
}

/**
 * Gets today's date as YYYY-MM-DD in the user's local timezone
 */
export function getTodayDateString(): string {
	return formatDateToYYYYMMDD(new Date());
}

/**
 * Parses a YYYY-MM-DD string into a Date object
 */
export function parseYYYYMMDDDate(dateString: string): Date {
	const [year, month, day] = dateString.split('-').map(Number);
	// Note: months are 0-indexed in JS Date
	return new Date(year, month - 1, day);
}

/**
 * Compares two dates (returns true if date1 is before or equal to date2)
 */
export function isDateBeforeOrEqual(date1: string, date2: string): boolean {
	return date1 <= date2;
}

/**
 * Checks if date is today or in the past
 */
export function isDateTodayOrPast(dateString: string): boolean {
	return isDateBeforeOrEqual(dateString, getTodayDateString());
}

/**
 * Adds days to a date string and returns a new date string
 */
export function addDaysToDate(dateString: string, days: number): string {
	const date = parseYYYYMMDDDate(dateString);
	date.setDate(date.getDate() + days);
	return formatDateToYYYYMMDD(date);
}

/**
 * Gets an array of date strings for the last n days (including today)
 */
export function getLastNDays(n: number): string[] {
	const dates: string[] = [];
	const today = new Date();

	for (let i = 0; i < n; i++) {
		const date = new Date(today);
		date.setDate(today.getDate() - i);
		dates.push(formatDateToYYYYMMDD(date));
	}

	return dates;
}
