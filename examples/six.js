var bigote = require('..');

var context =
{
  "repo": []
};

var tmpl = bigote.parse("{{#repo}}"
                        + "  <b>{{name}}</b>"
                        + "{{/repo}}"
                        + "{{^repo}}"
                        + "  No repos :("
                        + "{{/repo}}");

console.log(JSON.stringify(tmpl));
var result = bigote.evaluate(tmpl, context);
console.log(result);
