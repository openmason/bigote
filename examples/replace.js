var bigote = require('..');

var source= "Hello {{name}}! You have {{count}} new messages.";
var context = { name: "Mick", count: 30 };

var tmpl = bigote.load(source);
console.log(JSON.stringify(tmpl));
var fn = bigote.translate(tmpl);

var n=100;
var total=0;
var loops=5000;
// lets benchmark 'n' times with 5000 loops
for(var b=0;b<n;b++) {
  var start = +new Date();
  var result;
  for(var i=0;i<loops;i++) {
    result = bigote.render(tmpl, context);
    //result = fn(context);
  }
  var end = +new Date();
  total += (end-start);
  //console.log("5000 ops in " + (end-start) + " ms");
}
console.log("Average ops/msec " + ((n*loops)/total));
console.log(result);
