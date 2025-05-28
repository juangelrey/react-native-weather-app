import React from 'react';
import { FlatList, Image, Text, View } from 'react-native';

type Item = { dt_txt: string; main: { temp: number }; weather: { icon: string }[] };

type Props = { data: Item[] };

const ForecastList: React.FC<Props> = ({ data }) => (
	<FlatList
		data={data}
		horizontal
		keyExtractor={(item) => item.dt_txt}
		renderItem={({ item }) => (
			<View style={{ alignItems: 'center', marginRight: 12 }}>
				<Text>{item.dt_txt.split(' ')[0]}</Text>
				<Image
					source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }}
					style={{ width: 50, height: 50 }}
				/>
				<Text>{Math.round(item.main.temp)}°C</Text>
			</View>
		)}
	/>
);

export default ForecastList;
