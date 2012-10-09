var bigote = require('..');

var context =
{
  names: [
    {name: 'alpha'},
    {name: 'beta'},
    {name: 'gamma'}
  ]
};

var partials = { user: "<strong>{{name}}</strong>" };
var tmpl = bigote.load("<h2>Names</h2>\n{{#names}}  {{> user}}\n{{/names}}", partials);

console.log(JSON.stringify(tmpl));
var result = bigote.render(tmpl, context);
console.log(result);
