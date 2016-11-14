import React, { Component } from 'react';
import './chartify.css';

export default class Chartify extends Component {

	constructor(props) {
		super(props);
		this.marks = props.data;
		this.SCALE_WIDTH = props.width || 50;
		this.SCALE_HEIGHT = props.height || 50;
		this.BLOCK_WIDTH = props.boxSize || 20;
		this.hasLine = props.line || false;
		this.theme = props.theme || 'default';
	}

	renderRulers() {
		let rulerClass = `ruler-container ${this.theme}`;

    	return <div className={rulerClass}>
    		{this.marks.map((mark, markNum) => {
    			return <div className="ruler-row" key={markNum}>
    				{this.renderRow(mark, markNum)}
    			</div>
    		})}
    	</div>
  	}

  	renderRow(mark, markNum) {
	    let rowStyle = {
	    	width: this.BLOCK_WIDTH + 'px',
	    	height: this.BLOCK_WIDTH + 'px'
	    };

	    let row = new Array(this.SCALE_HEIGHT);
	    for (var i=0; i < row.length; i++) {
	    	row[i] = {
	    		value: i
	    	};
	    }

	    return <div>
	    	{row.map(i => {
	    		let markClass = null;

	    		if (this.SCALE_HEIGHT - mark.value > i.value) markClass = "mark empty";
	      		if (this.SCALE_HEIGHT - mark.value == i.value) markClass = "mark";
	      		if (this.SCALE_HEIGHT - mark.value < i.value) markClass = "mark painted";

	    		return <div key={i.value} style={rowStyle} className={markClass}>
	    			{this.SCALE_HEIGHT - mark.value == i.value && markNum < this.marks.length - 1 && this.hasLine ?
	    				this.renderLine(mark, markNum) : null
	    			}
	    		</div>
	    	})}
	    </div>
    }

    renderLine(mark, markNum) {
    	return <div> 
    		<div className="line" style={this.calculateLineOptions(mark.value, this.marks[markNum+1].value)}></div>
			<div className="tooltiptext">
				<div>{mark.value}</div>
				<div>{mark.title}</div>
			</div>
		</div>
    }

    calculateLineOptions(currentMark, nextMark) {
	    var AC = this.BLOCK_WIDTH, 
	        BC = Math.abs(nextMark - currentMark) * this.BLOCK_WIDTH;
	    var AB = Math.hypot( AC, BC );
	    var angleA = Math.fround( Math.asin( BC / AB ) * 180 / Math.PI);

	    if (nextMark > currentMark) angleA = -angleA;

	    return {
	      width: AB + 'px',
	      transform: 'rotate(' + angleA + 'deg)',
	      top: parseInt(this.BLOCK_WIDTH/2) + 'px',
	      left: parseInt(this.BLOCK_WIDTH/2) + 'px'
	    };
  	}

	render() {
		return (
			<div>
				{this.renderRulers()}
			</div>
		);
	}

}