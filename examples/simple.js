var bigote = require('..');

var context = {
  name:'A',
  value:23
};
var tmpla = bigote.parse("Hello {{name}} You have just won ${{value}}!");
console.log(tmpla);
var result = bigote.evaluate(tmpla, context);
console.log(result);
