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

var tmpl = bigote.load("{{#wrapped}}"
                       + "  {{name}} is awesome."
                       + "{{/wrapped}}");
                        
console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
