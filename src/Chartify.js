// @flow

import React, { Component, PropTypes } from 'react';
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
		// this.SCALE_WIDTH = props.width || 50;
	}

	renderRow(mark: Mark, markNum: number, row: Array) {
		const { 
			data: marks = [],
			height = 50,
			boxSize = 20,
			bordered = true,
			line = false
		} = this.props;

		const markStyle = {
			width: boxSize + 'px',
			height: boxSize + 'px'
		};		

		if (!bordered) {
			markStyle.borderTop = 'transparent';
			markStyle.borderLeft = 'transparent';
		}

		return (
			<div>
				{row.map(i => {
					let markClass = null;

					if (height - mark.value > i.value) markClass = "mark empty";
					if (height - mark.value == i.value) markClass = "mark";
					if (height - mark.value < i.value) markClass = "mark painted";

					let isPoint = height - mark.value == i.value && markNum < marks.length - 1;

					return <div key={i.value} style={markStyle} className={markClass}>
						{isPoint ? this.renderTools(mark, markNum, line) : null}
					</div>
				})}
			</div>
		)
	}

	renderTools(mark: Mark, markNum: number, drawLine: boolean) {
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

	render() {
		const { 
			data: marks, 
			height = 50,
			theme = 'default' 
		} = this.props;
		
		const rulerClass = `ruler-container ${theme}`;

		const row = Array(height).fill().map((item, i) => ({ value: i }));

		return (
			<div className={rulerClass}>
				<div className="y-axis">
					{row.map(i => {
						return <div key={i.value}>
							{i.value % 2 == 0 ? 10 - i.value : null}
						</div>
					})}
				</div>
				<div className="marks">	
					{marks.map((mark, markNum) => (
						<div className="ruler-row" key={markNum}>
							{this.renderRow(mark, markNum, row)}
						</div>
					))}
				</div>
				<div className="x-axis">
					{marks.map((mark, markNum) => (
						markNum % 10 == 0 ? <div className="x-caption" key={markNum}>
							{mark.date}
						</div> : null
					))}
				</div>
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