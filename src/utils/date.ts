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

	const relativeDay = capitalizeFirstLetter(dt.toRelativeCalendar());

	return { fullDate, weekdayLongOnly, weekdayShortOnly, relativeDay };
};

export const getFormattedTime = ({ timestamp, timezone }: Params): string => {
	const dt = DateTime.fromISO(timestamp, { zone: timezone });

	const timeSimple = dt.toLocaleString({
		hour: "numeric",
		hour12: true,
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

function capitalizeFirstLetter(value: string | null) {
	return String(value).charAt(0).toUpperCase() + String(value).slice(1);
}
