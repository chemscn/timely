export interface ActivityData {
	activities: Activity[];
}

export interface Activity {
	startTime: Date;
	endTime: Date;
	duration: Date;
	description: string;
}
