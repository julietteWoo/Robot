"use strict";

//GLOBAL CONFIG
var Config= require("../config.js");

var MIN_SCALE = 0;
var MAX_SCALE = 4;

//CONST
//Setup direction line list
var direction=module.exports.direction=Config.ROBOT_DIRECTION

var commands = {
	'PLACE': function(params, state) {
		return {
			x: params[0],
			y: params[1],
			direction: direction.indexOf(params[2])
		};
	},
	'MOVE': function(params, state) {
		switch(state.direction) {
			case 0: 
				return {
					x: state.x + 1,
					y: state.y,
					direction: state.direction
				};
			case 1: 
				return {
					x: state.x,
					y: state.y - 1,
					direction: state.direction
				};
			case 2: 
				return {
					x: state.x - 1,
					y: state.y,
					direction: state.direction
				};
			case 3: 
				return {
					x: state.x,
					y: state.y + 1,
					direction: state.direction
				};
		}
	},
	'LEFT': function(params, state) {
		return {
			x: state.x,
			y: state.y,
			direction: state.direction == 0? 3:state.direction-1
		};
	},
	'RIGHT': function(params, state) {
		return {
			x: state.x,
			y: state.y,
			direction: state.direction == 3? 0:state.direction+1
		};
	}
};

var validateEndState = function(state) {
	return state &&
		   state.x >= MIN_SCALE &&
		   state.x <= MAX_SCALE &&
		   state.y >= MIN_SCALE &&
		   state.y <= MAX_SCALE ? state : null;
}

module.exports.update = function(params, state, errorMsg) {
	var command = commands[params[0]];
	
	if (!command) {
		errorMsg(Config.APP_ERROR_MESSAGE.COMMAND_NOT_INNIT);
		return null;
	}
	
	//IF THE NEW POSITION WILL OUT OF BOUNDRY
	return validateEndState(command(params.slice(1), state));
};
