var tape = require("tape"),
    d3 = require("../");

tape("d3.ellipseForce() has the expected defaults", function(test) {
  var force = d3.ellipseForce();
  test.equal(force.padding()(), 4);
  test.equal(force.innerRepulsion(), 0.5);
  test.equal(force.outerRepulsion(), 0.5);
  test.end();
});

tape("d3.ellipseForce().padding can be changed", function(test) {
  var force = d3.ellipseForce();
  force.padding(7);
  test.equal(force.padding()(), 7);
  test.end();
});

tape("d3.ellipseForce().innerRepulsion can be changed", function(test) {
  var force = d3.ellipseForce();
  force.innerRepulsion(0.8);
  test.equal(force.innerRepulsion(), 0.8);
  test.end();
});

tape("d3.ellipseForce().outerRepulsion can be changed", function(test) {
  var force = d3.ellipseForce();
  force.outerRepulsion(0.7);
  test.equal(force.outerRepulsion(), 0.7);
  test.end();
});

tape("d3.ellipseForce().force doesn't crash and burn", function(test) {
  var force = d3.ellipseForce();
  force.initialize([]);
  force(0.5); // some alpha
  test.end();
});

