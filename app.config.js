require('dotenv').config();

module.exports = {
	expo: {
		name: 'WeatherApp',
		slug: 'WeatherApp',
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/images/icon.png',
		scheme: 'weatherapp',
		userInterfaceStyle: 'automatic',
		newArchEnabled: true,
		ios: {
			supportsTablet: true,
		},
		android: {
			adaptiveIcon: {
				foregroundImage: './assets/images/adaptive-icon.png',
				backgroundColor: '#ffffff',
			},
			edgeToEdgeEnabled: true,
		},
		web: {
			bundler: 'metro',
			output: 'static',
			favicon: './assets/images/favicon.png',
		},
		plugins: [
			'expo-router',
			[
				'expo-splash-screen',
				{
					image: './assets/images/splash-icon.png',
					imageWidth: 200,
					resizeMode: 'contain',
					backgroundColor: '#ffffff',
				},
			],
			[
				'expo-location',
				{
					locationAlwaysAndWhenInUsePermission: 'Allow $(PRODUCT_NAME) to use your location.',
				},
			],
		],
		experiments: {
			typedRoutes: true,
		},
		// extra: {
		// 	EXPO_PUBLIC_WEATHER_API_KEY: process.env.EXPO_PUBLIC_WEATHER_API_KEY,
		// },
	},
};
