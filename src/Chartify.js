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

	renderRow(mark: Mark, markNum: number, row: Array) {
		let { data: marks } = this.props;

		const {
			height = 50,
			box_size = 20,
			bordered = true,
			box_radius = 10,
			line = false,
			line_only = true,
			blink = true
		} = this.props.config;

		const markStyle = {
			'width': `${box_size}px`,
			'height': `${box_size}px`,
			'borderRadius': `${box_radius}px`
		};

		if (!bordered) {
			markStyle['borderTop'] = 'transparent';
			markStyle['borderLeft'] = 'transparent';
		}

		return (
			<div>
				{row.map(i => {
					let markClass = null;
					let drawLine = false;

					if (height - mark.value > i.value) markClass = "mark empty";
					if (height - mark.value == i.value) markClass = "mark";
					if (height - mark.value < i.value) markClass = "mark painted";

					if (line) drawLine = true;

					if (line_only) {
						drawLine = true;
						markClass = "mark white";
					}

					let isPoint = height - mark.value == i.value && markNum < marks.length - 1;

					let individualStyle = Object.assign({}, markStyle);

					if (markClass == "mark painted" && blink) {
						individualStyle = Object.assign({}, markStyle, {
							'animation': 'blink 0.5s infinite'
						});
					}

					return <div key={i.value} style={individualStyle} className={markClass}>
						{isPoint ? this.renderMarkTools(mark, markNum, drawLine) : null}
					</div>
				})}
			</div>
		)
	}

	renderMarkTools(mark: Mark, markNum: number, drawLine: boolean) {
		const { data: marks } = this.props;
		let lineStyle = drawLine ? this.calcLineStyle(mark.value, marks[markNum + 1].value) : null;
		
		return (
			<div>
				{drawLine ? <div className="line" style={lineStyle}></div> : null}
				<div className="tooltiptext">
					<div>{mark.value}</div>
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

		let linePos = parseInt(box_size/2);

		return {
			width: `${AB}px`,
			transform: `rotate(${angleA}deg)`,
			top: `${linePos}px`,
			left: `${linePos}px`
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
		const row = Array(this.props.config.height).fill().map((item, i) => ({ value: i }));
		const rulerClass = `ruler-container ${this.props.config.theme}`;

		return (
			<div className={rulerClass}>
				{this.renderYAxis(row)}
				<Draggable 
					data={this.props.data} 
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