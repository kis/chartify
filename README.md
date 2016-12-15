# Chartify [![NPM Version](https://img.shields.io/npm/v/chartify.svg?style=flat-square)](https://www.npmjs.com/package/chartify) [![Download Month](https://img.shields.io/npm/dm/chartify.svg?style=flat-square)](https://www.npmjs.com/package/chartify) [![Download Total](https://img.shields.io/npm/dt/chartify.svg?style=flat-square)](https://www.npmjs.com/package/chartify) [![Travis branch](https://img.shields.io/travis/kiqs/chartify/master.svg?style=flat-square)](https://github.com/kiqs/chartify)

![alt text](https://raw.githubusercontent.com/kiqs/chartify/master/img/preview1.gif)

Simple, lightweight React.js plugin for building animated draggable charts. The source for this module is in the [main repo](https://github.com/kiqs/chartify). Please contribute. Check [angular-scale](https://github.com/kiqs/scale) if you're using Angular.js. And [jquery-linechart](https://github.com/kiqs/jquery-linechart) if you're using JQuery.

Check the [EXAMPLE](https://kiqs.github.io/chartify/example/)

### Install

```
npm install chartify
```

### Getting started

```javascript
import Chartify from 'chartify';
```

```javascript
<Chartify data = {this.items}
		  width = {50} 
	      height = {10}
	      boxSize = {16}
	      boxRadius = {10}
	      bordered = {true}
	      blink = {true}
	      line = {true}
	      lineOnly = {true}
	      theme = {"purple"} />
```

* **data** is an array of objects [{value: 8, title: 'men in black', date: '12.03.2016'}]. This is the dataset of the chart.
* **width** is the horizontal length of the data array. If width param is less than the length of the data array then user will see the last values of the data array.
* **height** is the vertical length.
* **boxSize** is size of each box in pixels.
* **boxRadius** is border radius of each box in pixels.
* **blink** is param that determines if the chart is blinking.
* **bordered** is param that determines if each box has top and left borders.
* **line** is param that determines if this is a line-chart.
* **lineOnly** is param that determines if we show only line on white background.
* **theme** is color scheme of the chart, "default", "purple", "grey", "white" etc.

Heavily inspired by [kinopoisk.ru](https://www.kinopoisk.ru/) chart written using Adobe Flash.

### License

The MIT License (MIT) Copyright (c) 2016 Kirill Stepkin
