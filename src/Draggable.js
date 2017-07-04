// @flow
import React, { Component } from 'react';

type Props = {};

export default class Draggable extends Component {
	componentDidMount() {
		let { data = [] } = this.props;
		let container = document.querySelector(`.${this.props.container}`);

		this.elements = {
			inner: container.querySelector('.marks'),
			outer: container.querySelector('.marks-wrapper'),
			xAxis: container.querySelector('.x-axis')
		};

		let {innerRightPos, outerRightPos} = this.getPos();

		this.lastDelta = outerRightPos - innerRightPos;

		let newVal = `translateX(${this.lastDelta}px)`;
		this.elements.inner.style.transform = newVal;
		this.elements.xAxis.style.transform = data.length ? newVal : 0;
	}

	startDrag = e => {
		this.pageX = e.pageX;
		let lastTransform = this.elements.inner.style.transform;

		if (!lastTransform) {
			this.lastDelta = 0;
		} else {
			let re = /\D(-?\d+)\D/g;
			let execVal = re.exec(lastTransform);
			this.lastDelta = Number(execVal[1]);
		}

		this.checkMove = true;
	}

	processDrag = e => {
		let {innerPos, outerPos, innerRightPos, outerRightPos} = this.getPos();

		if (this.lastDelta == 0) this.rightState = outerRightPos - innerRightPos;
		if (!this.checkMove || innerPos > outerPos || innerRightPos < outerRightPos) return;

		let deltaX = e.pageX - this.pageX;
		let newDelta = this.lastDelta + deltaX;

		if (innerRightPos + deltaX < outerRightPos) newDelta = this.rightState;
		if (innerPos + deltaX > outerPos) newDelta = 0;

		this.lastDelta = newDelta;
		let newVal = `translateX(${newDelta}px)`;
		this.elements.inner.style.transform = newVal;
		this.elements.xAxis.style.transform = newVal;
	}

	drop = e => { this.checkMove = false; }

	renderMarks(marksStyle) {
		const { height } = this.props.config;
		const row = Array(height).fill().map((item, i) => ({ y_value: i }));
		let maxX = this.props.maxX;

		return (
			<div className="marks"
				 style={marksStyle}
				 onTouchStart={this.startDrag.bind(this)}
				 onTouchMove={this.processDrag.bind(this)}
				 onTouchEnd={this.drop.bind(this)}
				 onMouseDown={this.startDrag.bind(this)}
				 onMouseMove={this.processDrag.bind(this)}
				 onMouseUp={this.drop.bind(this)}>
				{this.props.data.map((mark, markNum) => (
					<div className="ruler-row" key={markNum}>
						{this.props.renderRow(mark, markNum, row, maxX)}
					</div>
				))}
			</div>
		);
	}

	renderXAxis(marksStyle) {
		const { box_size = 20 } = this.props.config;
		const { data: marks = 50 } = this.props;
		let showDateCount = 0;

		marks.forEach((mark, markNum) => {
			showDateCount = markNum % 10 == 0 ? ++showDateCount : showDateCount;
		});

		let width = parseInt(marks.length * box_size / showDateCount);
		let style = { 'width': `${width}px` };

		return (
			<div className="x-axis" style={marksStyle}>
				{marks.map((mark, markNum) => (
					markNum % 10 == 0 ?
						<div className="x-caption" style={style} key={markNum}>
							{mark.x_value}
						</div> : null
				))}
			</div>
		);
	}

	getPos() {
		const { box_size = 20 } = this.props.config;
		const { data: marks = [] } = this.props;

		let windowScrollX = window.scrollX;
		let chartLength = marks.length;
		let innerPos = this.elements.inner.getBoundingClientRect().left - windowScrollX;
		let outerPos = this.elements.outer.getBoundingClientRect().left - windowScrollX;
		let innerRightPos = innerPos + chartLength * box_size;
		let outerRightPos = outerPos + this.elements.outer.offsetWidth;

		return {
			innerPos,
			outerPos,
			innerRightPos,
			outerRightPos
		};
	}

	render() {
		const { box_size = 20 } = this.props.config;
		const { data: marks } = this.props;
		let width = marks.length * box_size;
		let marksStyle = { 'width': `${width || 750}px` };

		return (
			<div className="marks-wrapper">
				{this.renderMarks(marksStyle)}
				{this.renderXAxis(marksStyle)}
			</div>
		);
	}

}
