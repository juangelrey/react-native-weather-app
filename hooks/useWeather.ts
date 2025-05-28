// @copilot-disable
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

type WeatherParams = {
	city?: string;
	coords?: {
		latitude: number;
		longitude: number;
	};
};

const fetchCurrent = async (params: WeatherParams) => {
	let url: string;

	// Prioritize coordinates over city name if both are provided
	if (params.city) {
		console.log('Using coordinates for current weather');
		url = `${BASE_URL}/weather?q=${encodeURIComponent(params.city)}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
	} else if (params.coords && params.coords.latitude && params.coords.longitude) {
		console.log('Using city name for current weather');

		url = `${BASE_URL}/weather?lat=${params.coords.latitude}&lon=${params.coords.longitude}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
	} else {
		throw new Error('Either city or valid coordinates must be provided');
	}

	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Error fetching current weather: ${res.statusText}`);
		}
		const data = await res.json();

		return data;
	} catch (error) {
		console.error('Current weather fetch error:', error);
		throw error;
	}
};

const fetchForecast = async (params: WeatherParams) => {
	let url: string;

	// Prioritize coordinates over city name if both are provided
	if (params.city) {
		console.log('Using city name for forecast');
		url = `${BASE_URL}/forecast?q=${encodeURIComponent(params.city)}&units=metric&cnt=5&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
	} else if (params.coords && params.coords.latitude && params.coords.longitude) {
		console.log('Using coordinates for forecast');
		url = `${BASE_URL}/forecast?lat=${params.coords.latitude}&lon=${params.coords.longitude}&units=metric&cnt=5&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
	} else {
		throw new Error('Either city or valid coordinates must be provided');
	}

	console.log('Fetching forecast:', url);

	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Error fetching weather forecast: ${res.statusText}`);
		}
		const data = await res.json();

		return data;
	} catch (error) {
		console.error('Forecast fetch error:', error);
		throw error;
	}
};

export const useWeather = (params: WeatherParams) => {
	// Create a more specific query key that handles undefined values
	const queryKey =
		params.coords?.latitude && params.coords?.longitude
			? ['weather', 'coords', params.coords.latitude, params.coords.longitude]
			: params.city
				? ['weather', 'city', params.city]
				: ['weather', 'none'];
	// query for current weather
	const {
		data: current,
		isLoading: isCurrentLoading,
		isError: isCurrentError,
		error: currentError,
	} = useQuery({
		queryKey: ['currentWeather', queryKey],
		queryFn: () => fetchCurrent(params),
		enabled: !!(params.city || params.coords),
		staleTime: 1000 * 60 * 5,
	});

	// query for forecast weather
	const {
		data: forecast,
		isLoading: isForecastLoading,
		isError: isForecastError,
		error: forecastError,
	} = useQuery({
		queryKey: ['forecastWeather', queryKey],
		queryFn: () => fetchForecast(params),
		enabled: !!(params.city || params.coords),
		staleTime: 1000 * 60 * 5,
	});
	return {
		current,
		forecast: forecast?.list,
		loading: isCurrentLoading || isForecastLoading,
		error: isCurrentError ? currentError : isForecastError ? forecastError : null,
	};
};
