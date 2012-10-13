var bigote=require('..');
var assert=require('assert');

// verify comments within mushtache
// {{! comment }}
describe('comments', function() {
  before(function(done) {
    done();
  });
  describe('variable name', function() {
    it('should return with no substitution', function(done) {
      var tmplSource="{{!name}}";
      var context = { name: "charlie" };
      var expectedResult = "";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
  describe('with spaces', function() {
    it('should return comments removed', function(done) {
      var tmplSource="This {{!name}}is my template {{name}} {{! nothing should appear }}";
      var context = { name: "fun1" };
      var expectedResult = "This is my template fun1 ";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
  describe('multi line', function() {
    it('should ignore till end of markup', function(done) {
      var tmplSource="{{! this is a \n multiline comment \r\n ignore these}}wow!";
      var context = {};
      var expectedResult = "wow!";
      var output=bigote.render(bigote.load(tmplSource), context);
      assert.equal(output, expectedResult);
      done();
    });
  });
});
