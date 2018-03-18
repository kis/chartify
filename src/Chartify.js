// @flow
import React, { Component, Fragment } from "react";
import "./chartify.css";

type Props = {};
type Mark = {
  title: string,
  x_value: string,
  y_value: number
};

export default class Chartify extends Component {
  renderRow(mark: Mark, markNum: number, row: Array, maxX: number) {
    let { data, config } = this.props;

    let {
      height = 10,
      line = false,
      line_only = false,
      bordered = false,
      blink = false
    } = config;

    let styles = this.getStyles(config);

    mark.chart_y_value = Math.round(mark.y_value * height / maxX);
    mark.chart_y_value = mark.chart_y_value ? mark.chart_y_value : 1;

    return (
      <Fragment>
        {row.map(i => {
          let markClasses = line_only
            ? "mark white"
            : this.getMarkClasses(height, mark, i);
          let markStyles = this.getMarkStyles(styles, markClasses, blink);
          let isActiveMark =
            height - mark.chart_y_value == i.y_value &&
            markNum < data.length - 1;

          return (
            <div key={i.y_value} style={markStyles} className={markClasses}>
              {isActiveMark
                ? this.renderMarkTools(mark, markNum, line || line_only)
                : null}
            </div>
          );
        })}
      </Fragment>
    );
  }

  getMarkClasses(height: number, mark: Mark, i: Object) {
    if (height - mark.chart_y_value > i.y_value) return "mark empty";
    if (height - mark.chart_y_value == i.y_value) return "mark active";
    if (height - mark.chart_y_value < i.y_value) return "mark painted";
  }

  getStyles(config: Object) {
    let { box_size = 20, box_radius = 8, bordered = false } = config;

    return {
      width: `${box_size}px`,
      height: `${box_size}px`,
      borderRadius: `${box_radius}px`,
      borderTop: !bordered ? "transparent" : "1px solid rgba(249,250,249, 0.9)",
      borderLeft: !bordered ? "transparent" : "1px solid rgba(249,250,249, 0.9)"
    };
  }

  getMarkStyles(styles: Object, markClasses: string, blink: boolean) {
    return markClasses == "mark painted" && blink
      ? { ...styles, animation: "blink 0.5s infinite" }
      : { ...styles };
  }

  renderMarkTools(mark: Mark, markNum: number, drawLine: boolean) {
    let { data } = this.props;
    let lineStyle = drawLine
      ? this.calcLineStyles(mark.chart_y_value, data[markNum + 1].chart_y_value)
      : null;

    return (
      <Fragment>
        {drawLine ? <div className="line" style={lineStyle} /> : null}
        {this.renderTooltip(mark)}
      </Fragment>
    );
  }

  renderTooltip(mark: Mark) {
    let tooltipStyle = {
      top: mark.chart_y_value < this.props.config.height / 2 ? "-100px" : 0
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
      top: `${parseInt(box_size / 2)}px`,
      left: `${parseInt(box_size / 2)}px`
    };
  }

  calcLineAngle(BC: number, AB: number, nextMark: number, currentMark: number) {
    let angleA = Math.fround(Math.asin(BC / AB) * 180 / Math.PI);
    if (nextMark > currentMark) angleA = -angleA;
    return angleA;
  }

  renderYAxis(row: Array, maxValue: any) {
    return (
      <div className="y-axis-wrapper">
        <div className="y-axis">
          {row.map((i, key) => {
            return (
              <div className="y-caption" key={i.y_value}>
                {key % 2 == 0 ? maxValue - i.y_value : null}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  calculateMaxValue() {
    let { data = [] } = this.props;
    let valuesArr = data.map(el => el.y_value);
    let maxValue = Math.max.apply(null, valuesArr);
    maxValue = Math.round(maxValue);
    let exponent = maxValue.toString().length;
    exponent--;
    exponent = !exponent ? 1 : exponent;
    let prec = Math.pow(10, exponent);
    maxValue = Math.round(maxValue / prec) * prec;
    return maxValue;
  }

  renderXAxis(marksStyle) {
    const { data: marks = 50, config } = this.props;
    const { box_size = 20 } = config;

    let showDateCount = marks.reduce((prev, mark, markNum) => {
      return markNum % 10 == 0 ? ++prev : prev;
    }, 0);

    let width = parseInt(marks.length * box_size / showDateCount);
    let style = { width: `${width}px` };

    return (
      <div className="x-axis" style={marksStyle}>
        {marks.map(
          (mark, markNum) =>
            markNum % 10 == 0 ? (
              <div className="x-caption" style={style} key={markNum}>
                {mark.x_value}
              </div>
            ) : null
        )}
      </div>
    );
  }

  renderMarks(marksStyle, maxValue) {
    let { data = [], config } = this.props;
    const { height } = config;
    const row = Array(height)
      .fill()
      .map((item, i) => ({ y_value: i }));

    return (
      <div className="marks" style={marksStyle}>
        {data.map((mark, markNum) => (
          <div className="ruler-row" key={markNum}>
            {this.renderRow(mark, markNum, row, maxValue)}
          </div>
        ))}
      </div>
    );
  }

  render() {
    let { data = [], config, container } = this.props;
    let { height = 10, theme = "default", box_size = 20 } = config;

    if (!data || !data.length) return <h2>No dataset</h2>;

    let maxValue = this.calculateMaxValue();

    const row = Array(height)
      .fill()
      .map((item, i) => {
        let y_value = Math.round(i * (maxValue / height));
        return { y_value };
      });

    const rulerClass = `ruler-container ${container} ${theme}`;
    let width = data.length * box_size;
    let marksStyle = { width: `${width || 750}px` };

    return (
      <div className={rulerClass}>
        {this.renderYAxis(row, maxValue)}
        <div className="marks-wrapper">
          {this.renderMarks(marksStyle, maxValue)}
          {this.renderXAxis(marksStyle)}
        </div>
      </div>
    );
  }
}
