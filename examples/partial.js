var bigote = require('..');

var source= "{{#peeps}}{{>replace}}{{/peeps}}";
var context={ peeps: [{name: "Moe", count: 15}, {name: "Larry", count: 5}, {name: "Curly", count: 1}] };
var partials={ replace: "Hello {{name}}! You have {{count}} new messages." };

var tmpl = bigote.load(source, partials);
console.log(JSON.stringify(tmpl));
var total=0;
var n=100;
var loops=5000;
// lets benchmark 'n' times with loops
for(var b=0;b<n;b++) {
  var start = +new Date();
  var result;
  for(var i=0;i<loops;i++) {
    result = bigote.render(tmpl, context);
  }
  var end = +new Date();
  total += (end-start);
}
total=total==0?1:total;
console.log("Average ops/msec " + ((n*loops)/total));
console.log(result);
