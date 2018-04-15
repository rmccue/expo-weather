import React from 'react';
import {
	StyleSheet,
	Text,
	View
} from 'react-native';
import {
	VictoryAxis,
	VictoryChart,
	VictoryLine,
	VictoryTheme,
	VictoryZoomContainer
} from 'victory-native';

import { convertTemp } from './util';

const styles = StyleSheet.create( {
	container: {
		// flexDirection: 'row',
		marginBottom: 10,
	},
	chart: {
		// flex: 1,
		height: 120,
	},
} );

const svg = {
	stroke: 'rgb(134, 65, 244)',
	strokeWidth: 4,
};

const chartPadding = {
	top: 10,
	left: 5,
	right: 5,
	bottom: 20,
};

const axisPadding = {
	top: 0,
	left: 0,
	right: 0,
	bottom: 5,
};

const axisStyle = {
	axis: {
		fill: 'transparent',
		strokeWidth: 0,
	},
	ticks: {
		stroke: 'grey',
		size: 5,
	},
	tickLabels: {
		fontSize: 15,
		padding: 0,
	},
};

const lineStyle = {
	data: {
		stroke: "#7dc9da",
	},
	parent: {
		border: "1px solid #ccc",
	},
	labels: {
		padding: 0,
		stroke: "#fff",
		strokeWidth: 0.5,
	},
};
const mapX = item => {
	const time = new Date( item.time * 1000 );
	return `${ time.getDay() }-${ time.getHours() }`
};

export default function Today( props ) {
	if ( ! props.forecast ) {
		return null;
	}

	const data = props.forecast.hourly.data;
	const ticks = data
		.map( item => mapX( item ) )
		.filter( x => {
			const hour = parseInt( x.split( '-' )[1], 10 );
			return ( hour % 6 ) === 0;
		} );

	const labelFormat = item => {
		const hour = parseInt( item.x.split( '-' )[1], 10 );
		if ( ( hour % 6 ) !== 0 ) {
			return '';
		}
		return Math.round( convertTemp( item.temperature, props.units ) ) + 'º';
	};

	return <View style={ styles.container }>
		<VictoryChart
			domainPadding={ 10 }
			height={ 120 }
			padding={ chartPadding }
		>
			<VictoryAxis
				fixLabelOverlap={ true }
				offsetY={ 30 }
				padding={ axisPadding }
				style={ axisStyle }
				tickFormat={ v => v.split( '-' )[1] + ':00' }
				tickValues={ ticks }
			/>
			<VictoryLine
				interpolation="natural"
				data={ data }
				labels={ labelFormat }
				style={ lineStyle }
				x={ mapX }
				y="temperature"
			/>
		</VictoryChart>
	</View>;
}