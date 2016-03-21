var app  = require("../../handymap/frontend/js/app");

describe("app.testFunctionForTest", function() {
  it("app.testFunctionForTest видима", function() {
    expect(app.testFunctionForTest).toBeDefined();
  });

  var expected = Math.pow(2, 3);
  var result = app.testFunctionForTest(2, 3);
  it("при возведении " + 2 + " в степень 3 результат: " + expected, function() {
    expect(result).toEqual(expected);
  });
});