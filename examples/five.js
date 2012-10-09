var bigote = require('..');

var context =
{
  "person?": { "name": "Jon" }
};

var tmpl = bigote.parse("{{#person?}}"
                        + "  Hi {{name}}!"
                        + "{{/person?}}");
                        
console.log(JSON.stringify(tmpl));
var result = bigote.evaluate(tmpl, context);
console.log(result);
