import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type Props = {
	onSearch: (city: string) => void;
	initialValue?: string;
	onClear?: () => void;
	showClearButton?: boolean;
};

const SearchBar: React.FC<Props> = ({
	onSearch,
	initialValue = '',
	onClear,
	showClearButton = false,
}) => {
	const [text, setText] = useState(initialValue);

	// Update local state when initialValue changes
	useEffect(() => {
		setText(initialValue);
	}, [initialValue]);

	const handlePress = () => {
		if (text.trim()) {
			console.log(`SearchBar: Searching for ${text.trim()}`);
			onSearch(text.trim());
		}
	};

	const handleClear = () => {
		setText('');
		if (onClear) {
			onClear();
		}
	};

	return (
		<View style={styles.container}>
			<TextInput
				style={styles.input}
				placeholder="Search for a city..."
				value={text}
				onChangeText={setText}
				onSubmitEditing={handlePress}
				returnKeyType="search"
			/>
			<Button title="Search" onPress={handlePress} />

			{showClearButton && text.length > 0 && (
				<TouchableOpacity style={styles.clearButton} onPress={handleClear}>
					<Text style={styles.clearButtonText}>Use My Location</Text>
				</TouchableOpacity>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		marginBottom: 16,
	},
	inputRow: {
		flexDirection: 'row',
	},
	input: {
		flex: 1,
		borderWidth: 1,
		padding: 8,
		borderRadius: 4,
		marginBottom: 8,
	},
	clearButton: {
		marginTop: 8,
		alignItems: 'center',
	},
	clearButtonText: {
		color: '#007AFF',
		fontSize: 14,
	},
});

export default SearchBar;
