var bigote=require('..');
var assert=require('assert');

// verify variables within mushtache
// {{name}}
// {{{name}}}
// {{& name}}

describe('variables', function() {
  before(function(done) {
    done();
  });
  describe('absence', function() {
    it('should return empty string', function(done) {
      var tmplSource="{{name}}";
      var context = { namea: "charlie" };
      var expectedResult = "";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
  describe('simple check', function() {
    it('should return variable subtituted', function(done) {
      var tmplSource="Hello {{name}}, how are you?";
      var context = { name: "charlie" };
      var expectedResult = "Hello charlie, how are you?";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
  describe('context check', function() {
    it('should return variable subtituted', function(done) {
      var tmplSource="Hello {{name}} and {{namea}}";
      var context = { name: "charlie", namea:"snickers" };
      var expectedResult = "Hello charlie and snickers";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return variable subtituted within context only', function(done) {
      var tmplSource="Hello {{name}} and {{namea}}";
      var context = { name: "charlie", friend: { namea:"snickers"} };
      var expectedResult = "Hello charlie and ";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should lookup within a context like a.b', function(done) {
      var tmplSource="{{name.firstName}} and {{name.lastName}}";
      var context = { name: { firstName: "charlie", lastName: "snowflake"} };
      var expectedResult = "charlie and snowflake";
      var x = bigote.load(tmplSource);
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return empty when context unknown', function(done) {
      var tmplSource="{{name.firstName}} and {{name.lastName}}";
      var context = { name: "snowflake" };
      var expectedResult = " and ";
      var x = bigote.load(tmplSource);
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return current context for . in array', function(done) {
      var tmplSource="{{#names}}-{{.}}\n{{/names}}";
      var context = { names:["charlie","snowflake"] };
      var expectedResult = "-charlie\n-snowflake\n";
      var x = bigote.load(tmplSource);
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    // what if . points to object - need to take care of it
    /*
    it('should return current context for . in object', function(done) {
      var tmplSource="{{.}}";
      var context = { name: "snowflake" };
      var expectedResult = " and ";
      var x = bigote.load(tmplSource);
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    */
  });
  describe('multiple variables', function() {
    it('should substitute all variables', function(done) {
      var tmplSource="Name:{{name}}\nAddress:{{addr1}},{{addr2}},{{city}},{{state}}";
      var context = {name:"charlie", addr1:"front st", addr2:"#101", city:"salem", state:"ca"};
      var expectedResult = "Name:charlie\nAddress:front st,#101,salem,ca";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should substitute all available variables', function(done) {
      var tmplSource="Name:{{name}}\nAddress:{{addr1}},{{addr2}},{{city}},{{state}}";
      var context = {name:"charlie", addr1:"front st", state:"ca"};
      var expectedResult = "Name:charlie\nAddress:front st,,,ca";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
  describe('escaping', function() {
    it('should return html escaped var', function(done) {
      var tmplSource="Hello {{name}}";
      var context = { name: "<b>charlie's angels</b>" };
      var expectedResult = "Hello &lt;b&gt;charlie's angels&lt;/b&gt;";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return html escaped var with quotes', function(done) {
      var tmplSource="best quote is {{quote}}";
      var context = { quote: "\"keep it simple\"" };
      var expectedResult = "best quote is &quot;keep it simple&quot;";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });

    // variables not to be escaped '{{{name}}}'
    it('should return var without escaping - {{{', function(done) {
      var tmplSource="Hello {{{name}}}";
      var context = { name: "<b>charlie's angels</b>" };
      var expectedResult = "Hello <b>charlie's angels</b>";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return var with quotes without escaping - {{{', function(done) {
      var tmplSource="best quote is {{{quote}}}";
      var context = { quote: "\"keep it simple\"" };
      var expectedResult = "best quote is \"keep it simple\"";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });

    // variables not to be escaped '{{& name}}'
    it('should return var without escaping - {{& name}}', function(done) {
      var tmplSource="Hello {{&name}}";
      var context = { name: "<b>charlie's angels</b>" };
      var expectedResult = "Hello <b>charlie's angels</b>";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return var with quotes without escaping - {{& name}}', function(done) {
      var tmplSource="best quote is {{&quote}}";
      var context = { quote: "\"keep it simple\"" };
      var expectedResult = "best quote is \"keep it simple\"";
      var x = bigote.load(tmplSource);
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should return var with and without escaping', function(done) {
      var tmplSource="{{name}} is {{{name}}}";
      var context = { name: "a <b> \"t" };
      var expectedResult = "a &lt;b&gt; &quot;t is a <b> \"t";
      var x = bigote.load(tmplSource);
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
});
