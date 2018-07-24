// @flow
import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import "./chartify.css";

type Mark = {
  title: string,
  x_value: string,
  y_value: number
};

export default class Chartify extends Component {
  getMarkClasses(height: number, mark: Mark, i: Object) {
    if (height - mark.chart_y_value > i.y_value) return "mark empty";
    if (height - mark.chart_y_value === i.y_value) return "mark active";
    if (height - mark.chart_y_value < i.y_value) return "mark painted";
    return "mark empty";
  }

  getStyles(config: Object) {
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

  getMarkStyles(styles: Object, markClasses: string, blink: boolean) {
    return markClasses === "mark painted" && blink
      ? { ...styles, animation: "blink 0.5s infinite" }
      : { ...styles };
  }

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

  calcLineAngle(BC: number, AB: number, nextMark: number, currentMark: number) {
    let angleA = Math.fround(Math.asin(BC / AB) * 180 / Math.PI);
    if (nextMark > currentMark) angleA = -angleA;
    return angleA;
  }

  calculateMaxValue() {
    const { data = [] } = this.props;
    const valuesArr = data.map(el => el.y_value);
    let maxValue = Math.max.apply(null, valuesArr);
    maxValue = Math.round(maxValue);
    let exponent = maxValue.toString().length;
    exponent -= 1;
    exponent = !exponent ? 1 : exponent;
    const prec = 10 ** exponent;
    maxValue = Math.round(maxValue / prec) * prec;
    return maxValue;
  }

  renderYAxis(row: Array, maxValue: any) {
    return (
      <div className="y-axis-wrapper">
        <div className="y-axis">
          {row.map((i, key) => (
            <div className="y-caption" key={i.y_value}>
              {key % 2 === 0 ? maxValue - i.y_value : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  renderTooltip(mark: Mark) {
    const { config: { height } } = this.props;

    const tooltipStyle = {
      top: mark.chart_y_value < height / 2 ? "-100px" : 0
    };

    return (
      <div className="tooltiptext" style={tooltipStyle}>
        <div className="value">{mark.y_value}</div>
        <div>{mark.title}</div>
        <div className="date">{mark.x_value}</div>
      </div>
    );
  }

  renderMarkTools(mark: Mark, markNum: number, drawLine: boolean) {
    const { data } = this.props;
    const lineStyle = drawLine
      ? this.calcLineStyles(mark.chart_y_value, data[markNum + 1].chart_y_value)
      : null;

    return (
      <Fragment>
        {drawLine ? <div className="line" style={lineStyle} /> : null}
        {this.renderTooltip(mark)}
      </Fragment>
    );
  }

  renderRow(mark: Mark, markNum: number, row: Array, maxX: number) {
    const { data, config } = this.props;

    const {
      height = 10,
      line = false,
      line_only: lineOnly = false,
      blink = false
    } = config;

    const styles = this.getStyles(config);

    mark.chart_y_value = Math.round(mark.y_value * height / maxX);
    mark.chart_y_value = mark.chart_y_value ? mark.chart_y_value : 1;

    return (
      <Fragment>
        {row.map(i => {
          const markClasses = lineOnly
            ? "mark white"
            : this.getMarkClasses(height, mark, i);
          const markStyles = this.getMarkStyles(styles, markClasses, blink);
          const isActiveMark =
            height - mark.chart_y_value === i.y_value &&
            markNum < data.length - 1;

          return (
            <div key={i.y_value} style={markStyles} className={markClasses}>
              {isActiveMark
                ? this.renderMarkTools(mark, markNum, line || lineOnly)
                : null}
            </div>
          );
        })}
      </Fragment>
    );
  }

  renderXAxis(marksStyle) {
    const { data: marks = 50, config } = this.props;
    const { boxSize = 20 } = config;
    const showDateCount = marks.reduce((prev, mark, markNum) => {
      const prevPlus = prev + 1;
      return markNum % 10 === 0 ? prevPlus : prev;
    }, 0);

    const width = parseInt(marks.length * boxSize / showDateCount, 10);
    const style = { width: `${width}px` };

    return (
      <div className="x-axis" style={marksStyle}>
        {marks.map(
          (mark, markNum) =>
            markNum % 10 === 0 ? (
              <div className="x-caption" style={style} key={mark.id}>
                {mark.x_value}
              </div>
            ) : null
        )}
      </div>
    );
  }

  renderMarks(marksStyle, maxValue) {
    const { data = [], config } = this.props;
    const { height } = config;
    const row = Array(height)
      .fill()
      .map((item, i) => ({ y_value: i }));

    return (
      <div className="marks" style={marksStyle}>
        {data.map((mark, markNum) => (
          <div className="ruler-row" key={mark.id}>
            {this.renderRow(mark, markNum, row, maxValue)}
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

    const maxValue = this.calculateMaxValue();

    const row = Array(height)
      .fill()
      .map((item, i) => {
        const yValue = Math.round(i * (maxValue / height));
        return { y_value: yValue };
      });

    const rulerClass = `ruler-container ${container} ${theme}`;
    const width = data.length * boxSize;
    const marksStyle = { width: `${width || 750}px` };

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

Chartify.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      x_value: PropTypes.number,
      y_value: PropTypes.number,
      title: PropTypes.string
    })
  ).isRequired,
  container: PropTypes.string.isRequired,
  config: PropTypes.shape({
    theme: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
    box_size: PropTypes.number,
    box_radius: PropTypes.number,
    line: PropTypes.bool,
    line_only: PropTypes.bool,
    bordered: PropTypes.bool,
    blink: PropTypes.bool
  }).isRequired
};
