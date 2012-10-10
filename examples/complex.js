var bigote = require('..');

var source = "<h1>{{header}}</h1>"
             + "{{#hasItems}}"
             + "<ul>"
             + "{{#items}}"
             +    "{{#current}}" +
                    "<li><strong>{{name}}</strong></li>"
             +    "{{/current}}"
             +    "{{^current}}" +
                     "<li><a href=\"{{url}}\">{{name}}</a></li>"
                 + "{{/current}}" +
               "{{/items}}"
             + "</ul>"
             + "{{/hasItems}}"
             + "{{^hasItems}}"
             + "<p>The list is empty.</p>"
             + "{{/hasItems}}";

var context= {
               header: function() {
                 return "Colors";
               },
               items: [
                 {name: "red", current: true, url: "#Red"},
                 {name: "green", current: false, url: "#Green"},
                 {name: "blue", current: false, url: "#Blue"}
               ],
               hasItems: function() {
                 return this.items.length !== 0;
               },
               empty: function() {
                 return this.items.length === 0;
               }
             };

var tmpl = bigote.load(source);
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
