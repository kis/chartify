<h1 align='center'>Chartify</h1>

<p align='center'>React.js plugin for building animated draggable and customizable charts.</p>

<p align='center'>
	<a href='https://www.npmjs.com/package/chartify'><img src="https://img.shields.io/npm/v/chartify.svg?style=flat-square" alt=""></a>
	<a href='https://www.npmjs.com/package/chartify'><img src='https://img.shields.io/npm/dm/chartify.svg?style=flat-square' /></a>
	<a href='https://www.npmjs.com/package/chartify'><img src='https://img.shields.io/npm/dt/chartify.svg?style=flat-square' /></a>
	<a href='https://github.com/kiqs/chartify'><img src='https://img.shields.io/travis/kiqs/chartify/master.svg?style=flat-square' /></a>
</p>

![alt text](https://raw.githubusercontent.com/kiqs/chartify/master/img/newprev.gif)

The source for this module is in the [main repo](https://github.com/kiqs/chartify). Please contribute.

Check the [EXAMPLE](https://kiqs.github.io/chartify/example/)

<h3 align='center'>Install</h3>

```
npm install chartify
```

<h3 align='center'>Getting started</h3>

```javascript
import Chartify from 'chartify';

let data = [{
	x_value: '20.11.2016',
	y_value: 5,				
	title: '007 Spectre'	
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

<Chartify data={data} container="films-container" config={config} />
```

<h3 align='center'>Data</h3>

Dataset should be an array of objects <b>[{ x_value: '12.03.2016', y_value: 8, title: 'men in black' }]</b>. Keys are required and types are <b>{ x_value: string, y_value: number, title: string }</b>.

<h3 align='center'>Config</h3>

<b>theme</b> - is color scheme of the chart, "default", "blue", "grey", "white" etc. Type: string.<br/>
<b>width</b> - is the length of the data array by X-axis. If width param is less than the length of the data array then user will see the last values of the data array. Type: number.<br/>
<b>height</b> - is the length of the data by Y-axis. Type: number.<br/>
<b>box_size</b> - is size of each box in pixels. Type: number.<br/>
<b>box_radius</b> - is border radius of each box in pixels. Type: number.<br/>
<b>line</b> - is param that determines if this is a line-chart. Type: boolean.<br/>
<b>line_only</b> - is param that determines if we show only line on white background. Type: boolean.<br/>
<b>bordered</b> - is param that determines if each box has top and left borders. Type: boolean.<br/>
<b>blink</b> - is param that determines if the chart is blinking. Type: boolean.<br/>

<h3 align='center'>Container</h3>

Class that will be added to the chart container element. This is important in case you have more than one chart on your page.<br/><br/>

Heavily inspired by [kinopoisk.ru](https://www.kinopoisk.ru/) chart written using Adobe Flash.

<h3 align='center'>License</h3>

The MIT License (MIT) Copyright (c) 2017
Author: Kirill Stepkin
