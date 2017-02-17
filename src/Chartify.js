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
		const {
			data: marks = [],
			height = 50,
			boxSize = 20,
			bordered = true,
			boxRadius = 10,
			line = false,
			lineOnly = true,
			blink = true
		} = this.props.config;

		const markStyle = {
			'width': `${boxSize}px`,
			'height': `${boxSize}px`,
			'borderRadius': `${boxRadius}px`
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

					if (lineOnly) {
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
					<div>{mark.title || mark.titleRus}</div>
					<div className="date">{mark.date}</div>
				</div>
			</div>
		);
	}

	calcLineStyle(currentMark: number, nextMark: number) {
		const { boxSize = 20 } = this.props;
		const AC = boxSize;
		const BC = Math.abs(nextMark - currentMark) * boxSize;
		const AB = Math.hypot(AC, BC);
		let angleA = Math.fround(Math.asin( BC / AB ) * 180 / Math.PI);

		if (nextMark > currentMark) angleA = -angleA;

		let linePos = parseInt(boxSize/2);

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
		const row = Array(this.props.height).fill().map((item, i) => ({ value: i }));
		const rulerClass = `ruler-container ${this.props.theme}`;

		return (
			<div className={rulerClass}>
				{this.renderYAxis(row)}
				<Draggable options={this.props} renderRow={this.renderRow.bind(this)} />
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