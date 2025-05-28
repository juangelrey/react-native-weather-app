// @copilot-disable
import { useQuery } from '@tanstack/react-query';

const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const fetchCurrent = async (city: string) => {
	const url = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=metric&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
	console.log('Fetching current weather:', url);

	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Error fetching current weather: ${res.statusText}`);
		}
		const data = await res.json();
		console.log('Current weather data:', data);
		return data;
	} catch (error) {
		console.error('Current weather fetch error:', error);
		throw error;
	}
};

const fetchForecast = async (city: string) => {
	const url = `${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=metric&cnt=5&appid=${process.env.EXPO_PUBLIC_WEATHER_API_KEY}`;
	console.log('Fetching forecast:', url);

	try {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Error fetching weather forecast: ${res.statusText}`);
		}
		const data = await res.json();
		console.log('Forecast data:', data);
		console.log('Forecast list:', data.list);
		return data;
	} catch (error) {
		console.error('Forecast fetch error:', error);
		throw error;
	}
};

export const useWeather = (city: string) => {
	// query for current weather
	const {
		data: current,
		isLoading: isCurrentLoading,
		isError: isCurrentError,
		error: currentError,
	} = useQuery({
		queryKey: ['currentWeather', city],
		queryFn: () => fetchCurrent(city),
		enabled: !!city,
		staleTime: 1000 * 60 * 5,
	});

	// query for forecast weather
	const {
		data: forecast,
		isLoading: isForecastLoading,
		isError: isForecastError,
		error: forecastError,
	} = useQuery({
		queryKey: ['forecastWeather', city],
		queryFn: () => fetchForecast(city),
		enabled: !!city,
		staleTime: 1000 * 60 * 5,
	});
	return {
		current,
		forecast: forecast?.list,
		loading: isCurrentLoading || isForecastLoading,
		error: isCurrentError ? currentError : isForecastError ? forecastError : null,
	};
};
