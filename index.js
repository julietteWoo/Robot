"use strict";

var commandParse = require('./app/parse');
var	robot = require('./app/robot');
var state = require('./app/states');
var LineStream = require('byline').LineStream;

var errorHandler = function(msg) { 
	/* Ignore invalid commands */ 
};
var	lineStream = new LineStream();
	
process.stdin.pipe(lineStream)
			 .pipe(commandParse.create(errorHandler))
			 .pipe(robot.create(state, errorHandler))
			 .pipe(process.stdout);