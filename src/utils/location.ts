import type { Coordinates } from "#/types";

export const normalizeCoordinates = (coordinate: Coordinates) => {
	const roundedCoordinate = {
		latitude: Number(coordinate.latitude.toFixed(6)),
		longitude: Number(coordinate.longitude.toFixed(6)),
	};

	return roundedCoordinate;
};

export const coordinateKey = (coordinate: Coordinates) => {
	const { latitude, longitude } = normalizeCoordinates(coordinate);
	return `${latitude},${longitude}`;
};
