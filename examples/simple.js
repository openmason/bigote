var PEG = require("pegjs");
var parser = require('..');

context = {
  name:'A',
  value:23
};
console.log(parser.parse("Hello {{name}} You have just won ${{value}}!"));

