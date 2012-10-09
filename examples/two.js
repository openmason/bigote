var bigote = require('..');

var context =
{
  "person": true
};
var tmpl = bigote.load("Shown.\n"
                       + "{{#nothin}}"
                       + "  Never shown!\n"
                       + "{{/nothin}}");

console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
