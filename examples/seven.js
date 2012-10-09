var bigote = require('..');

var context =
{
};

var tmpl = bigote.parse("<h1>Today{{! ignore me }}.</h1>");

console.log(JSON.stringify(tmpl));
var result = bigote.evaluate(tmpl, context);
console.log(result);
