export interface ActivityData {
	activities: Activity[];
}

export interface Activity {
	startTime: Date;
	endTime?: Date;
	duration: number;
	description: string;
}
