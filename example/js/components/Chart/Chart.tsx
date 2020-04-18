import React, { memo } from 'react'
// import Chartify from 'chartify';
import Chartify from '../../../../dist'
import shortid from 'shortid'

interface Props {
	data: any;
	metadata: any;
}

interface Chart {
	theme: string;
	isLineChart: boolean;
	bordered: boolean;
}

const Chart = memo((props: Props) => {
	const { data, metadata } = props;

	const charts: Chart[] = [{
		theme: "blue",
		isLineChart: false,
		bordered: false
	}, {
		theme: "white",
		isLineChart: false,
		bordered: false
	}, {
		theme: "default",
		isLineChart: false,
		bordered: false
	}, {
		theme: "default",
		isLineChart: true,
		bordered: false
	}]

	return (
		<>
			{charts.map((chart: Chart) => {
				const { theme, isLineChart, bordered } = chart

				return <Chartify 
					key={shortid.generate()}
					data={data} 
					container={metadata.container} 
					config={{
						theme,
						width: 50,
						height: 10,
						isLineChart,
						bordered
					}} 
				/>
			})}
		</>
	);
})

export default Chart;