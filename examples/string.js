var bigote = require('..');

var source="Hello World!";
var context = {};

var tmpl = bigote.load(source);
console.log(JSON.stringify(tmpl));
var fn = bigote.translate(tmpl);
var n=100;
var total=0;
// lets benchmark 10 times with 5000 loops
for(var b=0;b<n;b++) {
  var start = +new Date();
  var result;
  for(var i=0;i<5000;i++) {
    result = bigote.render(tmpl, context);
    //result = fn(context);
  }
  var end = +new Date();
  total += (end-start);
  //console.log("5000 ops in " + (end-start) + " ms");
}
console.log("Average ops/msec " + ((n*5000)/total) + ' / ops: ' + (n*5000) + ' time(ms):'+total);
console.log(result);
