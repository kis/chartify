import React, { PureComponent } from 'react';
// import Chartify from 'chartify';
import Chartify from '../../../../dist';

interface Props {
	data: any;
	metadata: any;
}

const Chart = (props: Props) => {
	const { data, metadata } = props;

	return (
		<>
			<Chartify 
				data={data} 
				container={metadata.container} 
				config={{
					theme: "blue",
					width: 50,
					height: 10,
					isLineChart: false,
					bordered: false
				}} 
			/>
			<Chartify 
				data={data} 
				container={metadata.container} 
				config={{
					theme: "white",
					width: 50,
					height: 10,
					isLineChart: false,
					bordered: false
				}} 
			/>
			<Chartify 
				data={data} 
				container={metadata.container} 
				config={{
					theme: "default",
					width: 50,
					height: 10,
					isLineChart: false,
					bordered: false
				}} 
			/>
			<Chartify 
				data={data} 
				container={metadata.container} 
				config={{
					theme: "default",
					width: 50,
					height: 10,
					isLineChart: true,
					bordered: false
				}} 
			/>
		</>
	);
}

export default Chart;