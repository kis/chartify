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
	value: 5,				//Number
	title: '007 Spectre',	//String
	date: '20.11.2016'		//String
}];

let config = {
	theme: 'blue',			//String
	width: 50,				//Number	      
	height: 10,				//Number	
	box_size: 20,			//Number
	box_radius: 8,			//Number
	line: false,			//Boolean
	line_only: false,		//Boolean
	bordered: false,		//Boolean
	blink: false			//Boolean
};

<Chartify data={data} container="films-container" config={config} />
```

<h4>Data</h4>
Dataset should be an array of objects <b>[{value: 8, title: 'men in black', date: '12.03.2016'}]</b>. Keys are required and types are <b>{value: number, title: string, date: string}</b>.

<h4>Config</h4>
<b>theme</b> - is color scheme of the chart, "default", "blue", "grey", "white" etc.<br/>
<b>width</b> - is the length of the data array by X-axis. If width param is less than the length of the data array then user will see the last values of the data array.<br/>
<b>height</b> - is the length of the data by Y-axis.<br/>
<b>box_size</b> - is size of each box in pixels.<br/>
<b>box_radius</b> - is border radius of each box in pixels.<br/>
<b>line</b> - is param that determines if this is a line-chart.<br/>
<b>line_only</b> - is param that determines if we show only line on white background.<br/>
<b>bordered</b> - is param that determines if each box has top and left borders.<br/>
<b>blink</b> - is param that determines if the chart is blinking.<br/>

<h4>Container</h4>
Class that will be added to the chart container element. This is important in case you have more than one chart on your page.<br/><br/>

Heavily inspired by [kinopoisk.ru](https://www.kinopoisk.ru/) chart written using Adobe Flash.

<h3 align='center'>License</h3>

The MIT License (MIT) Copyright (c) 2017 Kirill Stepkin
