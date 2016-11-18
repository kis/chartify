import React, { Component, PropTypes } from 'react';
import './chartify.css';

export default class Chartify extends Component {

	static propTypes = {
		boxSize: PropTypes.number,
		data: PropTypes.array,
		height: PropTypes.number,
		line: PropTypes.bool,
		theme: PropTypes.string
	}

	constructor(props) {
		super(props);
		this.SCALE_WIDTH = props.width || 50;
	}

	calculateLineOptions(currentMark, nextMark) {
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

	renderLine(mark, markNum) {
		const { data: marks } = this.props;
		return (
			<div> 
				<div className="line" style={this.calculateLineOptions(mark.value, marks[markNum + 1].value)} />
				<div className="tooltiptext">
					<div>{mark.value}</div>
					<div>{mark.title}</div>
				</div>
			</div>
		);
	}

	renderRow(mark, markNum) {
		const { 
			data: marks = [],
			height = 50,
			boxSize = 20,
			line = false
		} = this.props;

		const rowStyle = {
			width: boxSize + 'px',
			height: boxSize + 'px'
		};

		const row = Array(height).fill().map((item, i) => ({ value: i }));		

		return (
			<div>
				{row.map(i => {
					let markClass = null;

					if (height - mark.value > i.value) markClass = "mark empty";
					if (height - mark.value == i.value) markClass = "mark";
					if (height - mark.value < i.value) markClass = "mark painted";

					return <div key={i.value} style={rowStyle} className={markClass}>
						{height - mark.value == i.value && markNum < marks.length - 1 && line ?
							this.renderLine(mark, markNum) : null
						}
					</div>
				})}
			</div>
		)
	}

	render() {
		const { 
			data: marks, 
			theme = 'default' 
		} = this.props;
		
		const rulerClass = `ruler-container ${theme}`;

		return (
			<div className={rulerClass}>
				{marks.map((mark, markNum) => (
					<div className="ruler-row" key={markNum}>
						{this.renderRow(mark, markNum)}
					</div>
				))}
			</div>
		);
	}

}