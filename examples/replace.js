var PEG = require("pegjs");
var bigote = require('..');

var source= "Hello {{name}}! You have {{count}} new messages.";
var context = { name: "Mick", count: 30 };

var tmpl = bigote.parse(source);
//console.log(tmpl);
var n=100;
var total=0;
// lets benchmark 'n' times with 5000 loops
for(var b=0;b<n;b++) {
  var start = +new Date();
  var result;
  for(var i=0;i<5000;i++) {
    result = bigote.evaluate(tmpl, context);
  }
  var end = +new Date();
  total += (end-start);
  //console.log("5000 ops in " + (end-start) + " ms");
}
console.log("Average ops/msec " + ((n*5000)/total));
console.log(result);
