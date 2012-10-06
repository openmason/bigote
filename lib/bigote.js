module.exports = (function(){
  var parser = require('./parser');
  var runtime = require('./runtime');

  var result = {
    /* call the parser's parse */
    parse: parser.parse,
    evaluate: runtime.evaluate
  };
  return result;
})();
