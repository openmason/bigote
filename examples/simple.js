var bigote = require('..');

var context = {
  name:'A',
  value:23
};
var tmpla = bigote.load("Hello {{name}} You have just won ${{value}}!");
console.log(JSON.stringify(tmpla));
var result = bigote.render(tmpla, context);
console.log(result);
