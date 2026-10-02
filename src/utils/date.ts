import { DateTime } from "luxon";

type Params = {
	timestamp: string;
	timezone: string;
};

export const getFormattedDate = ({ timestamp, timezone }: Params) => {
	const dt = DateTime.fromISO(timestamp, { zone: timezone });

	const fullDate = dt.toLocaleString(DateTime.DATE_HUGE);

	const weekdayLongOnly = dt.toLocaleString({
		weekday: "long",
	});

	const weekdayShortOnly = dt.toLocaleString({
		weekday: "short",
	});

	return { fullDate, weekdayLongOnly, weekdayShortOnly };
};

export const getFormattedTime = ({ timestamp, timezone }: Params): string => {
	const dt = DateTime.fromISO(timestamp, { zone: timezone });

	const timeSimple = dt.toLocaleString({
		hour: "2-digit",
		minute: "2-digit",
		hour12: true,
		timeZoneName: "short",
	});

	return timeSimple;
};

export const getFormattedCurrentTime = (timezone: string) => {
	const dt = DateTime.now().setZone(timezone);

	const currentTime = dt.toLocaleString({
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
		timeZoneName: "short",
	});

	return currentTime;
};
