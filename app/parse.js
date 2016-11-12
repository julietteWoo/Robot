"use strict";

//GLOBAL CONFIG
var Config= require("../config.js");

//CONST
//Setup commond line list
var commands = Config.ROBOT_COMMAND;
//Setup direction list
var direction = Config.ROBOT_DIRECTION;

//parse format strings
var scanf = require('scanf').sscanf;
var Stream = require('stream');

/**
 * PARSER
 * @param {errorHandler} callback function for error check
 * FIRST FILTER TO ELIMINATE INVALID COMMAND AND DIRECTION 
 * (filter command and direction not listed)
 */
module.exports.create = function(errorHandler) {
	//handle data line by line
	var commandLine = new Stream.Transform({ objectMode: true });

	//called every time get input data
	commandLine._transform = function(chunk, encoding, done) {
		var data = (Buffer.isBuffer(chunk)) ? chunk.toString('utf8') : chunk;
		//parse format input
		var params = scanf(data, '%s %d,%d,%s');
		var commandIndex = commands.indexOf(params[0]);

		//@PLACE COMMAND SYNTAX CHECK

		//ONLY CHECK THE VALID COMMAND
		//IF NOT IN THE FOLLOWING TWO CASE THEN IGNORE THE COMMAND
		/**
		 *	@COMMAND START WITH PLACE WITH VALID DIRECTION *leave the number(x,y) variable validate in state
		 *	@COMMAND START WITH MOVE, LEFT, RIGHT, REPORT and DO NOT HAVE OTHER PARAMETERS
		 */
		if (!((commandIndex == 0 && direction.indexOf(params[3]) >= 0)||(commandIndex > 0 && params[1]==null))) {
			errorHandler(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID + data);
			return done();
		}

		commandLine.push(params);
		done();
	};
	return commandLine;
};