var PEG = require("pegjs");
var bigote = require('..');

var context = {
  name:'A',
  value:23
};
var tmpla = bigote.parse("Hello {{name}} You have just won ${{value}}!");
var start = +new Date();
var result;
for(var i=0;i<2000;i++) {
  context.value=i;
  result = bigote.evaluate(tmpla, context);
}
var end = +new Date();
console.log("2000 ops in " + (end-start) + " ms");
console.log(result);
