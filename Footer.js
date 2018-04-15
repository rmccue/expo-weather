import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 20,
		marginRight: 20,
		opacity: 0.6,
		marginBottom: 10,
	},
});

export default function Footer( props ) {
	return <View style={ styles.container }>
		<Text onPress={ () => Linking.openURL( 'https://darksky.net/poweredby/' ) }>
			Powered by Dark Sky
		</Text>
	</View>;
}
