# Chartify - simple and lightweight charts for React.js

[![NPM Version](https://img.shields.io/npm/v/jquery-linechart.svg)](https://www.npmjs.com/package/chartify)
[![Download Month](https://img.shields.io/npm/dm/jquery-linechart.svg)](https://www.npmjs.com/package/chartify)
[![Download Total](https://img.shields.io/npm/dt/jquery-linechart.svg)](https://www.npmjs.com/package/chartify)

[DEMO](https://kirillstepkin.github.io/chartify/)

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/placeit1.jpg)

React.js plugin for building a linechart. Bar chart, calendar view visualisation. Diagram, graph, pyramid visualisation of large datasets. Showreel. The source for this module is in the [main repo](https://github.com/kirillstepkin/chartify). Please create issues and pull requests. Check [angular-scale](https://github.com/kirillstepkin/scale) if you're using Angular.js. And [jquery-linechart](https://github.com/kirillstepkin/jquery-linechart) if you're using JQuery.

![alt text](https://raw.githubusercontent.com/kirillstepkin/scale/master/img/output_eSVfyQ.gif)

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

### License

Copyright (c) 2016 [Kirill Stepkin](https://www.npmjs.com/~kirillstyopkin)

[![npm](https://img.shields.io/npm/l/express.svg?maxAge=2592000)](https://github.com/kirillstepkin/chartify)
