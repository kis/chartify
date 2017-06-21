// @flow

import React, { Component, PropTypes } from 'react';
import Draggable from './Draggable';
import _ from 'underscore';
import './chartify.css';

type Props = {};
type Mark = {
	title: string,
	x_value: string,
	y_value: number
};

export default class Chartify extends Component {
	renderRow(mark: Mark, markNum: number, row: Array, maxX: number) {
		let { data } = this.props;

		let {
			height = 10,
			line = false,
			line_only = false,
			bordered = false,
			blink = false
		} = this.props.config;

		let styles = this.getStyles(this.props.config);

		mark.chart_y_value = Math.round((mark.y_value * height) / maxX);
		mark.chart_y_value = mark.chart_y_value ? mark.chart_y_value : 1;

		return (
			<div>
				{row.map(i => {
					let markClasses = line_only ? 'mark white' : this.getMarkClasses(height, mark, i);
					let markStyles = this.getMarkStyles(styles, markClasses, blink);
					let isActiveMark = height - mark.chart_y_value == i.y_value && markNum < data.length - 1;

					return <div key={i.y_value} style={markStyles} className={markClasses}>
						{isActiveMark ? this.renderMarkTools(mark, markNum, line || line_only) : null}
					</div>
				})}
			</div>
		)
	}

	getMarkClasses(height: number, mark: Mark, i: Object) {
		if (height - mark.chart_y_value > i.y_value) return "mark empty";
		if (height - mark.chart_y_value == i.y_value) return "mark active";
		if (height - mark.chart_y_value < i.y_value) return "mark painted";
	}

	getStyles(config: Object) {
		let {
			box_size = 20,
			box_radius = 8,
			bordered = false
		} = config;

		return {
			'width': `${box_size}px`,
			'height': `${box_size}px`,
			'borderRadius': `${box_radius}px`,
			'borderTop': !bordered ? 'transparent' : '1px solid rgba(249,250,249, 0.9)',
			'borderLeft': !bordered ? 'transparent' : '1px solid rgba(249,250,249, 0.9)'
		};
	}

	getMarkStyles(styles: Object, markClasses: string, blink: boolean) {
		return (markClasses == "mark painted" && blink) ?
			{...styles, 'animation': 'blink 0.5s infinite'} :
			{...styles};
	}

	renderMarkTools(mark: Mark, markNum: number, drawLine: boolean) {
		let { data } = this.props;
		let lineStyle = drawLine ? this.calcLineStyles(mark.chart_y_value, data[markNum + 1].chart_y_value) : null;

		return (
			<div>
				{drawLine ? <div className="line" style={lineStyle}></div> : null}
				{this.renderTooltip(mark)}
			</div>
		);
	}

	renderTooltip(mark: Mark) {
		let tooltipStyle = {
			top: (mark.chart_y_value < this.props.config.height / 2) ? '-100px' : 0
		};

		return (
			<div className="tooltiptext" style={tooltipStyle}>
				<div className="value">{mark.y_value}</div>
				<div>{mark.title}</div>
				<div className="date">{mark.x_value}</div>
			</div>
		);
	}

	calcLineStyles(currentMark: number, nextMark: number) {
		const { box_size = 20 } = this.props.config;
		const AC = box_size;
		const BC = Math.abs(nextMark - currentMark) * box_size;
		const AB = Math.hypot(AC, BC);
		let angleA = this.calcLineAngle(BC, AB, nextMark, currentMark);

		return {
			width: `${AB}px`,
			transform: `rotate(${angleA}deg)`,
			top: `${parseInt(box_size/2)}px`,
			left: `${parseInt(box_size/2)}px`
		};
	}

	calcLineAngle(BC: number, AB: number, nextMark: number, currentMark: number) {
		let angleA = Math.fround(Math.asin( BC / AB ) * 180 / Math.PI);
		if (nextMark > currentMark) angleA = -angleA;
		return angleA;
	}

	renderYAxis(row: Array, maxValue: number) {
		return (
			<div className="y-axis-wrapper">
				<div className="y-axis">
					{row.map(i => {
						return <div className="y-caption" key={i.y_value}>
							{i.y_value % 2 == 0 ? maxValue - i.y_value : null}
						</div>
					})}
				</div>
			</div>
		);
	}

	render() {
		let {data = []} = this.props;
		let {height = 10, theme = 'default'} = this.props.config;

		let maxValueObj = _.max(this.props.data, el => { return el.y_value; });
		let maxValue = maxValueObj.y_value;

		const row = Array(height).fill().map((item, i) => {
			return {
				y_value: i*(maxValue/height)
			};
		});

		const rulerClass = `ruler-container ${this.props.container} ${theme}`;

		return (
			<div className={rulerClass}>
				{this.renderYAxis(row, maxValue)}
				<Draggable
					data={data}
					maxX={maxValue}
					container={this.props.container}
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
