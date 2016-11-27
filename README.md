# Chartify - simple and lightweight charts for React.js

[![NPM Version](https://img.shields.io/npm/v/chartify.svg)](https://www.npmjs.com/package/chartify)
[![Download Month](https://img.shields.io/npm/dm/chartify.svg)](https://www.npmjs.com/package/chartify)
[![Download Total](https://img.shields.io/npm/dt/chartify.svg)](https://www.npmjs.com/package/chartify)
[![GitHub issues](https://img.shields.io/github/issues/kisqin/chartify.svg)](https://github.com/kisqin/chartify/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Twitter](https://img.shields.io/twitter/url/https/github.com/kisqin/chartify.svg?style=social)](https://twitter.com/intent/tweet?text=Simple and lightweight charts for React.js&url=https://github.com/kisqin/chartify)

[DEMO](https://kisqin.github.io/chartify/)

![alt text](https://raw.githubusercontent.com/kisqin/scale/master/img/placeit1.jpg)

Simple and lightweight React.js plugin for building charts. Bar chart, calendar view visualisation. Diagram, graph, pyramid visualisation of large datasets. Showreel. The source for this module is in the [main repo](https://github.com/kisqin/chartify). Please create issues and pull requests. Check [angular-scale](https://github.com/kisqin/scale) if you're using Angular.js. And [jquery-linechart](https://github.com/kisqin/jquery-linechart) if you're using JQuery.

![alt text](https://raw.githubusercontent.com/kisqin/scale/master/img/output_eSVfyQ.gif)

|   Library  | Size minified |
|:----------:|:-------------:|
| Chartify   | 19kb          |
| D3.js      | 116kb         |
| Highcharts | 45kb          |

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
* **line** is param that determines if this is a line-chart.
* **theme** is color scheme of the chart.

Please check the [DEMO](https://kisqin.github.io/chartify/) and the example folder to see how it's going on practice.

### Themes

* default
* purple
* grey

Inspired by [kinopoisk.ru](https://www.kinopoisk.ru/) chart written using Adobe Flash. Feel free for contribute.

![alt text](https://raw.githubusercontent.com/kisqin/scale/master/img/84d858c0af.png)

### Contributing

Looking for co-maintainers.

### License

The MIT License (MIT) Copyright (c) 2016 Kirill Stepkin
