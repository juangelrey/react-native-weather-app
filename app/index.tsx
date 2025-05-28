// app/index.tsx
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text } from 'react-native';
import ForecastList from '../components/ForecastList';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { useWeather } from '../hooks/useWeather';

const Home = () => {
	const [city, setCity] = useState('London');
	const { current, forecast, loading, error } = useWeather(city);

	useEffect(() => {
		console.log('Home component data:', { current, forecast, loading, error });
	}, [current, forecast, loading, error]);

	return (
		<ScrollView contentContainerStyle={{ padding: 16 }}>
			<SearchBar onSearch={setCity} />
			{loading && <ActivityIndicator size="large" />}
			{error && <Text style={{ color: 'red' }}>{error.message}</Text>}
			{current && <WeatherCard data={current} />}
			{forecast && forecast.length > 0 && <ForecastList data={forecast} />}
		</ScrollView>
	);
};

export default Home;
