<h1 align='center'>Chartify</h1>

<p align='center'>React.js plugin for building customizable charts. <a target="_blank" href="https://kis.github.io/chartify/example/">Demo</a></p>

<p align='center'>
	<a href='https://www.npmjs.com/package/chartify'><img src="https://img.shields.io/npm/v/chartify.svg?style=flat-square" alt=""></a>
	<a href='https://www.npmjs.com/package/chartify'><img src='https://img.shields.io/npm/dm/chartify.svg?style=flat-square' /></a>
	<a href='https://www.npmjs.com/package/chartify'><img src='https://img.shields.io/npm/dt/chartify.svg?style=flat-square' /></a>
	<a href='https://github.com/kis/chartify'><img src='https://img.shields.io/travis/kis/chartify/master.svg?style=flat-square' /></a>
    <a href='https://coveralls.io/github/kis/chartify?branch=master'><img src='https://coveralls.io/repos/github/kis/chartify/badge.svg?branch=master' alt='Coverage Status' /></a>
</p>

![alt text](https://raw.githubusercontent.com/kis/chartify/master/blocks.jpg)

The source for this module is in the [main repo](https://github.com/kis/chartify).  
Example app is [here](https://github.com/kis/chartify/tree/master/example).  
Backend service for the example app is [here](https://github.com/kis/chartify-service).

<h3 align='center'>Install</h3>

```
npm install chartify --save-dev
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

<Chartify 
    data={data} 
    container="films-container" 
    config={config} 
/>
```

<h3 align='center'>Passing props</h3>

Data prop is a dataset that should be an array of objects:    
<b>[{ x_value: '12.03.2016', y_value: 8, title: 'men in black' }]</b>  

Keys are required and types are:  
<b>{ x_value: string, y_value: number, title: string }</b>  

Container prop is a class that will be added to the chart container element. This is important in case you have more than one chart on your page.   

Config prop is an object with properties:  
<b>theme</b>:<i>string</i> - is color scheme of the chart, <i>"default", "blue", "grey", "white"</i> etc.<br/>
<b>width</b>:<i>number</i> - is the length of the data array by X-axis.<br/>
<b>height</b>:<i>number</i> - is the length of the data by Y-axis.<br/>
<b>box_size</b>:<i>number</i> - is size of each box in pixels.<br/>
<b>box_radius</b>:<i>number</i> - is border radius of each box in pixels.<br/>
<b>line</b>:<i>boolean</i> - is param that determines if this is a line-chart.<br/>
<b>line_only</b>:<i>boolean</i> - is param that determines if we show only line on white background.<br/>
<b>bordered</b>:<i>boolean</i> - is param that determines if each box has white borders.<br/>
<b>blink</b>:<i>boolean</i> - is param that determines if the chart is blinking.<br/>  

<h3 align='center'>License</h3>

The MIT License (MIT) Copyright (c) 2017
