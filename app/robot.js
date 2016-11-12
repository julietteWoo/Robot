"use strict";

//GLOBAL CONFIG
var Config= require("../config.js");

var Stream = require('stream');

module.exports.create = function (stateTransform, errorHandler) {
	var state = null;

	//handle data line by line
	var commandStream = new Stream.Transform({ objectMode: true });

	//called every time get input data
	commandStream._transform = function(params, enc, done) {

		//ANY OTHER COMMAND BEFORE INIT BY PLACE
		if (!state && params[0] != 'PLACE') {
			errorHandler(Config.APP_ERROR_MESSAGE.INIT_PLACE_UNISSUED);
			return done();
		}
		
		//REPORT AFTER PLACE INIT
		if (state && params[0] == 'REPORT') {
			commandStream.push(state.x + "," + state.y + "," + stateTransform.direction[state.direction] + "\n");
			return done();
		}
		
		//UPDATE NEW STATE
		var newState = stateTransform.update(params, state, errorHandler);

		//IF UPDATE IS NOT SUCCESSFUL
		if (!newState) {
			errorHandler(Config.APP_ERROR_MESSAGE.INVALID_COMMAND_OR_POSITION);
			return done();
		}

		state = newState;

		done();
	}
	return commandStream;
}
