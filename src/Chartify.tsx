import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { Component } from "react";
import shortid from "shortid";
import "./chartify.css";

type Mark = {
  title: string;
  xValue: string;
  yValue: number;
};

type Config = {
  theme: string;
  width: number;
  height: number;
  boxSize: number;
  isLineChart: boolean;
  bordered: boolean;
};

interface ChartifyProps {
  data: Array<Mark>;
  container: string;
  config: Config;
}

export default class Chartify extends Component<ChartifyProps, any> {
  // get basic mark styles object
  getStyles(config: Config, markNum: number, isActive: boolean) {
    const { boxSize = 20, bordered = false } = config;

    return {
      width: `${boxSize}px`,
      height: !isActive ? `${boxSize * (markNum - 1)}px` : `${boxSize}px`,
      borderTop: !bordered ? "transparent" : "1px solid rgba(249,250,249, 0.9)",
      borderLeft: !bordered ? "transparent" : "1px solid rgba(249,250,249, 0.9)"
    };
  }

  // calculate line styles with calculated incline angle
  calcLineStyles(currentMark: number, nextMark: number) {
    const { config: { boxSize = 20 } } = this.props;
    const AC = boxSize;
    const BC = Math.abs(nextMark - currentMark) * boxSize;
    const AB = Math.hypot(AC, BC);
    const angleA = this.calcLineAngle(BC, AB, nextMark, currentMark);

    return {
      width: `${AB}px`,
      transform: `rotate(${angleA}deg)`,
      top: `${parseInt(boxSize / 2, 10)}px`,
      left: `${parseInt(boxSize / 2, 10)}px`
    };
  }

  // get line incline angle, calculate angle by two sides of imaginary triangle
  calcLineAngle(BC: number, AB: number, nextMark: number, currentMark: number) {
    let angleA = Math.fround(Math.asin(BC / AB) * 180 / Math.PI);
    if (nextMark > currentMark) angleA = -angleA;
    return angleA;
  }

  // calculate approximate max value for the current dataset
  calculateMaxYValue(dataset: Array<Mark>) {
    const valuesArr = dataset.map((el: any) => el.yValue);
    let maxValue = Math.max.apply(null, valuesArr);
    maxValue = Math.round(maxValue);
    let exponent = maxValue.toString().length;
    exponent -= 1;
    exponent = !exponent ? 1 : exponent;
    const prec = 10 ** exponent;
    maxValue = Math.round(maxValue / prec) * prec;
    return maxValue;
  }

  // render Y-axis with approximate values
  renderYAxis(column: Array<any>, maxYValue: any) {
    return (
      <div className="y-axis-wrapper">
        <div className="y-axis">
          {column.map((item: Mark, i: number) => (
            <div className="y-caption" key={i}>
              {i % 2 === 0 ? maxYValue - item.yValue : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // render tooltip on active mark
  renderTooltip(mark: Mark, aproximateYValue: number) {
    const { config: { height } } = this.props;

    const tooltipStyle = {
      top: aproximateYValue < height / 2 ? "-100px" : 0
    };

    return (
      <div className="tooltiptext" style={tooltipStyle}>
        <div className="value">{mark.yValue}</div>
        <div>{mark.title}</div>
        <div className="date">{mark.xValue}</div>
      </div>
    );
  }

  // render column of multiple boxes, each box has own style
  // possible styles is active, empty, painted
  renderColumn(
    dataset: Array<Mark>,
    mark: Mark,
    markNum: number,
    maxY: number
  ) {
    const { config } = this.props;
    const { height = 10, isLineChart = false } = config;

    /*
      calculate Y-value related to the fixed height of the chart
      for example:
      y = 22, height = 10, maxY = 300
      aproximateYValue = 1
      mark.chart_yValue = 1
    */
    let aproximateYValue = Math.round(mark.yValue * height / maxY);
    aproximateYValue = aproximateYValue || 1;

    let nextAproximateYValue = aproximateYValue;

    if (dataset[markNum + 1]) {
      nextAproximateYValue = Math.round(
        dataset[markNum + 1].yValue * height / maxY
      );
      nextAproximateYValue = nextAproximateYValue || 1;
    }

    const stylesActive = this.getStyles(config, aproximateYValue, true);
    const stylesPainted = this.getStyles(config, aproximateYValue, false);

    return (
      <>
        <div
          key={shortid.generate()}
          style={stylesPainted}
          className={`mark painted ${isLineChart ? "white" : ""}`}
        />
        <div
          key={shortid.generate()}
          style={stylesActive}
          className={`mark active ${isLineChart ? "white" : ""}`}
        >
          {this.renderMarkTools(
            mark,
            isLineChart,
            aproximateYValue,
            nextAproximateYValue
          )}
        </div>
      </>
    );
  }

  // render mark line (if needed) and mark tooltip for active mark
  renderMarkTools(
    mark: Mark,
    isLineChart: boolean,
    aproximateYValue: number,
    nextAproximateYValue: number
  ) {
    const lineStyle = isLineChart
      ? this.calcLineStyles(aproximateYValue, nextAproximateYValue)
      : null;

    return (
      <>
        {isLineChart ? <div className="line" style={lineStyle} /> : null}
        {this.renderTooltip(mark, aproximateYValue)}
      </>
    );
  }

  // render X-axis with x-values, 1 date for 10 marks
  renderXAxis(dataset: Array<Mark>, marksStyle: object) {
    const { boxSize = 20 } = this.props.config;
    const showDateCount = dataset.reduce(
      (prev: any, mark: any, markNum: number) => {
        const prevPlus = prev + 1;
        return markNum % 10 === 0 ? prevPlus : prev;
      },
      0
    );

    const width: number = parseInt(
      dataset.length * boxSize / showDateCount,
      10
    );
    const style = { width: `${width}px` };

    return (
      <div className="x-axis" style={marksStyle}>
        {dataset.map(
          (mark: any, markNum: number) =>
            markNum % 10 === 0 ? (
              <div className="x-caption" style={style} key={markNum}>
                {mark.xValue}
              </div>
            ) : null
        )}
      </div>
    );
  }

  // render marks, each mark is a column of multiple boxes
  renderMarks(dataset: Array<Mark>, marksStyle: object, maxYValue: number) {
    return (
      <div className="marks" style={marksStyle}>
        {dataset.map((mark: any, markNum: any) => (
          <div className="ruler-row" key={markNum}>
            {this.renderColumn(dataset, mark, markNum, maxYValue)}
          </div>
        ))}
      </div>
    );
  }

  render() {
    const { data = [], config, container } = this.props;
    const { height = 10, theme = "default", boxSize = 20 } = config;

    if (!data || !data.length) {
      return <h2>No dataset</h2>;
    }

    const dataset = data.splice(0, config.width);
    const maxYValue = this.calculateMaxYValue(dataset);

    const column = Array(height)
      .fill(0)
      .map((item: any, i: any) => {
        const yValue = Math.round(i * (maxYValue / height));
        return { yValue };
      });

    const rulerClass = `ruler-container ${container} ${theme}`;
    const width = dataset.length * boxSize;
    const marksStyle = { width: `${width || 750}px` };

    return (
      <div className={rulerClass}>
        {this.renderYAxis(column, maxYValue)}
        <div className="marks-wrapper">
          {this.renderMarks(dataset, marksStyle, maxYValue)}
          {this.renderXAxis(dataset, marksStyle)}
        </div>
      </div>
    );
  }
}
