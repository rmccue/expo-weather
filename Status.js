import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import TimeAgo from 'react-timeago';

const styles = StyleSheet.create( {
	container: {
		height: 40,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginLeft: 20,
		marginRight: 20,
		opacity: 0.6,
	},
} );

const timeFormatter = ( value, unit, suffix, date, defaultFormatter ) => {
	if ( value === 0 ) {
		return 'just now';
	}

	return defaultFormatter( value, unit, suffix, date );
}

export default function Status( props ) {
	const { forecast } = props;
	if ( ! forecast ) {
		return <View style={ styles.container }>
			<Text>Loading…</Text>
		</View>;
	}

	return <View style={ styles.container }>
		<Text>Updated <TimeAgo component={ Text } date={ forecast.time } formatter={ timeFormatter } minPeriod={ 60 } /></Text>
		<Ionicons.Button
			color={ "#007AFF" }
			backgroundColor={ "white" }
			name="ios-refresh"
			onPress={ props.onRefresh }
		>
			Refresh
		</Ionicons.Button>
	</View>;
}
