import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { convertTemp } from './util';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'stretch',
		justifyContent: 'flex-end',
		// backgroundColor: 'blue',
	},
	day: {
		// height: 20,
		// backgroundColor: 'red',
		flex: 1,
		flexDirection: 'row',
		alignItems: 'baseline',
		justifyContent: 'space-between',
		marginLeft: 20,
		marginRight: 20,
	},
	dayName: {
		flexGrow: 1,
		fontSize: 20,
		fontWeight: '300',
	},
	report: {
		textAlign: 'justify',
		width: 30,
		fontSize: 20,
		fontWeight: '300',
		marginRight: 20,
	},
	high: {
		textAlign: 'justify',
		width: 30,
		fontSize: 20,
		fontWeight: '300',
		marginRight: 20,
	},
	low: {
		textAlign: 'justify',
		width: 30,
		fontSize: 20,
		fontWeight: '300',
		opacity: 0.7,
	}
} );

const dayName = time => {
	const dateObj = new Date( time * 1000 );
	return dateObj.toLocaleDateString( 'en', { weekday: 'long' } );
};

const emojiReport = icon => {
	switch ( icon ) {
		case 'clear-day':
		case 'clear-night':
			return '☀️';
		case 'rain':
		case 'sleet':
			return '🌧';

		case 'snow':
			return '🌨';

		case 'wind':
			return '💨';

		case 'fog':
			return '🌫';

		case 'cloudy':
			return '⛅️';

		case 'partly-cloudy-day':
		case 'partly-cloudy-night':
			return '🌤';

		default:
			return '';
	}
};

const Day = props => {
	return <View style={ styles.day }>
		<Text style={ styles.dayName }>{ dayName( props.time ) }</Text>
		<Text style={ styles.report }>{ emojiReport( props.icon ) }</Text>
		<Text style={ styles.high }>{ convertTemp( props.high, props.units ) }</Text>
		<Text style={ styles.low }>{ convertTemp( props.low, props.units ) }</Text>
	</View>;
};

export default function Week( props ) {
	if ( ! props.forecast ) {
		return null;
	}

	// Remove today.
	const days = props.forecast.daily.data.slice( 1 );

	return <View style={ styles.container }>
		{ days.map( day =>
			<Day
				key={ day.time }
				high={ day.temperatureHigh }
				icon={ day.icon }
				low={ day.temperatureLow }
				time={ day.time }
				units={ props.units }
			/>
		) }
	</View>;
};
