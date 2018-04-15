import { Ionicons } from '@expo/vector-icons';
import { Location, Permissions } from 'expo';
import React from 'react';
import {
	AppState,
	AsyncStorage,
	Button,
	StyleSheet,
	Text,
	View
} from 'react-native';
import Swiper from 'react-native-swiper';

const styles = StyleSheet.create({
	wrapper: {
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#7dc9da',
	},
	header: {
		color: '#fff',
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 20,
		textAlign: 'center',
	},
	status: {
		color: '#fff',
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	text: {
		color: '#fff',
		fontWeight: 'bold',
		textAlign: 'center',
		marginLeft: 50,
		marginRight: 50,
		lineHeight: 20,
		marginBottom: 20,
	},
} );

export default class Welcome extends React.Component {
	constructor( props ) {
		super( props );

		this.state = {
			appState: AppState.currentState,
			hasLocation: false,
			locationStatus: 'unknown',
		};
	}

	componentDidMount() {
		this.loadPermissions();
		AppState.addEventListener( 'change', this.onAppStateChange );
	}

	onAppStateChange = nextAppState => {
		if ( this.state.appState.match( /inactive|background/ ) && nextAppState === 'active' ) {
			this.loadPermissions();
		}
		this.setState( { appState: nextAppState } );
	}

	loadPermissions = async () => {
		const { status } = await Permissions.getAsync( Permissions.LOCATION );
		this.setState( { locationStatus: status } );
	}

	onPromptLocation = async () => {
		const { status } = await Permissions.askAsync( Permissions.LOCATION );
		if ( status !== 'granted' ) {
			this.setState( {
				errorMessage: 'Permission to access location was denied',
			} );
			return;
		}

		this.setState( { locationStatus: status } );
	}

	onStart = async () => {
		await AsyncStorage.setItem( 'didSetup', 'true' );

		this.props.navigation.navigate( 'App' );
	}

	render() {
		const NextButton = () => {
			return <Button
				title="Next →"
				color="#fff"
				onPress={ () => this.swiper ? this.swiper.scrollBy( 1 ) : null }
			/>;
		};

		return <Swiper
			ref={ ref => this.swiper = ref }
			loop={ false }
			scrollEnabled={ false }
			showsButtons={ false }
			style={ styles.wrapper }
		>
			<View style={ styles.slide }>
				<Text style={ styles.header }>
					Hi there! 👋
				</Text>
				<Text style={ styles.text }>
					This is a demo app created for the Human Made Monthly Code Challenge, for March 2018.
				</Text>
				<NextButton />
			</View>
			<View style={ styles.slide }>
				<Text style={ styles.header }>Permissions</Text>
				<Text style={ styles.text }>
					To show you the weather, I'm going to need to ask you for your location.
				</Text>
				{ this.state.locationStatus === 'granted' ?
					<React.Fragment>
						<Text style={ styles.status }>
							<Ionicons
								name="ios-checkmark-circle"
								size={ 30 }
							/>
							{ ' ' }
							Location Enabled
						</Text>
						<NextButton />
					</React.Fragment>
				: this.state.locationStatus === 'denied' ?
					<React.Fragment>
						<Text style={ styles.status }>
							<Ionicons
								name="ios-settings"
								size={ 30 }
							/>
							{ ' ' }
							Location Disabled
						</Text>
						<Text style={ styles.text }>
							You'll need to allow Location Services manually in Settings.
						</Text>
					</React.Fragment>
				:
					<Button
						title="Allow Location Services"
						color="#fff"
						onPress={ this.onPromptLocation }
					/>
				}
			</View>
			<View style={ styles.slide }>
				{ this.state.locationStatus === 'granted' ?
					<React.Fragment>
						<Text style={ styles.header }>
							Let's Get Started
						</Text>
						<Text style={ styles.text }>
							Ready? Let's begin.
						</Text>
						<Button
							title="Get Started"
							color="#fff"
							onPress={ this.onStart }
						/>
					</React.Fragment>
				:
					<React.Fragment>
						<Text style={ styles.header }>
							Not Ready!
						</Text>
						<Text style={ styles.text }>
							Looks like you missed a setup step! Go back and fix it please. ☺️
						</Text>
						<Button
							title="← Back"
							color="#fff"
							onPress={ () => this.swiper ? this.swiper.scrollBy( -1 ) : null }
						/>
					</React.Fragment>
				}
			</View>
		</Swiper>;
	}
}
