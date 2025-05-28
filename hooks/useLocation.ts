import * as Location from 'expo-location';
import { useCallback, useState } from 'react';

export type LocationState = {
	coords: { latitude: number; longitude: number } | null;
	loading: boolean;
	error: string | null;
};

export function useLocation() {
	const [state, setState] = useState<LocationState>({
		coords: null,
		loading: true,
		error: null,
	});

	const fetchLocation = useCallback(async () => {
		console.log('📍 Refreshing location data...');

		setState((prev) => ({ ...prev, loading: true }));

		try {
			let { status } = await Location.requestForegroundPermissionsAsync();

			if (status !== 'granted') {
				console.log('❌ Location permission denied');
				setState({
					coords: null,
					loading: false,
					error: 'Permission to access location was denied',
				});
				return;
			}

			console.log('✅ Permission granted, getting current position...');
			const location = await Location.getCurrentPositionAsync({});

			const coords = {
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
			};

			console.log(
				`📌 Location obtained: lat=${coords.latitude.toFixed(4)}, lon=${coords.longitude.toFixed(4)}`
			);

			setState({
				coords,
				loading: false,
				error: null,
			});
		} catch (error) {
			console.error('❌ Error getting location:', error);
			setState({
				coords: null,
				loading: false,
				error: 'Could not get your location',
			});
		}
	}, []);

	return {
		...state,
		fetchLocation,
	};
}
