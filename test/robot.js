"use strict";

//GLOBAL CONFIG
var Config= require("../config.js");

var should = require("should");

var robot = require("../app/robot");
var parse = require("../app/parse");
var stateTransform = require("../app/states");

//ROBOT BEEN INIT WILL HAVE THE UPDATE FUNCTION AS STATE UPDATE FUNCTION OTHERWISE TAKE NULL
var stateUpdate=function () {
  return{
    update: function(params, states, errorMsg) {
      return Config.ROBOT_COMMAND.indexOf(params[0]) >=0 ? stateTransform.update(params, states) :null; 
      //return params[0] == "PLACE" ? stateTransform.update(params, states) :null; 
    },
    direction: stateTransform.direction 
  };
}

/**
 * @SINGLE COMMAND TEST
 */

//PUT OTHER COMMAND BEFORE INIT PLACE
//ISSUE REPORT WITHOUT INIT
describe("Issue REPORT before robot init place been issued", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var rob = robot.create(null, errorHandler);

  before(function(done) {
    rob.on("finish", function() { done(); });
    rob.end(["REPORT"]);
  });

  it("should call errorHandler", function() {
	  should(errorMsg).eql(Config.APP_ERROR_MESSAGE.INIT_PLACE_UNISSUED);
  });
});

//ISSUE MOVE WITHOUT INIT
describe("Issue MOVE before robot init place been issued", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var rob = robot.create(null, errorHandler);

  before(function(done) {
    rob.on("finish", function() { done(); });
    rob.end(["MOVE"]);
  });

  it("should call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.INIT_PLACE_UNISSUED);
  });
});

//ISSUE LEFT WITHOUT INIT
describe("Issue REPORT before robot init place been issued", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var rob = robot.create(null, errorHandler);

  before(function(done) {
    rob.on("finish", function() { done(); });
    rob.end(["LEFT"]);
  });

  it("should call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.INIT_PLACE_UNISSUED);
  });
});

//ISSUE RIGHT WITHOUT INIT
describe("Issue REPORT before robot init place been issued", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var rob = robot.create(null, errorHandler);

  before(function(done) {
    rob.on("finish", function() { done(); });
    rob.end(["RIGHT"]);
  });

  it("should call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.INIT_PLACE_UNISSUED);
  });
});

//ISSUE INVALID COMMAND WITHOUT INIT
//@THIS SHOULD NOT HAPPEN BECAUSE THE PARSE FILTER WILL FILTER INVALID COMMAND BEFORE ROBOT GET THE COMMAND
describe("Issue REPORT before robot init place been issued", function() {
  var errorMsg;
  var errorHandler = function (msg) { errorMsg=msg; };
  var rob = robot.create(null, errorHandler);

  before(function(done) {
    rob.on("finish", function() { done(); });
    rob.end(["TESTING"]);
  });

  it("should call errorHandler", function() {
    should(errorMsg).eql(Config.APP_ERROR_MESSAGE.INIT_PLACE_UNISSUED);
  });
});

/**
 * @MULTIPLE COMMAND TESTING AFTER INIT PLACED ROBOT
 */

//PUT OTHER COMMAND AFTER INIT PLACE 
//ISSUE REPORT AFTER INIT
describe("Issue REPORT after init placed", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 0, 0, "NORTH"]);
    rob.end(["REPORT"]);
  });

  it("should REPORT the position", function() {
    should(reportOutput).be.exactly("0,0,NORTH\n");
  });
});

//PUT OTHER COMMAND AFTER INIT PLACE THEN REPORT
//1) PLACE LEFT REPORT
describe("Issue REPORT after init placed and LEFT", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 0, 0, "NORTH"]);
    rob.write(["LEFT"]);
    rob.end(["REPORT"]);
  });

  it("should REPORT the position", function() {
    should(reportOutput).be.exactly("0,0,WEST\n");
  });
});

//2) PLACE RIGHT REPORT
describe("Issue REPORT after init placed and RIGHT", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 0, 0, "NORTH"]);
    rob.write(["RIGHT"]);
    rob.end(["REPORT"]);
  });

  it("should REPORT the position", function() {
    should(reportOutput).be.exactly("0,0,EAST\n");
  });
});

//3) PLACE RIGHT MOVE REPORT
describe("Issue REPORT after init placed and RIGHT", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 0, 0, "NORTH"]);
    rob.write(["RIGHT"]);
    rob.write(["MOVE"])
    rob.end(["REPORT"]);
  });

  it("should REPORT the position", function() {
    should(reportOutput).be.exactly("1,0,EAST\n");
  });
});

//4) PLACE LEFT MOVE REPORT
describe("Issue REPORT after init placed and RIGHT", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 2, 0, "NORTH"]);
    rob.write(["LEFT"]);
    rob.write(["MOVE"])
    rob.end(["REPORT"]);
  });

  it("should REPORT the position", function() {
    should(reportOutput).be.exactly("1,0,WEST\n");
  });
});

//AFTER INIT PLACE DO INVALID MOVEMENT
describe("Issue REPORT after init placed and INVALID MOVE", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 2, 0, "EAST"]);
    rob.write(["RIGHT"]);
    rob.write(["MOVE"])
    rob.end(["REPORT"]);
  });

  it("should REPORT the position", function() {
    should(reportOutput).be.exactly("2,0,SOUTH\n");
  });
});

//ISSUE INVALID COMMAND AFTER INIT STATE
//*THIS SHOULD NOT HAPPEN, THE INVALID COMMAND SHOULD BE FILTERED BY PARSER
describe("Issue invalid commands result in valid state", function() {
  var errorMsg = 0;
  var errorHandler = function (msg) { errorMsg=msg; };
  var testState=stateUpdate();
  var rob = robot.create(testState, errorHandler);

  before(function(done) {
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 0, 0, "WEST"]);
    rob.end(["TESTING"]);
  });

  it("should call errorHandler", function() {
    should(errorMsg).be.exactly(Config.APP_ERROR_MESSAGE.INVALID_COMMAND_OR_POSITION);
  });
});

//ISSUE INVALID COMMAND AFTER INIT STATE THEN REPORT
//*THIS SHOULD NOT HAPPEN, THE INVALID COMMAND SHOULD BE FILTERED BY PARSER
describe("Issue invalid commands result in invalid state (with REPORT)", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["PLACE", 0, 0, "WEST"]);
    rob.write(["TESTING"]);
    rob.end(["REPORT"]);
  });

  it("should ignore TESTING command", function() {
    should(reportOutput).be.exactly("0,0,WEST\n");
  });
});


//ISSUE INVALID COMMAND AFTER INIT STATE THEN REPORT
//*THIS SHOULD NOT HAPPEN, THE INVALID COMMAND SHOULD BE FILTERED BY PARSER
describe("Issue invalid commands before PLACE (with REPORT)", function() {
  var reportOutput;
  var testState=stateUpdate();
  var rob = robot.create(testState, function () { });

  before(function(done) {
    rob.on("readable", function() {
      reportOutput = rob.read();
    });
    rob.on("finish", function() { done(); });
    rob.write(["TESTING"]);
    rob.write(["PLACE", 0, 0, "WEST"]);
    rob.end(["REPORT"]);
  });

  it("should ignore TESTING", function() {
    should(reportOutput).be.exactly("0,0,WEST\n");
  });
});