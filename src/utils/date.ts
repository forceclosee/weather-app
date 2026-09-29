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
