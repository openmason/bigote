var bigote = require('..');

var source="{{#filter}}foo {{bar}}{{/filter}}";
var context= {
  filter: function() {
    return function(text, render) {
      return render(text).toUpperCase();
    };
  },
  bar: "bar"
};

var tmpl = bigote.parse(source);
console.log(tmpl);
var total=0;
var n=1;
var loops=1;
// lets benchmark 'n' times with loops
for(var b=0;b<n;b++) {
  var start = +new Date();
  var result;
  for(var i=0;i<loops;i++) {
    result = bigote.evaluate(tmpl, context);
  }
  var end = +new Date();
  total += (end-start);
}
total=total==0?1:total;
console.log("Average ops/msec " + ((n*loops)/total));
console.log(result);
