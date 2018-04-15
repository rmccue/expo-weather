import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
	AsyncStorage,
	Button,
	StyleSheet,
	Switch,
	Text,
	View
} from 'react-native';
import SettingsList from 'react-native-settings-list';

import { HeaderBackButton } from 'react-navigation';

const styles = StyleSheet.create({
	container: {
	},
	form: {
		backgroundColor: '#fff',
	},
	row: {
		marginTop: 20,
		marginRight: 20,
		marginLeft: 20,
		marginBottom: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	credit: {
		marginLeft: 40,
		marginRight: 40,
	},
	creditText: {
		opacity: 0.7,
		textAlign: 'center',
		marginTop: 20,
	},
});

export default class Settings extends React.Component {
	static navigationOptions = {
		title: 'Settings',

		// Override the back button, because for some reason, the title comes
		// from headerBackTitle on the **previous** screen (smh).
		headerLeft: props => <HeaderBackButton
			{ ...props }
			title="Done"
			truncatedTitle="Done"
		/>,
	};

	constructor( props ) {
		super( props );

		this.state = {
			loaded: false,
			units: null,
			showingResetWarning: false,
		};
	}

	componentWillMount() {
		this.loadSettings();
	}

	loadSettings = async () => {
		const units = await AsyncStorage.getItem( 'units' ) || 'c';

		this.setState( { units } );
	}

	onUpdateUnits = useFahrenheit => {
		const units = useFahrenheit ? 'f' : 'c';
		AsyncStorage.setItem( 'units', units );
		this.setState( { units } );
	}

	onReset = async () => {
		if ( ! this.state.showingResetWarning ) {
			this.setState( { showingResetWarning: true } );
			return;
		}

		await AsyncStorage.clear();
		this.props.navigation.navigate( 'InitialLoading' );
	}

	render() {
		const { showingResetWarning } = this.state;

		return <View style={ styles.container }>
			<SettingsList borderColor="#c8c7cc">
				<SettingsList.Header headerStyle={ { marginTop: 15 } }/>
				<SettingsList.Item
					hasNavArrow={ false }
					hasSwitch={ true }
					switchState={ this.state.units === 'f' }
					switchOnValueChange={ this.onUpdateUnits }
					title="Use outdated units? (ºF)"
				/>
				<SettingsList.Header headerStyle={ { marginTop: 15 } }/>
				<SettingsList.Item
					backgroundColor={ showingResetWarning ? 'red' : '#fff' }
					hasNavArrow={ false }
					title={ showingResetWarning ? 'Tap Again to Really Reset' : 'Reset' }
					titleStyle={ showingResetWarning ? { color: '#fff' } : null }
					onPress={ this.onReset }
				/>
			</SettingsList>
			<View style={ styles.credit }>
				<Text style={ styles.creditText }>Made for the Human Made code challenge, March 2018.</Text>
				<Text style={ styles.creditText }>Hacked together by Ryan McCue.</Text>
			</View>
		</View>;
	}
}
