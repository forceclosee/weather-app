type WeatherInterpretations = Record<
	number,
	Record<string, { description: string; image: string }>
>;

export const weatherInterpretations: WeatherInterpretations = {
	0: {
		day: {
			description: "Sunny",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/01d_ltzorb.png",
		},
		night: {
			description: "Clear",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/01n_nuh0sg.png",
		},
	},
	1: {
		day: {
			description: "Mainly Sunny",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/01d_ltzorb.png",
		},
		night: {
			description: "Mainly Clear",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/01n_nuh0sg.png",
		},
	},
	2: {
		day: {
			description: "Partly Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/02d_hmfp36.png",
		},
		night: {
			description: "Partly Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/02n_wzyvlb.png",
		},
	},
	3: {
		day: {
			description: "Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/03d_wh0xnz.png",
		},
		night: {
			description: "Cloudy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/03n_du53jp.png",
		},
	},
	45: {
		day: {
			description: "Foggy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/50d_tl4ren.png",
		},
		night: {
			description: "Foggy",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/50n_uzbiom.png",
		},
	},
	48: {
		day: {
			description: "Rime Fog",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/50d_tl4ren.png",
		},
		night: {
			description: "Rime Fog",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/50n_uzbiom.png",
		},
	},
	51: {
		day: {
			description: "Light Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Light Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	53: {
		day: {
			description: "Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	55: {
		day: {
			description: "Heavy Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Heavy Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	56: {
		day: {
			description: "Light Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Light Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	57: {
		day: {
			description: "Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Freezing Drizzle",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	61: {
		day: {
			description: "Light Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/10d_eaje5d.png",
		},
		night: {
			description: "Light Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/10n_yoc6ck.png",
		},
	},
	63: {
		day: {
			description: "Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/10d_eaje5d.png",
		},
		night: {
			description: "Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/10n_yoc6ck.png",
		},
	},
	65: {
		day: {
			description: "Heavy Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/10d_eaje5d.png",
		},
		night: {
			description: "Heavy Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/10n_yoc6ck.png",
		},
	},
	66: {
		day: {
			description: "Light Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/10d_eaje5d.png",
		},
		night: {
			description: "Light Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/10n_yoc6ck.png",
		},
	},
	67: {
		day: {
			description: "Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/10d_eaje5d.png",
		},
		night: {
			description: "Freezing Rain",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/10n_yoc6ck.png",
		},
	},
	71: {
		day: {
			description: "Light Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/13d_mwfcr8.png",
		},
		night: {
			description: "Light Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/13n_blkuta.png",
		},
	},
	73: {
		day: {
			description: "Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/13d_mwfcr8.png",
		},
		night: {
			description: "Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/13n_blkuta.png",
		},
	},
	75: {
		day: {
			description: "Heavy Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/13d_mwfcr8.png",
		},
		night: {
			description: "Heavy Snow",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/13n_blkuta.png",
		},
	},
	77: {
		day: {
			description: "Snow Grains",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/13d_mwfcr8.png",
		},
		night: {
			description: "Snow Grains",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/13n_blkuta.png",
		},
	},
	80: {
		day: {
			description: "Light Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Light Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	81: {
		day: {
			description: "Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	82: {
		day: {
			description: "Heavy Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/09d_cwcc7j.png",
		},
		night: {
			description: "Heavy Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/09n_pr3or4.png",
		},
	},
	85: {
		day: {
			description: "Light Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/13d_mwfcr8.png",
		},
		night: {
			description: "Light Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/13n_blkuta.png",
		},
	},
	86: {
		day: {
			description: "Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/13d_mwfcr8.png",
		},
		night: {
			description: "Snow Showers",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562627/13n_blkuta.png",
		},
	},
	95: {
		day: {
			description: "Thunderstorm",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/11d_c4d1mc.png",
		},
		night: {
			description: "Thunderstorm",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/11n_nonqea.png",
		},
	},
	96: {
		day: {
			description: "Light Thunderstorms With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/11d_c4d1mc.png",
		},
		night: {
			description: "Light Thunderstorms With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/11n_nonqea.png",
		},
	},
	99: {
		day: {
			description: "Thunderstorm With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1789782878/11d_c4d1mc.png",
		},
		night: {
			description: "Thunderstorm With Hail",
			image:
				"https://res.cloudinary.com/dspqgpnvq/image/upload/v1790562628/11n_nonqea.png",
		},
	},
};
