var _ = require("lodash");
// Test

var myTestObj = {
  a: 1,
  b: 2,
  c: 3,
  hello: {
    en: "hello",
    ru: "привет"
  },
  world: {
    en: "world",
    ru: "мир"
  }
};

var GreetEn = `${myTestObj.hello.en} ${myTestObj.world.en}!`;
var GreetRu = `${myTestObj.hello.ru}, ${myTestObj.world.ru}!`;


var myTestFunc = function(one=1, two="testfunc", three=[1,2,3,4], four=[20, 30, 40, 50]) {
  for (let i = 0; i < three.length; i++) {
    three[i]  =`${three[i]}, ${one}, ${two}`;
  }
  console.log(three);

  _.each(four, (elem) => console.log(elem+5));
};

window.onload = function() {
  console.log("Hello from babel!");
  console.log(GreetEn);
  console.log(GreetRu);
  myTestFunc();
};