var bigote = require('..');

var context =
{
  "name": "Chris",
  "company": "<b>GitHub</b>"
};
var tmpl = bigote.parse("* {{name}}\n"
                        + "* {{age}}\n"
                        + "* {{company}}\n"
                        + "* {{&company}}\n"
                        + "* {{{company}}}");
                        
console.log(tmpl);
var result = bigote.evaluate(tmpl, context);
console.log(result);
