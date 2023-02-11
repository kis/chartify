# Chartify

This is a React.js plugin for creating and visualizing data in chart format. 

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
npm package is [here](https://www.npmjs.com/package/chartify).


## Prerequisites
Before installing the Chartify package, make sure that you have a recent version of Node.js installed on your system.

Install Node.js [here](https://nodejs.org/en/)



## Installation
To install the Chartify package, you can use the following command in your terminal:

```
npm install chartify --save-dev

```
The above command installs the Chartify package and adds it as a dev dependency in your project. The "--save-dev" option indicates that the package is only required for development purposes and should not be included in the final production build.



## Integrating Chartify into an existing project
To integrate the Chartify library into an existing project, you will need to import it into your project and create a data array with objects that represent each data point.

Here is a code snippet to get you started:
 
```javascript
import Chartify from 'chartify';

const data = [{
xValue: '20.11.2016',
yValue: 5,
title: '007 Spectre'
}];

const config = {
theme: 'blue',
width: 50,
height: 10,
boxSize: 20,
isLineChart: false,
bordered: false
};

<Chartify 
 data={data} 
 container="films-container" 
 config={config} 
/>

```

The `data` array should contain objects that have three key-value pairs: `xValue`, `yValue`, and `title`. `xValue` and `yValue` should be of type `string` and `number`, respectively.

The `container` prop is a class that will be added to the chart container element. This is important in case you have more than one chart on your page.

The `config` prop is an object with properties that allow you to configure the look and feel of the chart. The properties include `theme`, `width`, `height`, `boxSize`, `isLineChart`, and `bordered`. You can choose the color scheme of the chart ("default", "blue", "grey","white", etc.), set the width ( length of X-axis) and height ( length of Y-axis) of the chart, specify the size of each box in pixels, determine if the chart is a line chart or not, and whether or not each box should have a border.



## License
The Chartify project is released under the MIT License, which means that it is open-source and free to use. If you have any questions or would like to contribute to the project, you can visit the repository on Github.

