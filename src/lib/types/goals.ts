export interface IDaysActive {
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
}

export interface IDailyGoalSetup {
	id: string;
	name: string;
	icon: string;
	requiredAmount: number;
	frequency: IDaysActive;
	startDate: Date;
}

export interface IDailyGoal {
	goalSetupId: string;
	name: string;
	icon: string;
	currentAmount: number;
	maxAmount: number;
	frequency: IDaysActive;
}
