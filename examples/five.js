var bigote = require('..');

var context =
{
  "person?": { "name": "Jon" }
};

var tmpl = bigote.load("{{#person?}}"
                       + "  Hi {{name}}!"
                       + "{{/person?}}");
                        
console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
