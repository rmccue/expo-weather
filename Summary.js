import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { convertTemp } from './util';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	location: {
		fontSize: 30,
		textAlign: 'center',
		paddingLeft: 5,
		paddingRight: 5,
	},
	description: {
		fontSize: 20,
		fontWeight: "300",
	},
	temperature: {
		fontSize: 90,
		fontWeight: "200",
	},
} );

export default function Summary( props ) {
	return <View style={ styles.container }>
		{ props.place ?
			<Text style={ styles.location }>
				{ props.place.city }, { props.place.country }
			</Text>
		:
			<Text style={ styles.location }>
				Loading…
			</Text>
		}
		<Text style={ styles.description }>
			{ props.forecast ? props.forecast.currently.summary : 'Loading…' }
		</Text>
		<Text style={ styles.temperature }>
			{ props.forecast ? convertTemp( props.forecast.currently.temperature, props.units ) + 'º' : '…' }
		</Text>
	</View>;
};
