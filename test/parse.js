"use strict";

/**
  * parse is for filter invalid command
  */
var Config= require("../config.js");

var should = require("should");

var parse = require("../app/parse.js");
var Stream = require("stream");

//COMMAND FAIL TEST
//INVALID COMMAND
describe("Input invalid command", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("HELLO");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"HELLO");
  });
});

//INVALID COMMAND ONLY PLACE
describe("Input invalid command PLACE with no parameters", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("PLACE");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"PLACE");
  });
});

//INVALID COMMAND PLACE MISSING DIRECTION
describe("Input invalid command PLACE with no DIRECTION", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("PLACE 2,4,");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"PLACE 2,4,");
  });
});

//INVALID COMMAND PLACE MISSING DIRECTION and Y position
describe("Input invalid command PLACE with one parameter", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("PLACE 3");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"PLACE 3");
  });
});

//PLACE COMMAND and INVALID DIRECTION
describe("Input PLACE with invalid direction", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("PLACE 1,3,NORTHWEST");
  });

  it("call errorHandler", function() {
	  should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"PLACE 1,3,NORTHWEST" );
  });
});

//REPORT with redundant parameters
describe("Input REPORT with other parameters (NUMBER)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("REPORT 9");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"REPORT 9" );
  });
});

//REPORT with redundant parameters
describe("Input REPORT with other parameters (STRING)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("REPORT hello");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"REPORT hello" );
  });
});

//RIGHT with redundant parameters
describe("Input MOVE with other parameters (NUMBER)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("RIGHT 9,9");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"RIGHT 9,9" );
  });
});

//RIGHT with redundant parameters
describe("Input MOVE with other parameters (STRING)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("RIGHT hi");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"RIGHT hi" );
  });
});

//MOVE with redundant parameters
describe("Input MOVE with other parameters (NUMBER)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("MOVE 92");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"MOVE 92" );
  });
});

//MOVE with redundant parameters
describe("Input MOVE with other parameters (STRING)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("MOVE FORWARD");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID+"MOVE FORWARD" );
  });
});

//LEFT with redundant parameters
describe("Input LEFT with other parameters (NUMBER)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("LEFT,  3, ,5");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID +"LEFT,  3, ,5" );
  });
});

//LEFT with redundant parameters
describe("Input LEFT with other parameters (STRING)", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var parser = parse.create(errorHandler);

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.end("LEFT,  astro");
  });

  it("call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.COMMAND_NOT_VALID +"LEFT,  astro" );
  });
});

//COMMAND PASS TEST
//test PLACE command
describe("Input PLACE command", function() {
  var actualOutput;
  var parser = parse.create();

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.on("readable", function() {
      actualOutput = parser.read();
    });
    parser.end("PLACE 1,3,NORTH");
  });

  it("pass parse", function() {
	  should(actualOutput).eql(["PLACE", 1, 3, "NORTH"]);
  });
});

//test MOVE command
describe("Input MOVE command", function() {
  var actualOutput;
  var parser = parse.create();

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.on("readable", function() {
      actualOutput = parser.read();
    });
    parser.end("MOVE"); 
  });

  it("pass parse", function() {
	  should(actualOutput).eql(["MOVE", null, null, null]);
  });
});

//test LEFT command
describe("Input LEFT command", function() {
  var actualOutput;
  var parser = parse.create();

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.on("readable", function() {
      actualOutput = parser.read();
    });
    parser.end("LEFT");
  });

  it("pass parse", function() {
	  should(actualOutput).eql(["LEFT", null, null, null]);
  });
});

//gets RIGHT command
describe("Input RIGHT command", function() {
  var actualOutput;
  var parser = parse.create();

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.on("readable", function() {
      actualOutput = parser.read();
    });
    parser.end("RIGHT");
  });

  it("pass parse", function() {
	  should(actualOutput).eql(["RIGHT", null, null, null]);
  });
});

//rest REPORT command
describe("Input REPORT command", function() {
  var actualOutput;
  var parser = parse.create();

  before(function(done) {
    parser.on("finish", function() { done(); });
    parser.on("readable", function() {
      actualOutput = parser.read();
    });
    parser.end("REPORT");
  });

  it("pass parse", function() {
	  should(actualOutput).eql(["REPORT", null, null, null]);
  });
});