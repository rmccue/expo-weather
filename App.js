import React from 'react';
import { StackNavigator, SwitchNavigator } from 'react-navigation';

import InitialLoading from './screens/InitialLoading';
import Settings from './screens/Settings';
import Weather from './screens/Weather';
import Welcome from './screens/Welcome';

const AppStack = StackNavigator(
	{
		Home: {
			screen: Weather,
		},
		Settings: {
			screen: Settings,
		},
	},
	{
		initialRouteName: 'Home',
		// initialRouteName: 'Settings',
		mode: 'modal',
	},
);

const RootStack = SwitchNavigator(
	{
		InitialLoading,
		App: AppStack,
		Welcome,
	},
	{
		initialRouteName: 'InitialLoading',
	}
);

export default class App extends React.Component {
	render() {
		return <RootStack />;
	}
}
