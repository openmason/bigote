var PEG = require("pegjs");
var bigote = require('..');

var context = {
  name:'A',
  value:23
};
var tmpla = bigote.parse("Hello {{name}} You have just won ${{value}}!");
var result = bigote.evaluate(tmpla, context);
console.log(result);
