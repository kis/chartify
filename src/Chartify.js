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

		this.state = {
			delta: 0
		};
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
						{isPoint ? this.renderMarkTools(mark, markNum, line) : null}
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

	startDrag = (e) => {
		this.pageX = e.pageX;
		this.lastDelta = this.state.delta;
		this.checkMove = true;
	}

	processDrag = (e) => {
		const {
			data: marks = [],
			boxSize = 20
		} = this.props;

		let chartLength = marks.length;

		let innerPos = this.elements.inner.getBoundingClientRect().left - window.scrollX;
		let outerPos = this.elements.outer.getBoundingClientRect().left - window.scrollX;
		let innerRightPos = innerPos + chartLength * boxSize;
		let outerRightPos = outerPos + this.elements.outer.offsetWidth;

		if (this.state.delta == 0) {
			this.rightState = outerRightPos - innerRightPos;
		}

		if (!this.checkMove || innerPos > outerPos || innerRightPos < outerRightPos) {
			return;
		}

		let deltaX = e.pageX - this.pageX;
		let newDelta = this.lastDelta + deltaX;

		if (innerRightPos + deltaX < outerRightPos) {
			newDelta = this.rightState;
		}

		if (innerPos + deltaX > outerPos) {
			newDelta = 0; 
		}

		this.setState({
			delta: newDelta
		});
	}

	drop = (e) => {
		this.checkMove = false;
	}

	componentDidMount() {
		this.elements = {
			inner: document.getElementsByClassName('marks')[0],
			outer: document.getElementsByClassName('marks-wrapper')[0]
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

	renderMarksWrapper(marks, marksStyle, row) {
		return (
			<div className="marks-wrapper">
				<div className="marks" 
					 style={marksStyle} 
					 onMouseDown={this.startDrag.bind(this)} 
					 onMouseMove={this.processDrag.bind(this)} 
					 onMouseUp={this.drop.bind(this)}>
					{marks.map((mark, markNum) => (
						<div className="ruler-row" key={markNum}>
							{this.renderRow(mark, markNum, row)}
						</div>
					))}
				</div>
			</div>
		);
	}

	renderXAxis(marks, marksStyle) {
		return (
			<div className="x-axis-wrapper">
				<div className="x-axis"
					 style={marksStyle}>
					{marks.map((mark, markNum) => (
						markNum % 10 == 0 ? <div className="x-caption" key={markNum}>
							{mark.date}
						</div> : null
					))}
				</div>
			</div>
		);
	}

	render() {
		const { 
			data: marks, 
			height = 50,
			theme = 'default'
		} = this.props;

		let marksStyle = {
			transform: `translateX(${this.state.delta}px)`
		};
		
		const row = Array(height).fill().map((item, i) => ({ value: i }));
		const rulerClass = `ruler-container ${theme}`;

		return (
			<div className={rulerClass}>
				{this.renderYAxis(row)}
				{this.renderMarksWrapper(marks, marksStyle, row)}
				{this.renderXAxis(marks, marksStyle)}
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