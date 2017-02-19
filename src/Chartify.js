// @flow

import React, { Component, PropTypes } from 'react';
import Draggable from './Draggable';
import './chartify.css';

type Props = {};
type Mark = {
	title: string,
	value: number,
	date: string
};

export default class Chartify extends Component {

	constructor(props: Props) {
		super(props);
	}

	getMarkStyle(config) {
		let {
			box_size = 20, 
			box_radius = 8, 
			bordered = false
		} = config;

		const markStyle = {
			'width': `${box_size}px`,
			'height': `${box_size}px`,
			'borderRadius': `${box_radius}px`
		};

		if (!bordered) {
			markStyle['borderTop'] = 'transparent';
			markStyle['borderLeft'] = 'transparent';
		}

		return markStyle;
	}

	renderRow(mark: Mark, markNum: number, row: Array) {
		let { data } = this.props;

		let {
			height = 10,
			line = false,
			line_only = false,
			bordered = false,
			blink = false
		} = this.props.config;

		let markStyle = this.getMarkStyle(this.props.config);

		return (
			<div>
				{row.map(i => {
					let markClass = null;

					if (height - mark.value > i.value) markClass = "mark empty";
					if (height - mark.value == i.value) markClass = "mark";
					if (height - mark.value < i.value) markClass = "mark painted";

					let isPoint = height - mark.value == i.value && markNum < data.length - 1;

					let style = {...markStyle};

					if (markClass == "mark painted" && blink) {
						style = {...markStyle, 'animation': 'blink 0.5s infinite'};
					}

					return <div key={i.value} style={style} className={markClass}>
						{isPoint ? this.renderMarkTools(mark, markNum, line || line_only) : null}
					</div>
				})}
			</div>
		)
	}

	renderMarkTools(mark: Mark, markNum: number, drawLine: boolean) {
		let { data } = this.props;
		let lineStyle = drawLine ? this.calcLineStyle(mark.value, data[markNum + 1].value) : null;
		
		return (
			<div>
				{drawLine ? <div className="line" style={lineStyle}></div> : null}
				<div className="tooltiptext">
					<div className="value">{mark.value}</div>
					<div>{mark.title}</div>
					<div className="date">{mark.date}</div>
				</div>
			</div>
		);
	}

	calcLineStyle(currentMark: number, nextMark: number) {
		const { box_size = 20 } = this.props.config;
		const AC = box_size;
		const BC = Math.abs(nextMark - currentMark) * box_size;
		const AB = Math.hypot(AC, BC);
		let angleA = Math.fround(Math.asin( BC / AB ) * 180 / Math.PI);

		if (nextMark > currentMark) angleA = -angleA;

		return {
			width: `${AB}px`,
			transform: `rotate(${angleA}deg)`,
			top: `${parseInt(box_size/2)}px`,
			left: `${parseInt(box_size/2)}px`
		};
	}

	renderYAxis(row: Array) {
		return (
			<div className="y-axis-wrapper">
				<div className="y-axis">
					{row.map(i => {
						return <div className="y-caption" key={i.value}>
							{i.value % 2 == 0 ? 10 - i.value : null}
						</div>
					})}
				</div>
			</div>
		);
	}

	render() {
		let {
			data = []
		} = this.props;

		let {
			height = 10,
			theme = 'default'
		} = this.props.config;

		const row = Array(height).fill().map((item, i) => ({ value: i }));
		const rulerClass = `ruler-container ${theme}`;

		return (
			<div className={rulerClass}>
				{this.renderYAxis(row)}
				<Draggable 
					data={data} 
					config={this.props.config} 
					renderRow={this.renderRow.bind(this)} />
			</div>
		);
	}

}

Chartify.propTypes = {
	boxSize: PropTypes.number,
	data: PropTypes.array,
	height: PropTypes.number,
	line: PropTypes.bool,
	theme: PropTypes.string
}