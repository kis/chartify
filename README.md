# Chartify - simple and lightweight charts for React.js

[![NPM Version](https://img.shields.io/npm/v/chartify.svg)](https://www.npmjs.com/package/chartify)
[![Download Month](https://img.shields.io/npm/dm/chartify.svg)](https://www.npmjs.com/package/chartify)
[![Download Total](https://img.shields.io/npm/dt/chartify.svg)](https://www.npmjs.com/package/chartify)
[![GitHub issues](https://img.shields.io/github/issues/kirillstepkin/chartify.svg)](https://github.com/kirillstepkin/chartify/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/kirillstepkin/chartify.svg?style=social)](https://twitter.com/intent/tweet?text=Simple and lightweight charts for React.js&url=https://github.com/kirillstepkin/chartify)

[DEMO](https://kirillstepkin.github.io/chartify/)

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/placeit1.jpg)

Simple and lightweight React.js plugin for building charts. Bar chart, calendar view visualisation. Diagram, graph, pyramid visualisation of large datasets. Showreel. The source for this module is in the [main repo](https://github.com/kirillstepkin/chartify). Please create issues and pull requests. Check [angular-scale](https://github.com/kirillstepkin/scale) if you're using Angular.js. And [jquery-linechart](https://github.com/kirillstepkin/jquery-linechart) if you're using JQuery.

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/output_eSVfyQ.gif)

|   Library  | Size minified |
|:----------:|:-------------:|
| Chartify   | 19kb          |
| D3.js      | 116kb         |
| Highcharts | 45kb          |

Inspired by [kinopoisk.ru](https://www.kinopoisk.ru/) chart written using Adobe Flash. Feel free for contribute.

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/84d858c0af.png)

### Install

```
npm install chartify
```

### Use

```javascript
import Chartify from 'chartify';
```

### Options

```javascript
<Chartify data = {this.items}
		  width = {50} 
	      height = {10}
	      boxSize = {16}
	      line = {true}
	      theme = {"purple"} />
```

* **data** is an array of objects [{value: 0}, ... , {value: 10}]. This is the dataset of the chart.
* **width** is the horizontal length of the data array. If width param is less than the length of the data array then user will see the last values of the data array. 
* **height** is the vertical length.
* **box-size** is size of each box in pixels.

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/46cd396faa.jpg)

* **line** is param that determines if this is a line-chart.

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/a03def3092.jpg)

* **theme** is color scheme of the chart.

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/a657bab0f7.jpg)

Please check the example folder to see how it's going on practice.

### Themes

* default
* purple
* grey

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/024486fd94.jpg)

### Changelog

* 11/12/2016 Rewriting the project as React.js component.
* 10/03/2016 Rewriting the project as JQuery plugin.
* 10/02/2016 Implemented tooltips.
* 10/01/2016 Implemented different color schemes.
* 09/20/2016 Rewriting the project as an Angular.js plugin.
* 06/05/2016 Finished writing function for calculating angle of the line that connects the points of the chart. Rendering chart.

### Contributing

We're looking for co-maintainers!

### License

The MIT License (MIT) Copyright (c) 2016 Kirill Stepkin
