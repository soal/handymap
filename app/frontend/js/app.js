
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

window.onload = function() {
  console.log("Hello from babel!");
  console.log(GreetEn);
  console.log(GreetRu);
};
