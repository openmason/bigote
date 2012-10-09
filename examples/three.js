var bigote = require('..');

var context =
{
  "repo": [
    { "name": "resque" },
    { "name": "hub" },
    { "name": "rip" }
  ]
};

var tmpl = bigote.parse("{{#repo}}"
                        + "  <b>{{name}}</b>\n"
                        + "{{/repo}}"
                        );
                        
console.log(tmpl);
var result = bigote.evaluate(tmpl, context);
console.log(result);
