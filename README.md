<h1 align='center'>Chartify</h1>

<p align='center'>React.js plugin for building animated draggable and customizable charts.</p>
[![NPM Version](https://img.shields.io/npm/v/chartify.svg?style=flat-square)](https://www.npmjs.com/package/chartify) [![Download Month](https://img.shields.io/npm/dm/chartify.svg?style=flat-square)](https://www.npmjs.com/package/chartify) [![Download Total](https://img.shields.io/npm/dt/chartify.svg?style=flat-square)](https://www.npmjs.com/package/chartify) [![Travis branch](https://img.shields.io/travis/kiqs/chartify/master.svg?style=flat-square)](https://github.com/kiqs/chartify)

![alt text](https://raw.githubusercontent.com/kiqs/chartify/master/img/newprev.gif)

The source for this module is in the [main repo](https://github.com/kiqs/chartify). Please contribute.

Check the [EXAMPLE](https://kiqs.github.io/chartify/example/)

### Install

```
npm install chartify
```

### Getting started

```javascript
import Chartify from 'chartify';

let data = [{
	value: 5,
	title: '007 Spectre',
	date: '20.11.2016'
}];

let config = {
	theme: 'blue',
	width: 50,				      
	height: 10,
	box_size: 20,
	box_radius: 8,
	line: false,
	line_only: false,
	bordered: false,
	blink: false
};

<Chartify data={data} config={config} />
```

* **data** - is an array of objects [{value: 8, title: 'men in black', date: '12.03.2016'}]. This is the dataset of the chart.
* **width** - is the horizontal length of the data array. If width param is less than the length of the data array then user will see the last values of the data array.
* **height** - is the vertical length.
* **box_size** - is size of each box in pixels.
* **box_radius** - is border radius of each box in pixels.
* **blink** - is param that determines if the chart is blinking.
* **bordered** - is param that determines if each box has top and left borders.
* **line** - is param that determines if this is a line-chart.
* **line_only** - is param that determines if we show only line on white background.
* **theme** - is color scheme of the chart, "default", "blue", "grey", "white" etc.

Heavily inspired by [kinopoisk.ru](https://www.kinopoisk.ru/) chart written using Adobe Flash.

### License

The MIT License (MIT) Copyright (c) 2017 Kirill Stepkin
