import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

type Props = { onSearch: (city: string) => void };

const SearchBar: React.FC<Props> = ({ onSearch }) => {
	const [text, setText] = useState('');

	const handlePress = () => {
		onSearch(text.trim());
		setText('');
	};
	return (
		<View
			style={{
				flexDirection: 'row',
				marginBottom: 16,
			}}
		>
			<TextInput
				style={{ flex: 1, borderWidth: 1, padding: 8, borderRadius: 4 }}
				placeholder="Enter City"
				value={text}
				onChangeText={setText}
			/>
			<Button title="Go" onPress={handlePress} />
		</View>
	);
};

export default SearchBar;

const style = StyleSheet.create({});
