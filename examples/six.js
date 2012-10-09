var bigote = require('..');

var context =
{
  "repo": []
};

var tmpl = bigote.load("{{#repo}}"
                       + "  <b>{{name}}</b>"
                       + "{{/repo}}"
                       + "{{^repo}}"
                       + "  No repos :("
                       + "{{/repo}}");

console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
