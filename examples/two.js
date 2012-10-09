var bigote = require('..');

var context =
{
  "person": true
};
var tmpl = bigote.parse("Shown.\n"
                        + "{{#nothin}}"
                        + "  Never shown!\n"
                        + "{{/nothin}}");
                        
console.log(tmpl);
var result = bigote.evaluate(tmpl, context);
console.log(result);
