import "core-js/stable";
import "regenerator-runtime/runtime";

import React, { Component, Fragment } from "react";
import "./chartify.css";

type Mark = {
  title: string;
  x_value: string;
  y_value: number;
};

type Config = {
  theme: string;
  width: number;
  height: number;
  box_size: number;
  box_radius: number;
  line: boolean;
  line_only: boolean;
  bordered: boolean;
};

type Data = {
  x_value: number;
  y_value: number;
  title: string;
};

interface ChartifyProps {
  data: Data;
  container: string;
  config: Config;
}

export default class Chartify extends Component<ChartifyProps, any> {
  // get mark classes by mark position
  getMarkClasses(
    height: number,
    mark: Mark,
    i: Mark,
    aproximateYValue: number
  ) {
    if (height - aproximateYValue > i.y_value) return "mark empty";
    if (height - aproximateYValue === i.y_value) return "mark active";
    if (height - aproximateYValue < i.y_value) return "mark painted";
    return "mark empty";
  }

  // get basic mark styles object
  getStyles(config: object) {
    const {
      box_size: boxSize = 20,
      box_radius: boxRadius = 8,
      bordered = false
    } = config;

    return {
      width: `${boxSize}px`,
      height: `${boxSize}px`,
      borderRadius: `${boxRadius}px`,
      borderTop: !bordered ? "transparent" : "1px solid rgba(249,250,249, 0.9)",
      borderLeft: !bordered ? "transparent" : "1px solid rgba(249,250,249, 0.9)"
    };
  }

  // calculate line styles with calculated incline angle
  calcLineStyles(currentMark: number, nextMark: number) {
    const { config: { box_size: boxSize = 20 } } = this.props;
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
  calculateMaxYValue() {
    const { data = [] } = this.props;
    const valuesArr = data.map((el: any) => el.y_value);
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
          {column.map((item: any, i: any) => (
            <div className="y-caption" key={i}>
              {i % 2 === 0 ? maxYValue - item.y_value : null}
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
        <div className="value">{mark.y_value}</div>
        <div>{mark.title}</div>
        <div className="date">{mark.x_value}</div>
      </div>
    );
  }

  // render mark line (if needed) and mark tooltip for active mark
  renderMarkTools(
    mark: Mark,
    markNum: number,
    drawLine: boolean,
    aproximateYValue: number,
    nextAproximateYValue: number
  ) {
    const lineStyle = drawLine
      ? this.calcLineStyles(aproximateYValue, nextAproximateYValue)
      : null;

    return (
      <Fragment>
        {drawLine ? <div className="line" style={lineStyle} /> : null}
        {this.renderTooltip(mark, aproximateYValue)}
      </Fragment>
    );
  }

  // render column of multiple boxes, each box has own style
  // possible styles is active, empty, painted
  renderColumn(mark: Mark, markNum: number, column: Array, maxY: number) {
    const { data, config } = this.props;
    const { height = 10, line = false, line_only: lineOnly = false } = config;
    const styles = this.getStyles(config);

    /*
      calculate Y-value related to the fixed height of the chart
      for example:
      y = 22, height = 10, maxY = 300
      aproximateYValue = 1
      mark.chart_y_value = 1
    */
    let aproximateYValue = Math.round(mark.y_value * height / maxY);
    aproximateYValue = aproximateYValue || 1;

    return (
      <Fragment>
        {column.map((box: any, i: number) => {
          const markClasses = lineOnly
            ? "mark white"
            : this.getMarkClasses(height, mark, box, aproximateYValue);
          const isActiveMark =
            height - aproximateYValue === box.y_value &&
            markNum < data.length - 1;

          let nextAproximateYValue = aproximateYValue;

          if (data[markNum + 1]) {
            nextAproximateYValue = Math.round(
              data[markNum + 1].y_value * height / maxY
            );
            nextAproximateYValue = nextAproximateYValue || 1;
          }

          return (
            <div key={i} style={styles} className={markClasses}>
              {isActiveMark
                ? this.renderMarkTools(
                    mark,
                    markNum,
                    line || lineOnly,
                    aproximateYValue,
                    nextAproximateYValue
                  )
                : null}
            </div>
          );
        })}
      </Fragment>
    );
  }

  // render X-axis with x-values, 1 date for 10 marks
  renderXAxis(marksStyle: object) {
    const { data: marks = 50, config } = this.props;
    const { boxSize = 20 } = config;
    const showDateCount = marks.reduce((prev: any, mark: any, markNum: any) => {
      const prevPlus = prev + 1;
      return markNum % 10 === 0 ? prevPlus : prev;
    }, 0);

    const width = parseInt(marks.length * boxSize / showDateCount, 10);
    const style = { width: `${width}px` };

    return (
      <div className="x-axis" style={marksStyle}>
        {marks.map(
          (mark: any, markNum: number) =>
            markNum % 10 === 0 ? (
              <div className="x-caption" style={style} key={markNum}>
                {mark.x_value}
              </div>
            ) : null
        )}
      </div>
    );
  }

  // render marks, each mark is a column of multiple boxes
  renderMarks(marksStyle: object, maxYValue: number) {
    const { data = [], config } = this.props;
    const { height } = config;
    const column: Array<any> = Array(height)
      .fill()
      .map((item: number, i: number) => ({ y_value: i }));

    return (
      <div className="marks" style={marksStyle}>
        {data.map((mark: any, markNum: any) => (
          <div className="ruler-row" key={markNum}>
            {this.renderColumn(mark, markNum, column, maxYValue)}
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

    const maxYValue = this.calculateMaxYValue();

    const column = Array(height)
      .fill()
      .map((item: any, i: any) => {
        const yValue = Math.round(i * (maxYValue / height));
        return { y_value: yValue };
      });

    const rulerClass = `ruler-container ${container} ${theme}`;
    const width = data.length * boxSize;
    const marksStyle = { width: `${width || 750}px` };

    return (
      <div className={rulerClass}>
        {this.renderYAxis(column, maxYValue)}
        <div className="marks-wrapper">
          {this.renderMarks(marksStyle, maxYValue)}
          {this.renderXAxis(marksStyle)}
        </div>
      </div>
    );
  }
}
