// app/index.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import ForecastList from '../components/ForecastList';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import { useLocation } from '../hooks/useLocation';
import { useWeather } from '../hooks/useWeather';

const Home = () => {
	// Weather source state - either location or city
	const [weatherSource, setWeatherSource] = useState<'location' | { city: string }>('location');

	// Location management via custom hook
	const { coords, loading: locationLoading, error: locationError, fetchLocation } = useLocation();

	// Determine weather API parameters based on current source
	const weatherParams =
		weatherSource === 'location' ? (coords ? { coords } : {}) : { city: weatherSource.city };

	// Get weather data based on parameters
	const {
		current,
		forecast,
		loading: weatherLoading,
		error: weatherError,
	} = useWeather(weatherParams);

	// Load location on component mount
	useEffect(() => {
		fetchLocation();
	}, [fetchLocation]);

	// Handle city search
	const handleCitySearch = (city: string) => {
		if (city.trim()) {
			console.log(`Setting city to: ${city}`);
			setWeatherSource({ city: city.trim() });
		}
	};

	// Return to using location weather
	const handleReturnToLocation = () => {
		setWeatherSource('location');
		fetchLocation();
	};

	// Determine if we're currently using location-based weather
	const isUsingLocation = weatherSource === 'location';

	// Combined loading state
	const isLoading = weatherLoading || (isUsingLocation && locationLoading);

	// Get appropriate error message
	const errorMessage = weatherError?.message || (isUsingLocation ? locationError : null);

	// Get the title to display based on current state
	const getWeatherTitle = () => {
		if (isUsingLocation) {
			if (locationLoading) return 'Getting your location...';
			if (locationError) return locationError;
			if (coords) return 'Weather for your current location';
			return 'Location unavailable';
		}
		return `Weather for ${(weatherSource as { city: string }).city}`;
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<SearchBar
				onSearch={handleCitySearch}
				initialValue={isUsingLocation ? '' : (weatherSource as { city: string }).city}
				onClear={handleReturnToLocation}
				showClearButton={!isUsingLocation}
			/>

			<View style={styles.locationContainer}>
				<Text style={styles.locationTitle}>{getWeatherTitle()}</Text>

				{isUsingLocation && (
					<TouchableOpacity
						style={styles.refreshButton}
						onPress={fetchLocation}
						disabled={locationLoading}
					>
						<Ionicons
							name="refresh"
							size={20}
							color={locationLoading ? '#999' : '#007AFF'}
							style={locationLoading ? styles.rotating : undefined}
						/>
					</TouchableOpacity>
				)}
			</View>

			{isLoading && <ActivityIndicator size="large" style={styles.loader} />}
			{errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
			{!isLoading && current && <WeatherCard data={current} />}
			{!isLoading && forecast && forecast.length > 0 && <ForecastList data={forecast} />}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	locationContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 16,
	},
	locationTitle: {
		textAlign: 'center',
		fontSize: 16,
		fontWeight: '500',
		marginRight: 8,
	},
	refreshButton: {
		padding: 5,
	},
	rotating: {
		opacity: 0.7,
	},
	loader: {
		marginVertical: 20,
	},
	errorText: {
		color: 'red',
		textAlign: 'center',
		marginVertical: 20,
	},
});

export default Home;
