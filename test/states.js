"use strict";

var should = require("should");
var states = require("../app/states.js");

//failed/ignore case
//INIT INVALID PLACE WITH ALFABET
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", "a", "b", "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT INVALID PLACE WITH MIX NUMBER ALFABET (number,alphabet)
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 5, "b", "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT INVALID PLACE WITH MIX NUMBER ALFABET (number,alphabet)
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 2, "b", "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT INVALID PLACE WITH MIX NUMBER ALFABET (alphabet,number)
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", "a", 7, "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT INVALID PLACE WITH MIX NUMBER ALFABET (alphabet,number)
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", "a", 2, "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry NORTH
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 0, 5, "WEST"], null);
    done();
  });

  it("return null", function() {
	  should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry WEST
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", -1, 3, "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry EAST
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 5, 2, "NORTH"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry SOUTH
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 3, -3, "NORTH"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry SOUTHWEST
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", -1, -3, "NORTH"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry SOUTHEAST
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 5, -5, "WEST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry NORTHEAST
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 5, 5, "EAST"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//INIT PLACE outside boundry NORTHWEST
describe("PLACE on invalid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", -1, 5, "NORTH"], null);
    done();
  });

  it("return null", function() {
    should(actualOutput == null).be.true;
  });
});

//MOVE outside boundry left(west) side
describe("MOVE outside boundry (x < 0 )", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["MOVE"], {
      x: 0,
      y: 3,
      direction: 2 //WEST
    });
    done();
  });

  it("return null", function() {
	  should(actualOutput == null).be.true;
  });
});

//MOVE outside boundry right(east) side
describe("MOVE outside boundry (x > 4)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["MOVE"], {
      x: 4,
      y: 0,
      direction: 0 //EAST
    });
    done();
  });

  it("return null", function() {
	  should(actualOutput == null).be.true;
  });
});

//MOVE outside boundry bottom(south) side
describe("MOVE outside boundry (y < 0)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["MOVE"], {
      x: 0,
      y: 0,
      direction: 1 //SOUTH
    });
    done();
  });

  it("return null", function() {
	  should(actualOutput == null).be.true;
  });
});

//MOVE outside boundry top(north) side
describe("MOVE outside boundry (y > 4)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["MOVE"], {
      x: 0,
      y: 4,
      direction: 3 //NORTH
    });
    done();
  });

  it("return null", function() {
	  should(actualOutput == null).be.true;
  });
});

//successful case
//PLACE
describe("PLACE in a valid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["PLACE", 0, 2, "WEST"], null);
    done();
  });

  it("should be fine", function() {
    should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 0,y: 2,direction: 2}));
  });
});

//MOVE
describe("MOVE to a valid place", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["MOVE"], {
      x: 0,
      y: 0,
      direction: 3 //NORTH y+1
    });
    done();
  });

  it("should be fine", function() {
	  should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 0,y: 1,direction: 3}));
  });
});

//EAST ->NORTH 
describe("Turn LEFT(EAST ->NORTH)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["LEFT"], {
      x: 1,
      y: 1,
      direction: 0 //EAST
    });
    done();
  });

  it("should be fine", function() {
	  should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 1,y: 1,direction: 3}));
  });  
});

//SOUTH ->EAST
describe("Turn LEFT(SOUTH ->EAST)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["LEFT"], {
      x: 1,
      y: 1,
      direction: 1 //SOUTH
    });
    done();
  });

  it("should be fine", function() {
    should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 1,y: 1,direction: 0}));
  });  
});

//NORTH ->EAST
describe("Turn RIGHT(NORTH ->EAST)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["RIGHT"], {
      x: 0,
      y: 1,
      direction: 3 //NORTH
    });
    done();
  });

  it("should be fine", function() {
	  should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 0,y: 1,direction: 0}));
  }); 
});

//SOUTH ->WEST
describe("Turn RIGHT(SOUTH ->WEST)", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["RIGHT"], {
      x: 0,
      y: 1,
      direction: 1 //SOUTH
    });
    done();
  });

  it("should be fine", function() {
    should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 0,y: 1,direction: 2}));
  }); 
});

//WEST: ->SOUTH ->EAST
describe("Turn LEFT 2 times", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["LEFT"], {
      x: 0,
      y: 0,
      direction: 2 //WEST
    });
    actualOutput = states.update(["LEFT"], actualOutput);
    done();
  });

  it("should be fine", function() {
	  should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 0,y: 0,direction: 0}));
  }); 
});

//WEST: ->SOUTH ->EAST
describe("Turn RIGHT 2 times", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["RIGHT"], {
      x: 0,
      y: 0,
      direction: 2 //WEST
    });
    actualOutput = states.update(["RIGHT"], actualOutput);
    done();
  });

  it("should be fine", function() {
    should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x: 0,y: 0,direction: 0}));
  }); 
});

//NORTH: ->WEST ->SOUTH ->EAST
describe("Turn RIGHT 3 times", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["RIGHT"], {
      x: 0,
      y: 0,
      direction: 3 //NORTH
    });
    actualOutput = states.update(["RIGHT"], actualOutput);
    actualOutput = states.update(["RIGHT"], actualOutput);
    done();
  });

  it("should be fine", function() {
   should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x:0,y:0,direction:2}));
  }); 
});

//NORTH: ->WEST ->SOUTH ->EAST
describe("Turn LEFT 3 times", function() {
  var actualOutput;

  before(function(done) {
    actualOutput = states.update(["LEFT"], {
      x: 0,
      y: 0,
      direction: 3 //NORTH
    });
    actualOutput = states.update(["LEFT"], actualOutput);
    actualOutput = states.update(["LEFT"], actualOutput);
    done();
  });

  it("should be fine", function() {
   should(JSON.stringify(actualOutput)).be.equal(JSON.stringify({x:0,y:0,direction:0}));
  }); 
});