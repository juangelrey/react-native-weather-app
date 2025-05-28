import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Create a client
const queryClient = new QueryClient();

export default function RootLayout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<Stack />
			</QueryClientProvider>
		</GestureHandlerRootView>
	);
}
