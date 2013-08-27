// test copied from templayed.js
var tests = [
  {
    template: "<p>My name is {{name}}!</p>",
    variables: {name: "Paul Engel"}
  }, {
    template: "<p>My name is {{name}}!{{!name}}</p>",
    variables: {name: "Paul Engel"}
  }, {
    template: "<p>{{html}} {{&html}}</p>",
    variables: {html: "<strong>Paul Engel</strong>"}
  }, {
    template: "<p>{{html}} {{{html}}}</p>",
    variables: {html: "<strong>Paul Engel</strong>"}
  }, {
    template: "<p>This is shown!{{#show}} Psst, this is never shown{{/show}}</p>",
    variables: {}
  }, {
    template: "<p>This is shown!{{#show}} Psst, this is never shown{{/show}}</p>",
    variables: {show: false}
  }, {
    template: "<p>This is shown!{{#shown}} And, this is also shown{{/shown}}</p>",
    variables: {shown: true}
  }, {
    template: "<p>My name is {{person.first_name}} {{person.last_name}}!</p>",
    variables: {person: {first_name: "Paul", last_name: "Engel"}}
  }, {
    template: "{{name}}<ul>{{#names}}<li>{{name}}</li>{{/names}}</ul>{{^names}}Sorry, no people to list!{{/names}}",
    variables: {names: []}
  }, {
    template: "<p>{{name}}</p><ul>{{#names}}<li>{{name}}</li>{{/names}}</ul>{{^names}}Sorry, no people to list!{{/names}}<p>{{name}}</p>",
    variables: {name: "Chunk Norris", names: [{name: "Paul"}, {name: "Engel"}]}
  }, {
    template: "<ul>{{#names}}<li>{{.}}{{foo}}</li>{{/names}}</ul>",
    variables: {names: ["Paul", "Engel"]}
  }, {
    template: "<ul>{{#names}}<li>{{fullName}}</li>{{/names}}</ul>",
    variables: {
      names: [{firstName: "Paul", lastName: "Engel"}, {firstName: "Chunk", lastName: "Norris"}],
      fullName: function() {
        return this.lastName + ", " + this.firstName;
      }
    }
  }
];

var bigote = require('..');
var compiled = {
  "bigote": []
};
for (var i = 0; i < tests.length; i++) {
  var template = tests[i].template;
  compiled["bigote" ].push(bigote.load(template));
}

for (var i = 0; i < tests.length; i++) {
  //console.log(JSON.stringify(compiled['bigote'][i]));
  console.log(bigote.render(compiled["bigote"][i], tests[i].variables));
}

