var bigote = require('..');

var context =
{
  "repo": [
    { "name": "resque" },
    { "name": "hub" },
    { "name": "rip" }
  ]
};

var tmpl = bigote.load("{{#repo}}"
                       + "  <b>{{name}}</b>\n"
                       + "{{/repo}}"
                      );
                        
console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
