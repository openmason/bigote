var bigote=require('..');
var assert=require('assert');

// verify sections within mushtache
// {{#key}}..{{/key}}
//  

describe('sections', function() {
  before(function(done) {
    done();
  });
  describe('absense of variable', function() {
    it('should ignore the block', function(done) {
      var tmplSource="{{#name}}something here{{/name}}";
      var context = { nam: "charlie" };
      var expectedResult = "";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('should produce rest of the template as is', function(done) {
      var tmplSource="before string{{#name}}something here{{/name}}after {{coins}}";
      var context = { coins:100 };
      var expectedResult = "before stringafter 100";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });

  describe('presence of variable', function() {
    it('should include the block', function(done) {
      var tmplSource="{{#name}}something here{{/name}}";
      var context = { name: "charlie" };
      var expectedResult = "something here";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('variable is boolean', function(done) {
      var tmplSource="{{#name}}something here{{/name}}";
      var context = { name: true };
      var expectedResult = "something here";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('variable is array', function(done) {
      var tmplSource="{{#name}}something here{{/name}}";
      var context = { name: ['charlie'] };
      var expectedResult = "something here";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('variable is object', function(done) {
      var tmplSource="{{#name}}something here{{/name}}";
      var context = { name: {key:'charlie'} };
      var expectedResult = "something here";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('variable is function', function(done) {
      var tmplSource="{{#name}}something here{{/name}}";
      var context = { name: function () { return true; } };
      var expectedResult = "something here";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });

  describe('false value', function() {
    it('should not include false block', function(done) {
      var tmplSource="Hello{{#student}} {{name}}, {{status}}{{#pass}}Have passed{{/pass}}{{/student}}";
      var context = { student: { name:"charlie", status:"absent", pass:false } };
      var expectedResult = "Hello charlie, absent";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
    it('from a function', function(done) {
      var tmplSource="Hello {{name}}, {{#status}}You have passed{{/status}}";
      var context = { status: function() { return false; }, name:"charlie" };
      var expectedResult = "Hello charlie, ";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });

  describe('empty list', function() {
    it('should no iterate thru section', function(done) {
      var tmplSource="Hello {{name}}:{{#products}}{{name}}{{/products}}";
      var context = { name: "charlie", products:[] };
      var expectedResult = "Hello charlie:";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
});
