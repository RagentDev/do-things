// $lib/utils/iconRegistry.ts
import * as mdiIcons from '@mdi/js';

export function getIconByName(iconName: string): string {
	// Convert "mdi-run" to "mdiRun"
	const mdiName = iconName
		.split('-')
		.map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
		.join('');

	return (mdiIcons as never)[mdiName] || mdiIcons.mdiHelpCircle;
}

export function getAllIconNames(): string[] {
	return Object.keys(mdiIcons)
		.filter((key) => key.startsWith('mdi'))
		.map((key) => key.replace(/([A-Z])/g, '-$1').toLowerCase());
}
