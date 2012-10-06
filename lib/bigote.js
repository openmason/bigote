module.exports = (function(){
  var parser = require('./parser');
  var runtime = require('./runtime');

  var result = {
    /* call the parser's parse */
    parse: parser.parse,
    /* Load template and partials */
    load: function(tmpl, partials) {
      var _templates = {};
      _templates['main'] = parser.parse(tmpl);
      for(var p in partials) {
        _templates[p] = parser.parse(partials[p]);
      }
      return _templates;
    },
    evaluate: runtime.evaluate
  };
  return result;
})();
