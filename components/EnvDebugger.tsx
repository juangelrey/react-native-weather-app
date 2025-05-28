import Constants from 'expo-constants';
import React from 'react';
import { Text, View } from 'react-native';

const EnvDebugger = () => {
	return (
		<View style={{ padding: 10, backgroundColor: '#f0f0f0', marginBottom: 10 }}>
			<Text style={{ fontWeight: 'bold' }}>Environment Variables:</Text>
			<Text>
				EXPO_PUBLIC_WEATHER_API_KEY: {process.env.EXPO_PUBLIC_WEATHER_API_KEY || 'Not set'}
			</Text>
			<Text>All env vars: {JSON.stringify(process.env, null, 2)}</Text>
			<Text>Constants: {JSON.stringify(Constants.expoConfig?.extra, null, 2)}</Text>
		</View>
	);
};

export default EnvDebugger;
