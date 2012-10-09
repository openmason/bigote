var bigote = require('..');

var context =
{
  "name": "Chris",
  "company": "<b>GitHub</b>"
};
var tmpl = bigote.load("* {{name}}\n"
                       + "* {{age}}\n"
                       + "* {{company}}\n"
                       + "* {{&company}}\n"
                       + "* {{{company}}}");
                        
console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
