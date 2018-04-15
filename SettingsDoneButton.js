import React from 'react';
import {
	Text,
	View,
	Platform,
	StyleSheet,
} from 'react-native';

import TouchableItem from '../TouchableItem';

class SettingsDoneButton extends React.PureComponent {
	static defaultProps = {
		pressColorAndroid: 'rgba(0, 0, 0, .32)',
		tintColor: Platform.select({
			ios: '#037aff',
		}),
	};

	state = {};

	_onTextLayout = e => {
		if (this.state.initialTextWidth) {
			return;
		}
		this.setState({
			initialTextWidth: e.nativeEvent.layout.x + e.nativeEvent.layout.width,
		});
	};

	render() {
		const {
			onPress,
			pressColorAndroid,
			width,
			title,
			titleStyle,
			tintColor,
			truncatedTitle,
		} = this.props;

		const renderTruncated =
			this.state.initialTextWidth && width
				? this.state.initialTextWidth > width
				: false;

		const backButtonTitle = 'Done';

		return (
			<TouchableItem
				accessibilityComponentType="button"
				accessibilityLabel={backButtonTitle}
				accessibilityTraits="button"
				testID="header-back"
				delayPressIn={0}
				onPress={onPress}
				pressColor={pressColorAndroid}
				style={styles.container}
				borderless
			>
				<View style={styles.container}>
					<Text
						onLayout={this._onTextLayout}
						style={[
							styles.title,
							!!tintColor && { color: tintColor },
							titleStyle,
						]}
						numberOfLines={1}
					>
						{backButtonTitle}
					</Text>
				</View>
			</TouchableItem>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: 'transparent',
	},
	title: {
		fontSize: 17,
		paddingRight: 10,
	},
});

export default SettingsDoneButton;
