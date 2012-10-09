var bigote = require('..');

var context =
{
};

var tmpl = bigote.load("<h1>Today{{! ignore me }}.</h1>");

console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
