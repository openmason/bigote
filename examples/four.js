var bigote = require('..');

var context =
{
  "name": "Willy",
  "wrapped": function() {
    return function(text) {
      return "<b>" + render(text) + "</b>";
    };
  }
};

var tmpl = bigote.parse("{{#wrapped}}"
                        + "  {{name}} is awesome."
                        + "{{/wrapped}}");
                        
console.log(JSON.stringify(tmpl));
var result = bigote.evaluate(tmpl, context);
console.log(result);
