// @flow

import React, { Component, PropTypes } from 'react';

type Props = {};

export default class Draggable extends Component {

	constructor(props: Props) {
		super(props);

		this.state = {
			delta: 0
		};
	}

	componentDidMount() {
		this.elements = {
			inner: document.getElementsByClassName('marks')[0],
			outer: document.getElementsByClassName('marks-wrapper')[0]
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
		} = this.props.options;

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

	renderMarks(marks, marksStyle) {
		const row = Array(this.props.options.height).fill().map((item, i) => ({ value: i }));

		return (
			<div className="marks" 
				 style={marksStyle}
				 onTouchStart={this.startDrag.bind(this)}
				 onTouchMove={this.processDrag.bind(this)} 
				 onTouchEnd={this.drop.bind(this)}
				 onMouseDown={this.startDrag.bind(this)} 
				 onMouseMove={this.processDrag.bind(this)} 
				 onMouseUp={this.drop.bind(this)}>
				{marks.map((mark, markNum) => (
					<div className="ruler-row" key={markNum}>
						{this.props.renderRow(mark, markNum, row)}
					</div>
				))}
			</div>
		);
	}

	renderXAxis(marks, marksStyle) {
		return (
			<div className="x-axis"
				 style={marksStyle}>
				{marks.map((mark, markNum) => (
					markNum % 10 == 0 ? <div className="x-caption" key={markNum}>
						{mark.date}
					</div> : null
				))}
			</div>
		);
	}

	render() {
		const { 
			data: marks,
			boxSize = 20
		} = this.props.options;

		let marksStyle = {
			width: `${marks.length * boxSize}px`,
			transform: `translateX(${this.state.delta}px)`
		};

		return (
			<div className="marks-wrapper">
				{this.renderMarks(marks, marksStyle)}
				{this.renderXAxis(marks, marksStyle)}
			</div>
		);
	}

}