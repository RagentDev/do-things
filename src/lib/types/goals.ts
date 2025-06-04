interface IDaysActive {
	monday: boolean;
	tuesday: boolean;
	wednesday: boolean;
	thursday: boolean;
	friday: boolean;
	saturday: boolean;
	sunday: boolean;
}

interface IDailyGoalSetup {
	id: string;
	name: string;
	icon: string;
	requiredAmount: number;
	frequency: IDaysActive;
	startDate: Date;
}

interface IDailyGoal {
	goalSetupId: string;
	name: string;
	icon: string;
	currentAmount: number;
	maxAmount: number;
	frequency: IDaysActive;
}
