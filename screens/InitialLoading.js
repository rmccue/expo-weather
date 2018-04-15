import React from 'react';
import {
	ActivityIndicator,
	AsyncStorage,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';

const styles = StyleSheet.create( {
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#7dc9da',
	},
} );

export default class AuthLoadingScreen extends React.Component {
	constructor( props ) {
		super( props );
		this.bootstrap();
	}

	// Fetch the token from storage then navigate to our appropriate place
	bootstrap = async () => {
		const didSetup = await AsyncStorage.getItem( 'didSetup' );

		// This will switch to the App screen or Auth screen and this loading
		// screen will be unmounted and thrown away.
		this.props.navigation.navigate( didSetup ? 'App' : 'Welcome' );
	};

	// Render any loading content that you like here
	render() {
		return <View style={ styles.container }>
			<ActivityIndicator
				color="#fff"
				size="large"
			/>
		</View>;
	}
}