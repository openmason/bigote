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
  
            
console.log("AST");          
console.log(JSON.stringify(tmpl));
var result = bigote.translate(tmpl);
console.log("Translated code:");
console.log(result);
console.log("Result1:");
console.log(result(context));
result = bigote.render(tmpl, context);
console.log("Result2:");
console.log(result);
