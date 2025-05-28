import React from 'react';
import { Image, Text, View } from 'react-native';

type Data = {
	name: string;
	main: { temp: number };
	weather: { icon: string; description: string }[];
};

type Props = { data: Data };

const WeatherCard: React.FC<Props> = ({ data }) => (
	<View style={{ alignItems: 'center', marginVertical: 16 }}>
		<Text style={{ fontSize: 32 }}>{data.name}</Text>
		<Image
			source={{ uri: `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png` }}
			style={{ width: 100, height: 100 }}
		/>
		<Text style={{ fontSize: 48 }}>{Math.round(data.main.temp)}°C</Text>
		<Text>{data.weather[0].description}</Text>
	</View>
);

export default WeatherCard;
