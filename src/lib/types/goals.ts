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
	name: string;
	icon: string;
	requiredAmount: number;
	frequency: IDaysActive;
}

interface IDailyGoal {
	name: string;
	icon: string;
	currentAmount: number;
	maxAmount: number;
	frequency: IDaysActive;
}
