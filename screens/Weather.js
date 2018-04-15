import { Ionicons } from '@expo/vector-icons';
import { Constants, Location, Permissions } from 'expo';
import React from 'react';
import {
	AsyncStorage,
	Button,
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';
import { DARKSKY_KEY } from 'react-native-dotenv';
import { StackNavigator } from 'react-navigation';

import Footer from '../Footer';
import Summary from '../Summary';
import Status from '../Status';
import Today from '../Today';
import Week from '../Week';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		justifyContent: 'flex-start',
	},
});

export default class Weather extends React.Component {
	static navigationOptions = ( { navigation } ) => {
		return {
			headerTransparent: true,
			headerStyle: {
				borderBottomWidth: 0,
			},
			headerRight: <Ionicons.Button
				color={ "#007AFF" }
				backgroundColor={ "transparent" }
				name="ios-settings"
				onPress={ () => navigation.navigate( 'Settings' ) }
			/>,
		}
	};

	state = {
		location: null,
		place: null,
		units: 'c',

		errorMessage: null,
		forecast: null,
	}

	componentDidMount() {
		this.onReloadSettings();

		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
			});
			return;
		} else {
			// this.onRefreshLocation();
		}

		this.props.navigation.addListener( 'willFocus', this.onReloadSettings );
		this.positionListener = Location.watchPositionAsync(
			{
				enableHighAccuracy: false,
				distanceInterval: 100,
			},
			( coords, timestamp ) => this.onRefreshLocation()
		);
	}

	componentWillUnmount() {
		this.positionListener.remove();
	}

	onReloadSettings = () => {
		AsyncStorage.getItem( 'units' ).then( value => {
			this.setState( { units: value || 'c' } );
		} );
	}

	onRefreshLocation = async () => {
		const { status } = await Permissions.getAsync( Permissions.LOCATION );
		if ( status !== 'granted' ) {
			return;
		}

		const previous = this.state.location;
		const { coords } = await Location.getCurrentPositionAsync( {
			enableHighAccuracy: false,
		} );
		if ( previous && coords.latitude === previous.latitude && coords.longitude === previous.longitude ) {
			// Same location, skip update.
			return;
		}
		this.setState( { location: coords } );

		// Also get the location name.
		const place = await Location.reverseGeocodeAsync( coords );
		this.setState( { place } );

		this.onLoadForecast();
	}

	onLoadForecast = async () => {
		this.setState( { forecast: null } );

		const { location } = this.state;

		const coords = [ location.latitude, location.longitude ].join( ',' );
		const url = `https://api.darksky.net/forecast/${ DARKSKY_KEY }/${ coords }?units=si`;

		const resp = await fetch( url );
		const data = await resp.json();

		const forecast = {
			time: Date.now(),
			data,
		};
		this.setState( { forecast } );
	}

	render() {
		const location = this.state.location ? [ this.state.location.latitude, this.state.location.longitude ].join( ',' ) : 'None';
		return <View style={styles.container}>
			<Summary
				forecast={ this.state.forecast && this.state.forecast.data }
				place={ this.state.place && this.state.place[0] }
				units={ this.state.units }
			/>

			<Status
				forecast={ this.state.forecast }
				onRefresh={ this.onLoadForecast }
			/>

			<Today
				forecast={ this.state.forecast && this.state.forecast.data }
				units={ this.state.units }
			/>

			<Week
				forecast={ this.state.forecast && this.state.forecast.data }
				units={ this.state.units }
			/>

			<Footer
				onOpenSettings={ () => this.props.navigation.navigate( 'Settings' ) }
			/>
		</View>;
	}
}
